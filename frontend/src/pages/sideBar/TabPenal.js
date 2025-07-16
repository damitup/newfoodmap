import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SideBarHeader from "./SideBarHeader";
import { getCookie } from "../../util/cookie";
import { PenaltyFindAll,penaltyGoDetail } from "../../api/map/MapList";

export default function TabPenal({selectedTab,bounds, moveMapToFitBounds, searchKeyword, handleSearch ,setSelectedRestaurant}) {
     const navigate = useNavigate();
    const [restaurantList, setRestaurantList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [showOldList, setShowOldList] = useState([]);
    const userIdx = getCookie("userIdx");
    const isLoggedIn = !!userIdx;
    
          // ✅ 전체 음식점 초기 로드
          useEffect(() => {
              PenaltyFindAll({'num': 0})
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
    const fetchSearchResult = async () => {
        if (!searchKeyword || searchKeyword.trim() === "") return;

        try {
        const res = await penaltyGoDetail(encodeURIComponent(searchKeyword));
        if (res?.data) {
            setFilteredList([res.data]); // 단건 API라 배열로 감싸야 함
            setShowOldList([false]);

            if (moveMapToFitBounds) {
            moveMapToFitBounds([res.data]);
            }
        }
        } catch (error) {
            console.error("검색 실패:", error);
            setFilteredList([]);
            setShowOldList([]);
        }
    };

        fetchSearchResult();
    }, [searchKeyword]);



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
            <SideBarHeader onSearch={handleSearch}/>
            <h4>행정처분 표시지도</h4>
      
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
                    <span className="rating">{item.penaltycount}건</span>                    
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
                </div>
              );
            })}
          </div>
        );
      }