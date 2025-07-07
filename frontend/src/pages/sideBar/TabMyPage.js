import { useState, useEffect } from "react";
import '../../styles/components/sideBar.css';
import MyFavorite from "./myPage/MyFavorite.js";
import MyReview from "./myPage/MyReview.js";

export default function TabSearch(){
    
    //임시 데이터
    const resData =[
        {
            name: "강남면옥",
            newAddr:"서울 강남구 강남대로 358 강남358타워 2층 201호" ,
            oldAdder: "역삼동 826-14",
            postNum: "06241", 
            tel: "123-1234-1234",
            type: "일식"   ,
            content: "소고기 뼈로 16시간 푹 고와만든 육수베이스와의 만남",
            grade: "매우우수",
            menu: [],    
        }, {
            name: "강남면옥",
            newAddr:"서울 강남구 강남대로 358 강남358타워 2층 201호" ,
            oldAdder: "역삼동 826-14",
            postNum: "06241", 
            tel: "123-1234-1234",
            type: "일식"   ,
            content: "소고기 뼈로 16시간 푹 고와만든 육수베이스와의 만남",
            grade: "우수",
           
        },
         {
            name: "강남면옥",
            newAddr:"서울 강남구 강남대로 358 강남358타워 2층 201호" ,
            oldAdder: "역삼동 826-14",
            postNum: "06241", 
            tel: "123-1234-1234",
            type: "일식"   ,
            content: "소고기 뼈로 16시간 푹 고와만든 육수베이스와의 만남",
            grade: "좋음",
            menu: [],    
        },
         {
            name: "강남면옥",
            newAddr:"서울 강남구 강남대로 358 강남358타워 2층 201호" ,
            oldAdder: "역삼동 826-14",
            postNum: "06241", 
            tel: "123-1234-1234",
            type: "일식"   ,
            content: "소고기 뼈로 16시간 푹 고와만든 육수베이스와의 만남",
            grade: "",
            
        },
         {
            name: "강남면옥",
            newAddr:"서울 강남구 강남대로 358 강남358타워 2층 201호" ,
            oldAdder: "역삼동 826-14",
            postNum: "06241", 
            tel: "123-1234-1234",
            type: "일식"   ,
            content: "소고기 뼈로 16시간 푹 고와만든 육수베이스와의 만남",
            grade: "",
           
        },
         {
            name: "강남면옥",
            newAddr:"서울 강남구 강남대로 358 강남358타워 2층 201호" ,
            oldAdder: "역삼동 826-14",
            postNum: "06241", 
            tel: "123-1234-1234",
            type: "일식"   ,
            content: "소고기 뼈로 16시간 푹 고와만든 육수베이스와의 만남",
            grade: "좋음",
           
        },
         {
            name: "강남면옥",
            newAddr:"서울 강남구 강남대로 358 강남358타워 2층 201호" ,
            oldAdder: "역삼동 826-14",
            postNum: "06241", 
            tel: "123-1234-1234",
            type: "일식"   ,
            content: "소고기 뼈로 16시간 푹 고와만든 육수베이스와의 만남",
            grade: "우수",
           
        }
    ];
    const [activeTab, setActiveTab]= useState("");
    const [tabTabFavoriteList,setTabFavoriteList] = useState([]);
    const [tabTabReviewList,setTabReviewList]= useState([]);
    const [favoriteList,setFavoriteList] = useState([]);


    // mypage 즐겨찾기. 리뷰 버튼 클릭 시 메소드
    const handleTabClick = async (tabType) => {
    setActiveTab(tabType);
    
    //fetch 경로는 백앤드 구조에 따라 변경될수 있음
    if (tabType === "favorite") {
        const res = await fetch("/api/favorite/list?userId=testUser");
        const data = await res.json();
        setTabFavoriteList(data);
    }

    if (tabType === "review") {
        const res = await fetch("/api/review/list?userId=testUser");
        const data = await res.json();
        setTabReviewList(data);
    }
};
    //mypage 즐겨찾기, 리뷰 버튼 클릭시 ui 표시
    const isActive = (tab) => activeTab === tab ? "active" : "";
    

    useEffect(() => {
        handleTabClick("favorite");


        setFavoriteList(new Array(resData.length).fill(false));
    }, []);

    // 즐겨찾기 클릭 설정
    const handlerFavoriteClick = (idx)=>{
        setFavoriteList((prevList) => {
        const updated = [...prevList];
        updated[idx] = !updated[idx]; // 해당 인덱스만 토글
        return updated;
    });
        //db 저장 로직 추가

 

    // 각 section별 상세페이지로 페이징 메소드 구간


    };

    return (
    <div className="sidebar tabMypage">
        <div className="header">
			<div className="container">
				<span className="h1">kakaomap</span>
				<div className="locationSearch">
					<label htmlFor="mapCheck">
					<input type="checkbox" id="mapCheck" className="disnone"/>현 지도 내 장소검색</label>
				</div>		
			</div>
            <input type="text" className="searchInput" placeholder="장소, 주소 검색" />
        </div>
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