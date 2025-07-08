import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SideBarHeader(){
    const [inputValue, setInputValue] = useState("");
    const isTyping = inputValue !== "";
    const navigate = useNavigate(); 

     const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const delText = () => {
    setInputValue("");
  };
    
    //검색 기능
    const resSearch = () => {
    if (inputValue.trim() === "") return;
    navigate(`/sidebar?${encodeURIComponent(inputValue)}`);
    }

    //현지대 내장소 검색 클릭 기능




    return(
         <div className="sideBarHeader">
            <div className="container">
                <svg width="150" height="50" viewBox="0 0 150 50" xmlns="http://www.w3.org/2000/svg">
                    <g transform="scale(0.35)">
                        <text x="5" y="70" fontFamily="Verdana" fontSize="50" fontWeight="bold" fill="#FF6347">Food</text>
                        <text x="140" y="70" fontFamily="Verdana" fontSize="50" fontWeight="bold" fill="#4CAF50">Map</text>
                    </g>
                </svg>

                <div className="locationSearch">
                    <label htmlFor="mapCheck">
                    <input type="checkbox" id="mapCheck" className="disnone"/>현 지도 내 장소검색</label>
                </div>	
            </div>
            <div className="container">
                 <input
                    id="searchKeyword"
                    type="text"
                    className="searchInput"
                    placeholder="지도 검색"
                    value={inputValue}
                    onChange={handleChange}
                />
                {isTyping && <div className="typing" onClick={delText} />}
            <div className="kakaoIcon search inBox" onClick={resSearch} />
           </div>
        </div>
    )
}