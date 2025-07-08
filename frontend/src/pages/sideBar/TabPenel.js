import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SideBarHeader from "./SideBarHeader";

export default function TabSearch(){
	
    
    //임시 데이터
    const resData =[
        {
            idx: "p1",
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
            idx: "p2",
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
            idx: "p3",
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
            idx:"p4",
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
            idx: "p5",
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
            idx: "p6",
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
            idx: "p7",
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
    
    const navigate = useNavigate();
    //해당 section 클릭 시 상세페이지로 페이징
    const handleDetailPage = (item) => {
       navigate(`/detail?${item.idx}`, { state: item }); 
    };
    //현 지도 내 장소검색 메소드 구간
    return(
    <div className="sidebar tabSearch">
       <SideBarHeader/>
        <h4>행정 처분</h4>
        {resData.map((item, index) => {
        if (!item.penel && !item.penelContent) return null; // ⛔ 아무 내용도 없으면 렌더링 안 함

        return (
            <div key={item.idx} className="section" onClick={() => handleDetailPage(item)}>
                <div className="container title">
                    <span className="sectionTitle">{item.name}</span>
                    <span className="resType">{item.penelCount || 0}건</span>
                </div>
                <span>{item.oldAdder}</span>
                <span>{item.tel}</span>

                {/* 행정 처분 내용 표시 */}
                <div className="penelContent">
                    <span>행정 처분 내용</span><br />
                    <span>{item.penel}</span>
                    <span>{item.penelContent}</span>
                </div>
            </div>
        );
    })}
    </div>
    
    )
}