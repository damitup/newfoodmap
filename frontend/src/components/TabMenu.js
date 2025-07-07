import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function TabMenu() {
    const [activeTab, setActiveTab] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [newPath, setNewPath] = useState("");
    const navigate = useNavigate();

    const tabItems = [
        { name: "search", label: "검색", path: "/sidebar/search" },
        { name: "best", label: "모범음식점", path: "/sidebar/best" },
        { name: "clean", label: "위생등급", path: "/sidebar/clean" },
        { name: "penel", label: "행정처분", path: "/sidebar/penel" },
        { name: "mypage", label: "MY", path: "/sidebar/mypage" }
    ];

    const handleTabClick = (name, path) => {
        setActiveTab(name);
        setIsExpanded(true);
        setNewPath(path);
        navigate(path);
    };

    const togglePanel = () => {
        const newExpanded = !isExpanded;
        setIsExpanded(newExpanded);

        if (newExpanded) {
            if (!newPath) {
                const defaultItem = tabItems[0];
                setActiveTab(defaultItem.name);
                setNewPath(defaultItem.path);
                navigate(defaultItem.path);
            } else {
                navigate(newPath);
            }
        } else {
            navigate("/sidebar"); // 또는 navigate(tabItems[0].path);
        }
    };

  return (
    <div className="tabMenuContainer">
      <div className="tabMenuInbox">
        {tabItems.map(item => (
          <div
            key={item.name}
            className={`tabList ${isExpanded ? '' : 'fold'}`}
            onClick={() => handleTabClick(item.name, item.path)}
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
          <Outlet />
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
