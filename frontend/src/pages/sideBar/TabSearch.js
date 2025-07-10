import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SideBarHeader from "./SideBarHeader";
import { nomalResFindAll } from "../../api/map/MapList";

export default function TabSearch() {
    const navigate = useNavigate();

    const [restaurantList, setRestaurantList] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);
    const [favorite, setFavorite] = useState(true);
    const [showOldList, setShowOldList] = useState(new Array(restaurantList.length).fill(false));

    useEffect(() => {
        nomalResFindAll()
            .then((response) => {
                const data = response.data;
                setRestaurantList(data);
                console.log("data내놔 !!!!", data);
                setFavoriteList(new Array(data.length).fill(false));
                setShowOldList(new Array(data.length).fill(false)); 
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

    const handlerFavoriteClick = (idx) => {
        setFavoriteList((prevList) => {
            const updated = [...prevList];
            updated[idx] = !updated[idx];
            return updated;
        });
        // TODO: 즐겨찾기 DB 저장 로직
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
                        <button
                            type="button"
                            aria-pressed={!favorite}
                            className={`btn favorite ${favoriteList[index] ? "on" : ""}`}
                            onClick={(e) => { handlerFavoriteClick(index); e.stopPropagation(); }}
                        />
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
