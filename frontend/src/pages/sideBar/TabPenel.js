import { useState, useEffect } from "react";
import '../../styles/components/sideBar.css';

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
			penelCount: "",
            penel: "식품위생법 제 74조 5항 ",
			penelContent: "근무자 위생교육 미이수"    
        }, {
            name: "놀부네보쌈",
            newAddr:"서울 강남구 강남대로 142 A107" ,
            oldAdder: "역삼동 556-22",
            postNum: "06146", 
            tel: "02-234-4567",
            type: "한식"   ,
            content: "저온숙성 한돈과 갈치젓김치와 함께 즐기자",
            grade: "우수",
			penel: "식품위생법 제 74조 5항",
			penelContent: "이물질 유입"    
           
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
            penel: "",
			penelContent: ""      
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
			penel: "",
			penelContent: ""    
            
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
			penel: "",
			penelContent: ""    
           
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
			penel: "",
			penelContent: ""    
           
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
			penel: "",
			penelContent: ""    
           
        }
    ]
    const [colorList,setColorList] = useState([]);
    const [favoriteClick,setFavoriteClick] = useState("");
    const [favoriteList,setFavoriteList] = useState([]);
    const [favorite,setFavorite] = useState(true);

    
    useEffect(() => {
        const colors = resData.map((item) => {
            if (["매우우수"].includes(item.grade)) return "green";
            if (["우수"].includes(item.grade)) return "orange";
            return "gray";
        });
        setColorList(colors);

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

   


    };
	 //현 지도 내 장소검색 메소드 구간


    // 각 section별 상세페이지로 페이징 메소드 구간

    return (
    <div className="sidebar tabSearch">
        <div className="header">
            <h1>kakaomap</h1>
            <div className="locationSearch">
                <label htmlFor="mapCheck">
                <input type="checkbox" id="mapCheck" className="disnone"/>
                    현 지도 내 장소검색
                    </label>
            </div>
            <input type="text" className="searchInput" placeholder="장소, 주소 검색" />
        </div>
        <h4>행정 처분</h4>
        {resData.map((item, index) => (
            // 해당 영역 클릭했을 때 상세페이지로 넘어가는 페이징
            <div key={index} className="section" >
            <div className="container title">
                <div className={`gradeIcon ${colorList[index]}`}/>
                <span className="sectionTitle">{item.name}</span>
                <span className="resType">{item.penelCount || 0}건</span>
              
                <button type="button" aria-pressed={!favorite} className={`btn favorite ${favoriteList[index] ? "on" : ""}`} onClick={()=>handlerFavoriteClick(index)}  />
               
            </div>
            <span>{item.oldAdder}</span>
            <span>{item.tel}</span>
			{/* 행정 처분 내용*/}
			<div className="penelContent">
			<span>행정 처분 내용</span><br/>
			<span>{item.penel}</span>
			<span>{item.penelContent || "없음"}</span>
			</div>
           
        </div>
        ))}
    </div>
  );
}