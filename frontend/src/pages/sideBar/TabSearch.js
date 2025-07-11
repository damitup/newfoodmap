import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SideBarHeader from "./SideBarHeader";
import { nomalResFindAll } from "../../api/map/MapList";
import { addFavorite, removeFavorite, FavoriteCheck } from "../../api/user/userAction"; // 추가
import { getCookie } from "../../util/cookie";


export default function TabSearch({selectedTab}) {
    const navigate = useNavigate();

    const [restaurantList, setRestaurantList] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);
    const [favorite, setFavorite] = useState(true);
    const [showOldList, setShowOldList] = useState(new Array(restaurantList.length).fill(false));

    const userIdx = getCookie("userIdx"); // 사용자 ID
    const isLoggedIn = !!userIdx;

    useEffect(() => {
        nomalResFindAll()
            .then((response) => {
                const data = response.data;
                setRestaurantList(data);
                setFavoriteList(new Array(data.length).fill(false));
                setShowOldList(new Array(data.length).fill(false)); 
            })
            .catch((error) => {
                console.error("음식점 목록을 불러오는 중 오류 발생:", error);
            });
    }, []);


    useEffect(() => {
  const fetchFavorites = async () => {
    if (!isLoggedIn) return;

    const initList = await Promise.all(
      restaurantList.map(async (item) => {
        try {
          const res = await FavoriteCheck(userIdx, item.residx);
          return res.data === true; // ← API에서 true/false 반환한다고 가정
        } catch (error) {
          console.error("즐겨찾기 확인 실패:", item.residx, error);
          return false; // 실패한 경우 false 처리
        }
      })
    );

    setFavoriteList(initList);
    console.log(favoriteList);
  };

  fetchFavorites();
}, [isLoggedIn, restaurantList, userIdx]);



    const showOldAddr = (index) => {
        const updated = [...showOldList];
        updated[index] = !updated[index];
        setShowOldList(updated);
    }

    
    const handlerFavoriteClick = async (idx, resIdx) => {
    if (!isLoggedIn) {
        alert("로그인 후 이용 가능합니다.");
        return;
    }

    const updated = [...favoriteList];
    const isNowFavorite = !updated[idx]; // 토글 후 상태

    updated[idx] = isNowFavorite;
    setFavoriteList(updated);

    console.log("로그들이다. ",userIdx, resIdx,"idx  넌 누구냐",idx);
    console.log(isNowFavorite);
    try {
        if (isNowFavorite) {
        await addFavorite(userIdx, resIdx);
        console.log("즐겨찾기 등록 성공");
        } else {
        await removeFavorite(userIdx, resIdx);
        console.log("즐겨찾기 해제 성공");
        }
    } catch (error) {
        console.error("즐겨찾기 처리 중 오류 발생:", error);
        alert("처리 중 문제가 발생했습니다.");
        // 실패 시 UI 상태 복구
        const rollback = [...favoriteList];
        rollback[idx] = !isNowFavorite;
        setFavoriteList(rollback);
    }
    };

    const handleDetailPage = (item) => {
        navigate(`/detail/${item.residx}`, { state: item });
    };

    return (
        <div className="sidebar">
            <SideBarHeader />
            <h4>일반휴계음식점 추천</h4>

            {restaurantList.map((item, index) => (
                <div key={item.residx} className="section" onClick={() => handleDetailPage(item)}>
                    <div className="container title">
                        <span className="sectionTitle">{item.resname}</span>
                        <span className="resType">{item.typeidx}</span>
                        {isLoggedIn && (
                            <button
                                type="button"
                                aria-pressed={!favorite}
                                className={`btn favorite ${favoriteList[index] ? "on" : ""}`}
                                onClick={(e) => {
                                                handlerFavoriteClick(index, item.residx);
                                                e.stopPropagation(); }}
                            />
                        )}
                    </div>
                    <span onClick={(e) => { showOldAddr(index); e.stopPropagation(); }}>
                        {item.newaddr}
                    </span>
                     {showOldList[index] && (
                        <span className="oldAddr" style={{ marginLeft: "10px" }}>
                        {item.oldaddr}
                        <br />
                        <span>{item.resnum}</span>
                        </span>
                    )}

                    {/* 예시: 주메뉴가 menuList 라는 이름으로 있다면 */}
                    {item.menuList?.length > 0 && (
                        <>
                            <h4>주메뉴</h4>
                            <div className="menuList">
                                {item.menuList.map((menuItem, i) => (
                                    <span key={i} className="menu-item">• {menuItem}<br /></span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
