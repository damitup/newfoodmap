import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarHeader from "./SideBarHeader";

export default function TabCleanGrd(){
    const [colorList,setColorList] = useState([]);
    const navigate = useNavigate();
    //임시 데이터
    const resData =[
        {
            idx: "c1",
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
            idx: "c2",
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
            idx: "c3",
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
            idx: "c4",
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
            idx: "c5",
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
            idx: "c6",
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
            idx: "c7",
            name: "강남면옥",
            newAddr:"서울 강남구 강남대로 358 강남358타워 2층 201호" ,
            oldAdder: "역삼동 826-14",
            postNum: "06241", 
            tel: "123-1234-1234",
            type: "일식"   ,
            content: "소고기 뼈로 16시간 푹 고와만든 육수베이스와의 만남",
            grade: "우수",
           
        }
    ]
    useEffect(() =>{
        const colors = resData.map((item) => {
            if (["매우우수"].includes(item.grade)) return "green";
            if (["우수","좋음"].includes(item.grade)) return "orange";
            return "gray";
        });
        setColorList(colors);
    },[]);
    //현 지도 내 장소검색 메소드 구간


    // 각 section별 상세페이지로 페이징 메소드 구간
    const handleDetailPage = (item) => {
            navigate(`/detail?${item.idx}`, { state: item }); 
        };
    return (
    <div className="sidebar">
       <SideBarHeader/>
        <h4>지역 추천</h4>
        {resData.map((item, index) => (
            // 해당 영역 클릭했을 때 상세페이지로 넘어가는 페이징
            <div key={item.idx} className="section" onClick={() => handleDetailPage(item)} >
            <div className="container title">
                <div className={`gradeIcon ${colorList[index]} `}/>
                <span className="sectionTitle">{item.name}</span>
                <span className="resType">{item.type}</span>
            </div>
            <span>{item.content}</span>
            <span>{item.tel}</span>
            <span className={`grade ${colorList[index]}`}>
                위생등급 :  {item.grade || "등급 없음"}
            </span>
        </div>
        ))}
    </div>
  );
}