import { useState } from "react";
import BarSearch from '../pages/sideBar/TabSearch';
import BarBest from '../pages/sideBar/TabBestRes';
import BarClean from '../pages/sideBar/TabCleanGrd';
import BarPenal from '../pages/sideBar/TabPenal';
import BarMy from '../pages/sideBar/TabMyPage';
import { Link } from "react-router-dom";

export default function TabMenu() {
  const [activeTab, setActiveTab] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const tabItems = [
    { name: "search", label: "검색" , },
    { name: "best", label: "모범음식점" },
    { name: "clean", label: "위생등급" },
    { name: "penal", label: "행정처분" },
    { name: "mypage", label: "MY" }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'search': return <BarSearch />;
      case 'best': return <BarBest />;
      case 'clean': return <BarClean />;
      case 'penal': return <BarPenal />;
      case 'mypage': return <BarMy />;
      default: return <BarSearch/>;
    }
  };

  const handleTabClick = (name) => {
    setActiveTab(name);
    setIsExpanded(true);
  };

  const togglePanel = () => {
  const newExpanded = !isExpanded;
  setIsExpanded(newExpanded);

  if (newExpanded) {
    // 패널을 여는 시점에 activeTab이 없으면 기본값 지정
    if (!activeTab) {
      setActiveTab(tabItems[0].name);
    }
  } else {
    // 닫을 때는 activeTab 초기화
    setActiveTab(null);
  }
};

  return (
    <div className="tabMenuContainer">
      <div className="tabMenuInbox">
        <div className="logo" >
          <Link to='/'>
        <svg width="63" height="50" viewBox="0 0 63 50" xmlns="http://www.w3.org/2000/svg">
        <g transform="scale(0.35)">
          <text x="15" y="70" fontFamily="Verdana" fontSize="50" fontWeight="bold" fill="#FF6347">Food</text>
          <text x="50" y="120" fontFamily="Verdana" fontSize="50" fontWeight="bold" fill="#4CAF50">Map</text>
        </g>
      </svg>
      </Link>
      </div>
        {tabItems.map(item => (
          <div
            key={item.name}
            className={`tabList ${isExpanded ? '' : 'fold'}`}
            onClick={() => handleTabClick(item.name)}
          >
            <div className={`tabIcon ${activeTab === item.name ? "active" : ""}`}>
              <span className="tabicon inner icon">
                <span className="iconinner" aria-hidden="true">
                  <svg viewBox="0 0 62 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31 1c-4.418 0-8 3.416-8 7.63 0 1.455.41 2.81 1.152 3.967l6.662 9.31c.09.124.283.124.372 0l6.662-9.31A7.303 7.303 0 0 0 39 8.63C39 4.416 35.418 1 31 1"></path>
                  </svg>
                </span>
              </span>
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {isExpanded && (
        <div className="sideBar">
          {renderActiveComponent()}
        </div>
      )}

      <button
        type="button"
        aria-expanded={isExpanded}
        className={`sideTab ${isExpanded ? "close" : "open"}`}
        onClick={togglePanel}
      >
        <span className="blind">
          {isExpanded ? "패널 닫기" : "패널 펼치기"}
        </span>
      </button>
    </div>
  );
}
