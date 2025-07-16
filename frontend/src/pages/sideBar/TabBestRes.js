import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SideBarHeader from "./SideBarHeader";
import { bestResFindAll,bestResGoDetail } from "../../api/map/MapList";
import { addFavorite, removeFavorite, FavoriteCheck } from "../../api/user/userAction"; // 추가
import { getCookie } from "../../util/cookie";

export default function TabSearch({selectedTab,bounds, moveMapToFitBounds, searchKeyword, handleSearch ,setSelectedRestaurant}){
    const navigate = useNavigate();
    const [restaurantList, setRestaurantList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);
    const [favorite, setFavorite] = useState(true);
    const [showOldList, setShowOldList] = useState([]);

    const userIdx = getCookie("userIdx");
    const isLoggedIn = !!userIdx;
    
        //sidebar에 리스트 생성
        useEffect(() => {bestResFindAll()
            .then((response) => {
                console.log(response.data);
                setRestaurantList(response.data);
            })
            .catch((error) => {
                console.error("음식점 목록을 불러오는 중 오류 발생:", error);
            });
        }, []);
            const showOldAddr = (index) => {
                const updated = [...showOldList];
                updated[index] = !updated[index];
                setShowOldList(updated);
            }
 // ✅ bounds 내의 음식점만 필터링해서 보여주기
     useEffect(() => {
     if (!bounds || searchKeyword.trim() !== "") return; // 검색어가 있을 때는 필터링 X
 
     const filtered = restaurantList.filter((item) => {
         const x = parseFloat(item.xpos);
         const y = parseFloat(item.ypos);
         return (
         x >= bounds.blX && x <= bounds.urX &&
         y >= bounds.blY && y <= bounds.urY
         );
     });
 
     setFilteredList(filtered);
     setFavoriteList(new Array(filtered.length).fill(false));
     setShowOldList(new Array(filtered.length).fill(false));
     }, [bounds, restaurantList, searchKeyword]);
 
 
     // ✅ 검색어로 DB에서 검색
    useEffect(() => {
     console.log("🧪 TabSearch received handleSearch:", typeof handleSearch);
     const fetchSearchResult = async () => {
     if (searchKeyword?.trim() === "") {
     if (bounds) {
         const filtered = restaurantList.filter((item) => {
                 const x = parseFloat(item.xpos);
                 const y = parseFloat(item.ypos);
                 return (
                     x >= bounds.blX && x <= bounds.urX &&
                     y >= bounds.blY && y <= bounds.urY
                 );
             });
         setFilteredList(filtered);
         setFavoriteList(new Array(filtered.length).fill(false));
         setShowOldList(new Array(filtered.length).fill(false));
     }else {
         setFilteredList([]); // bounds도 없으면 빈 값
         setFavoriteList([]);
         setShowOldList([]);
     }   
     return;
 }
     try {
         const res = await bestResGoDetail(searchKeyword);
         setFilteredList(res.data);
         setFavoriteList(new Array(res.data.length).fill(false));
         setShowOldList(new Array(res.data.length).fill(false));
 
         // ✅ 지도 이동 요청
         if (res.data.length > 0 && moveMapToFitBounds) {
             moveMapToFitBounds(res.data);
         }
         } catch (error) {
         console.error("검색 실패:", error);
         }
     };
         fetchSearchResult();
     }, [searchKeyword,restaurantList, bounds]);
 
     // ✅ 즐겨찾기 확인
     useEffect(() => {
         const fetchFavorites = async () => {
             if (!isLoggedIn || filteredList.length === 0) return;
 
             try {
                 const res = await FavoriteCheck(userIdx);
                 const favoriteResidxList = res.data.map(fav => fav.resIdx);
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
  
    const handlerFavoriteClick = async (idx, resIdx) => {
        if (!isLoggedIn) {
            alert("로그인 후 이용 가능합니다.");
            return;
        }

        const updated = [...favoriteList];
        const isNowFavorite = !updated[idx]; // 토글 후 상태

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
            
            // 실패 시 UI 상태 복구
            const rollback = [...favoriteList];
            rollback[idx] = !isNowFavorite;
            setFavoriteList(rollback);
        }
    };
    
    const handleDetailPage = (item) => {
        setSelectedRestaurant(item);
    };
    
    return (
    <div className="sidebar tabSearch">
       
        <SideBarHeader onSearch={handleSearch}/>
        <h4>지역 추천</h4>
       
            {Array.isArray(filteredList) && filteredList.map((item, index) => (
                <div key={item.residx} className="section" onClick={() => handleDetailPage(item)}>
                    <div className="container title">
                        <div className="gradeIcon best"/>
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