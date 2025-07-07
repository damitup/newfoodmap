import { useState, useEffect } from "react";

export default function MyFavorite({data}){
    
    const [favoriteClick,setFavoriteClick] = useState("");
    const [favoriteList,setFavoriteList] = useState([]);
    const [favorite,setFavorite] = useState(true);

    useEffect(() => {
        setFavoriteList(new Array(data.length).fill(false));
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
    
    return(
        <div className="myFavorite">
            <h4>즐겨찾기 목록</h4>
            {data.map((item, index) => (
                <div key={index} className="section">
                    <div className="container title">
                        <span className="sectionTitle">{item.name}</span>
                        <span className="resType">{item.type}</span>
                        <button type="button" aria-pressed={!favorite} className={`btn favorite ${favoriteList[index] ? "on" : ""}`} onClick={()=>handlerFavoriteClick(index)}  />
                    </div>
                    <span>{item.content}</span>
                    <span>{item.tel}</span>
                </div>
            ))}
        </div>

    )
}