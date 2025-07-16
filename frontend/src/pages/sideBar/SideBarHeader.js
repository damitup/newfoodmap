import { useState } from "react";

export default function SideBarHeader({ onSearch }) {
    const [inputValue, setInputValue] = useState("");
    const isTyping = inputValue !== "";

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const delText = () => {
        setInputValue("");
        onSearch(""); // 검색 초기화
    };

    const resSearch = () => {
        const keyword = inputValue.trim();
        if (keyword === "") return;

        if (typeof onSearch === "function") {
            onSearch(keyword); // ✅ 함수인 경우만 실행
        } else {
            console.warn("onSearch prop is not a function:", onSearch);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") resSearch();
    };

    return (
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
                        <input type="checkbox" id="mapCheck" className="disnone" />
                        현 지도 내 장소검색
                    </label>
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
                    onKeyDown={handleKeyDown}
                />
                {isTyping && <div className="typing" onClick={delText} />}
                <div className="kakaoIcon search inBox" onClick={resSearch} />
            </div>
        </div>
    );
}
