import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SideBarHeader from "./SideBarHeader";
import { cleanGradeFindAll } from "../../api/map/MapList";

export default function TabCleanGrd() {
  const navigate = useNavigate();
  const [restaurantList, setRestaurantList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [favorite, setFavorite] = useState(true);

  useEffect(() => {
    cleanGradeFindAll()
      .then((response) => {
        const data = response.data;
        setRestaurantList(data);
        setFavoriteList(new Array(data.length).fill(false));
      })
      .catch((error) => {
        console.error("음식점 목록을 불러오는 중 오류 발생:", error);
      });
  }, []);

  const handlerFavoriteClick = (idx) => {
    setFavoriteList((prevList) => {
      const updated = [...prevList];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  const handleDetailPage = (item) => {
    navigate(`/detail/${item.residx}`, { state: item });
  };

  return (
    <div className="sidebar">
      <SideBarHeader />
      <h4>위생등급 표시지도</h4>

      {restaurantList.map((item, index) => {
        const gradeClass =
          item.assigngrade === "매우우수"
            ? "green"
            : item.assigngrade === "우수" || item.assigngrade === "좋음"
            ? "orange"
            : "gray";

        return (
          <div key={item.residx} className="section" onClick={() => handleDetailPage(item)}>
            <div className="container title">
              <div className={`gradeIcon ${gradeClass}`} />
              <span className="sectionTitle">{item.upsonm}</span>
              <span className={`grade ${gradeClass}`}>{item.assigngrade}</span>
              
            </div>
            <span>{item.resnum}</span>
            <span>{item.newaddr}</span>

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
        );
      })}
    </div>
  );
}
