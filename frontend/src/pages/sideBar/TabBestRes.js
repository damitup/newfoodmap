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
            grade: "갑",
            menu: [],    
        }, {
            name: "강남면옥",
            newAddr:"서울 강남구 강남대로 358 강남358타워 2층 201호" ,
            oldAdder: "역삼동 826-14",
            postNum: "06241", 
            tel: "123-1234-1234",
            type: "일식"   ,
            content: "소고기 뼈로 16시간 푹 고와만든 육수베이스와의 만남",
            grade: "을",
           
        },
         {
            name: "강남면옥",
            newAddr:"서울 강남구 강남대로 358 강남358타워 2층 201호" ,
            oldAdder: "역삼동 826-14",
            postNum: "06241", 
            tel: "123-1234-1234",
            type: "일식"   ,
            content: "소고기 뼈로 16시간 푹 고와만든 육수베이스와의 만남",
            grade: "갑",
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
            grade: "지도",
            
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
            grade: "",
           
        }
    ]
    const [colorList,setColorList] = useState([]);
    const [favoriteClick,setFavoriteClick] = useState("");
    const [favoriteList,setFavoriteList] = useState([]);
    const [favorite,setFavorite] = useState(true);

    
    useEffect(() => {
        const colors = resData.map((item) => {
            if (["갑", "을", "자율"].includes(item.grade)) return "green";
            if (["지도", "관리"].includes(item.grade)) return "orange";
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
        <h4>지역 추천</h4>
        
        {resData.map((item, index) => (
            <div key={index} className="section">
            <div className="container title">
                <div className={`gradeIcon ${colorList[index]}`}/>
                <span className="sectionTitle">{item.name}</span>
                <span className="resType">{item.type}</span>
              
                <button type="button" aria-pressed={!favorite} className={`btn favorite ${favoriteList[index] ? "on" : ""}`} onClick={()=>handlerFavoriteClick(index)}  />
               
            </div>
            <span>{item.content}</span>
            <span>{item.tel}</span>
            {/* 등급 구분명 보여주기 */}
            <span className={`grade ${colorList[index]}`}>
                위생등급 :  {item.grade || "등급 없음"}
            </span>
            {/* 메뉴 리스트 보여주기 */}
            {item.menu?.length > 0 && (      
                <>
                <h4>주메뉴</h4>
                <div className="menuList">
                {item.menu.map((menuItem, i) => (
                    <span key={i} className="menu-item">• {menuItem}<br/></span>
                ))}
                </div>
                </>      
            )}
        </div>
        ))}
    </div>
  );
}