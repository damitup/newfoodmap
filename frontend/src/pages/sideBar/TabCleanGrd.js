import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SideBarHeader from "./SideBarHeader";
import { cleanGradeFindAll } from "../../api/map/MapList";
import { getCookie } from "../../util/cookie";
import { cleanResGoDetail } from "../../api/map/MapList";

export default function TabCleanGrd({selectedTab,bounds, moveMapToFitBounds, searchKeyword, handleSearch ,setSelectedRestaurant}) {
    const navigate = useNavigate();
      const [restaurantList, setRestaurantList] = useState([]);
      const [filteredList, setFilteredList] = useState([]);
      const [showOldList, setShowOldList] = useState([]);
  
      const userIdx = getCookie("userIdx");
      const isLoggedIn = !!userIdx;
  
      // ✅ 전체 음식점 초기 로드
      
      useEffect(() => {
          cleanGradeFindAll({'num': 0})
          .then((response) => {
              console.log(response.data);
              setRestaurantList(response.data);
          })
          .catch((error) => {
              console.error("음식점 목록을 불러오는 중 오류 발생:", error);
          });
  }, []);
    
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
          setShowOldList(new Array(filtered.length).fill(false));
      }else {
          setFilteredList([]); // bounds도 없으면 빈 값
          setShowOldList([]);
      }   
      return;
  }
      try {
          const res = await cleanResGoDetail(searchKeyword);
          setFilteredList(res.data);
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
  
    
  
      const showOldAddr = (index) => {
          const updated = [...showOldList];
          updated[index] = !updated[index];
          setShowOldList(updated);
      };
  

  const handleDetailPage = (item) => {
      setSelectedRestaurant(item);
  };

  return (
    <div className="sidebar">
      <SideBarHeader />
      <h4>위생등급 표시지도</h4>

      {filteredList.map((item, index) => {
        const gradeClass =
          item.rescleanscore === "매우우수"
            ? "green"
            : item.rescleanscore === "우수" || item.rescleanscore === "좋음"
            ? "orange"
            : "gray";

        return (
          <div key={item.residx} className="section" onClick={() => handleDetailPage(item)}>
            <div className="container title">
              <div className={`gradeIcon ${gradeClass}`} />
              <span className="sectionTitle">{item.resname}</span>
              <span className={`grade ${gradeClass}`}>{item.rescleanscore}</span>
              
            </div>
            <span>{item.resnum}</span>
             <span onClick={(e) => { showOldAddr(index); e.stopPropagation(); }}>
                        {item.newaddr}
                    </span>
             {showOldList[index] && (
                        <span className="oldAddr" style={{ marginLeft: "10px" }}>
                            {item.oldaddr}<br />
                            <span>{item.numaddr}</span>
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
        );
      })}
    </div>
  );
}
