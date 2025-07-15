import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SideBarHeader from "./SideBarHeader";
import { nomalResFindAll } from "../../api/map/MapList";
import { addFavorite, removeFavorite, FavoriteCheck } from "../../api/user/userAction";
import { getCookie } from "../../util/cookie";

export default function TabSearch({ selectedTab, bounds }) {
    const navigate = useNavigate();

    const [restaurantList, setRestaurantList] = useState([]);
    const [filteredList, setFilteredList] = useState([]); // ✅ 필터된 리스트
    const [favoriteList, setFavoriteList] = useState([]);
    const [favorite, setFavorite] = useState(true);
    const [showOldList, setShowOldList] = useState([]);

    const userIdx = getCookie("userIdx");
    const isLoggedIn = !!userIdx;

    // 전체 음식점 불러오기
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

    // bounds가 바뀔 때마다 필터링
    useEffect(() => {
        if (!bounds || restaurantList.length === 0) return;

        const filtered = restaurantList.filter((item) =>
            item.ypos >= bounds.blY &&
            item.ypos <= bounds.urY &&
            item.xpos >= bounds.blX &&
            item.xpos <= bounds.urX
        );

        setFilteredList(filtered);
        setShowOldList(new Array(filtered.length).fill(false));
        setFavoriteList(new Array(filtered.length).fill(false));
    }, [bounds, restaurantList]);

    // 즐겨찾기 체크
    useEffect(() => {
     const fetchFavorites = async () => {
  if (!isLoggedIn || filteredList.length === 0) return;

  try {
    const res = await FavoriteCheck(userIdx); // 전체 즐겨찾기 목록
    const favoriteResidxList = res.data.map(fav => fav.resIdx); // 즐겨찾기한 음식점 ID 배열

    const initList = filteredList.map(item =>
      favoriteResidxList.includes(item.residx)
    );

    setFavoriteList(initList);
  } catch (error) {
    console.error("즐겨찾기 목록 확인 실패", error);
  }
};

        fetchFavorites();
    }, [isLoggedIn, filteredList, userIdx]);

    const showOldAddr = (index) => {
        const updated = [...showOldList];
        updated[index] = !updated[index];
        setShowOldList(updated);
    };

    const handlerFavoriteClick = async (idx, resIdx) => {
        if (!isLoggedIn) {
            alert("로그인 후 이용 가능합니다.");
            return;
        }

        const updated = [...favoriteList];
        const isNowFavorite = !updated[idx];

        updated[idx] = isNowFavorite;
        setFavoriteList(updated);

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

            {filteredList.map((item, index) => (
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
                                    e.stopPropagation();
                                }}
                            />
                        )}
                    </div>
                    <span onClick={(e) => { showOldAddr(index); e.stopPropagation(); }}>
                        {item.newaddr}
                    </span>
                    {showOldList[index] && (
                        <span className="oldAddr" style={{ marginLeft: "10px" }}>
                            {item.oldaddr}<br />
                            <span>{item.resnum}</span>
                        </span>
                    )}
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
