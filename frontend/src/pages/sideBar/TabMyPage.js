import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MyFavorite from "./myPage/MyFavorite.js";
import MyReview from "./myPage/MyReview.js";
import SideBarHeader from "./SideBarHeader";
import { selReviewUser , FavoriteCheck} from "../../api/user/userAction.js";
import { getCookie } from "../../util/cookie.js";

export default function MySidePage(){
    const navigate = useNavigate();
    const [tabTabFavoriteList,setTabFavoriteList] = useState([]);
    const [tabTabReviewList,setTabReviewList]= useState([]);
    const [activeTab,setActiveTab]= useState("");
    const [data,setData] =useState([]);


    // mypage 즐겨찾기. 리뷰 버튼 클릭 시 메소드
    const handleTabClick = async (tabType) => {
    setActiveTab(tabType);
    
    //fetch 경로는 백앤드 구조에 따라 변경될수 있음
    if (tabType === "favorite") {
        const res = await selReviewUser(getCookie("userIdx"),data);
        setTabFavoriteList(data);
    }

    if (tabType === "review") {
        const res = await FavoriteCheck(getCookie("userIdx"));
        setTabReviewList(data);
    }
};
    //mypage 즐겨찾기, 리뷰 버튼 클릭시 ui 표시
    const isActive = (tab) => activeTab === tab ? "active" : "";
    useEffect(() => {
        handleTabClick("favorite");

        // setFavoriteList(new Array(resData.length).fill(false));
    }, []);

        //db 저장 로직 추가
    // 각 section별 상세페이지로 페이징 메소드 구간
    return (
    <div className="sidebar tabMypage">
        <SideBarHeader/>
        <div className="container myTab myPage">
            <div className ={`myTabmenuItem ${isActive("favorite")}`} onClick={() => handleTabClick("favorite")}><span>즐겨찾기</span></div>
            <div className ={`myTabmenuItem ${isActive("review")}`} onClick={() => handleTabClick("review")}><span>리뷰</span></div>
        </div>
        {/*     즐겨찾기, 리뷰 클릭 시 해당 페이지 불러오기 */}
     
            {activeTab === "favorite" && <MyFavorite data={tabTabFavoriteList} />}
            {activeTab === "review" && <MyReview data={tabTabReviewList} />}
        
    </div>
  );
}