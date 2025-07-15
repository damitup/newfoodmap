import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MyFavorite from "./myPage/MyFavorite.js";
import MyReview from "./myPage/MyReview.js";
import SideBarHeader from "./SideBarHeader";
import { selReviewUser, FavoriteCheck } from "../../api/user/userAction.js";
import { getCookie } from "../../util/cookie.js";

export default function MySidePage({ handleSearch }) {
    const navigate = useNavigate();
    const [tabTabFavoriteList, setTabFavoriteList] = useState([]);
    const [tabTabReviewList, setTabReviewList] = useState([]);
    const [activeTab, setActiveTab] = useState("favorite");

    const userIdx = getCookie("userIdx");

    // ⭐ 탭 클릭 시 데이터 로드
    const handleTabClick = async (tabType) => {
        setActiveTab(tabType);

        if (tabType === "favorite") {
            try {
                const res = await FavoriteCheck(userIdx);
                setTabFavoriteList(res.data);
            } catch (err) {
                console.error("즐겨찾기 불러오기 실패:", err);
            }
        }

        if (tabType === "review") {
            try {
                const res = await selReviewUser(userIdx);
                setTabReviewList(res.data);
            } catch (err) {
                console.error("리뷰 불러오기 실패:", err);
            }
        }
    };

    // ⭐ 탭 활성화 여부
    const isActive = (tab) => (activeTab === tab ? "active" : "");

    // ⭐ 초기 로드시 즐겨찾기 탭 자동 로드
    useEffect(() => {
        if (userIdx) {
            handleTabClick("favorite");
        }
    }, [userIdx]);

    return (
        <div className="sidebar tabMypage">
            <SideBarHeader onSearch={handleSearch} />
            <div className="container myTab myPage">
                <div
                    className={`myTabmenuItem ${isActive("favorite")}`}
                    onClick={() => handleTabClick("favorite")}
                >
                    <span>즐겨찾기</span>
                </div>
                <div
                    className={`myTabmenuItem ${isActive("review")}`}
                    onClick={() => handleTabClick("review")}
                >
                    <span>리뷰</span>
                </div>
            </div>

            {/* 탭에 따라 컴포넌트 렌더링 */}
            {activeTab === "favorite" && (
                <MyFavorite data={tabTabFavoriteList} setData={setTabFavoriteList} />
            )}
            {activeTab === "review" && <MyReview data={tabTabReviewList} />}
        </div>
    );
}
