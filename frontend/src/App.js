import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';


// CSS import
import './App.css';
import './styles/login.css';
import './styles/regist.css';
import './styles/components/tabMenu.css';
import './styles/components/sideBar.css';
import './styles/components/managePage.css';
import './styles/DetailPage.css';

// Page import
import MainMap from './pages/map/MainMap.js'
import LoginPage from './pages/login/LogInPage.js';
import RegistUserPage from './pages/login/RegistUserPage.js';
import TabMenu from './components/TabMenu.js';
import BarBest from './pages/sideBar/TabBestRes.js';
import BarClean from './pages/sideBar/TabCleanGrd.js';
import BarMy from './pages/sideBar/TabMyPage.js';
import BarPenal from './pages/sideBar/TabPenal.js';
import BarSearch from './pages/sideBar/TabSearch.js';
import ManagePage from './components/ManagePage.js';
import DetailPage from './pages/DetailPage.js';
import RestaurantsMapPage from './pages/map/RestaurantsMapPage.js';
import BestRestaurantsMapPage from './pages/map/BestRestaurantsMapPage.js';

function Layout() {
  const location = useLocation();
  const isManagePage = location.pathname === '/manage';
  const isDetailPage = location.pathname.startsWith('./detail');

  const [selectedTab, setSelectedTab] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [bounds, setBounds] = useState(null); // ✅ 지도 bounds 상태 추가
  const [searchKeyword, setSearchKeyword] = useState("");
  const [moveMapToFitBounds,setMoveToFitBounds] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);        // 검색어 저장
    setSelectedTab("search");        // 검색 탭으로 이동
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flex: 0 }}>
        <div style={{ display: "flex" }}>
          <TabMenu
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />

          {/* 선택된 탭에 따라 사이드바 렌더링 */}
          
         {isExpanded && selectedTab === "search" && (
            <BarSearch
              selectedTab={selectedTab}
              bounds={bounds}
              moveMapToFitBounds={moveMapToFitBounds}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              setSelectedRestaurant={setSelectedRestaurant}
              handleSearch={handleSearch} // ✅ 여기 추가!
            />
          )}
          {isExpanded && selectedTab === "best" && <BarBest 
              selectedTab={selectedTab}
              bounds={bounds}
              moveMapToFitBounds={moveMapToFitBounds}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              setSelectedRestaurant={setSelectedRestaurant}
              handleSearch={handleSearch} // ✅ 여기 추가!/
              />}
          {isExpanded && selectedTab === "clean" && <BarClean 
              selectedTab={selectedTab}
              bounds={bounds}
              moveMapToFitBounds={moveMapToFitBounds}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              setSelectedRestaurant={setSelectedRestaurant}
              handleSearch={handleSearch} // ✅ 여기 추가!
              />}
          {isExpanded && selectedTab === "penal" && <BarPenal 
              selectedTab={selectedTab}
              bounds={bounds}
              moveMapToFitBounds={moveMapToFitBounds}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              setSelectedRestaurant={setSelectedRestaurant}
              handleSearch={handleSearch}
          />}
          {isExpanded && selectedTab === "mypage" && <BarMy 
              selectedTab={selectedTab}
              bounds={bounds}
              moveMapToFitBounds={moveMapToFitBounds}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              setSelectedRestaurant={setSelectedRestaurant}
              handleSearch={handleSearch}
          />}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <MainMap
                selectedTab={selectedTab}
                setBounds={setBounds} // ✅ MainMap으로 전달
                setSearchKeyword
                selectedRestaurant={selectedRestaurant}
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/regist" element={<RegistUserPage />} />
          <Route path="/manage" element={<ManagePage />} />
          <Route path="/restaurant/:residx" element={<DetailPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}