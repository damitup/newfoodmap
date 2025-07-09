import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SideBarHeader from "./SideBarHeader";
import { PenaltyFindAll } from "../../api/map/MapList";

export default function TabPenal() {
    const navigate = useNavigate();

    const [restaurantList, setRestaurantList] = useState([]);

    useEffect(() => {
        PenaltyFindAll()
            .then((response) => {
                const data = response.data;
                setRestaurantList(data);
            })
            .catch((error) => {
                console.error("음식점 목록을 불러오는 중 오류 발생:", error);
            });
    }, []);

    const handleDetailPage = (item) => {
        navigate(`/detail/${item.residx}`, { state: item });
    };

    return (
        <div className="sidebar penel">
            <SideBarHeader />
            <h4>행정 처분</h4>

            {restaurantList
                .filter(item => item.penel || item.penelContent) // 내용 없는 항목 제외
                .map((item, index) => (
                    <div key={item.residx || index} className="section" onClick={() => handleDetailPage(item)}>
                        <div className="container title">
                            <span className="sectionTitle">{item.resname}</span>
                            <span className="resType">{item.penelCount || 1}건</span>
                        </div>
                        <span>{item.oldaddr}</span>
                        <span>{item.sitetel}</span>

                        <div className="penelContent">
                            <span>행정 처분 내용</span><br />
                            <span>{item.penel}</span><br />
                            <span>{item.penelContent}</span>
                        </div>
                    </div>
                ))}
        </div>
    );
}
