import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SideBarHeader from "./SideBarHeader";

export default function TabSearch(){
    
    //임시 데이터
    const resData =[
        {
            idx: "b1",
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
             idx: "b2",
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
             idx: "b3",
            name: "강남면옥",
            newAddr:"서울 강남구 강남대로 358 강남358타워 2층 201호" ,
            oldAdder: "역삼동 826-14",
            postNum: "06241", 
            tel: "123-1234-1234",
            type: "일식"   ,
            content: "소고기 뼈로 16시간 푹 고와만든 육수베이스와의 만남",
            grade: "우수",
            menu: [],    
        },
         {
             idx: "b4",
            name: "강남면옥",
            newAddr:"서울 강남구 강남대로 358 강남358타워 2층 201호" ,
            oldAdder: "역삼동 826-14",
            postNum: "06241", 
            tel: "123-1234-1234",
            type: "일식"   ,
            content: "소고기 뼈로 16시간 푹 고와만든 육수베이스와의 만남",
            grade: "매우우수",
            
        },
         {
             idx: "b5",
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
            idx: "b6",
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
             idx: "b7",
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
    const navigate = useNavigate();

    //해당 section 클릭 시 상세페이지로 페이징
    const handleDetailPage = (item) => {
        navigate(`/detail?${item.idx}`, { state: item }); 

    };
    
    useEffect(() => {
        const colors = resData.map((item) => {
            if (["매우우수"].includes(item.grade)) return "green";
            if (["우수","좋음"].includes(item.grade)) return "orange";
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
       
        <SideBarHeader/>
        <h4>지역 추천</h4>
        {resData.map((item, index) => (
            <div key={item.idx} className="section" onClick={() => handleDetailPage(item)}>
            <div className="container title">
                <div className="gradeIcon best"/>
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