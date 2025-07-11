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

  

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flex: 0 }}>
        <div style={{display:"flex"}}>
        <TabMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
          {/* 선택된 탭에 따라 컴포넌트 렌더링 */}
          {isExpanded && selectedTab === "search" && <BarSearch />}
          {isExpanded && selectedTab === "best" && <BarBest />}
          {isExpanded && selectedTab === "clean" && <BarClean />}
          {isExpanded && selectedTab === "penal" && <BarPenal />}
          {isExpanded && selectedTab === "mypage" && <BarMy />}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <Routes>
          {/* 일반 페이지  */}
          <Route path="/" element={<MainMap selectedTab={selectedTab}/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/regist" element={<RegistUserPage />} />
          <Route path="/manage" element={<ManagePage />} />
          <Route path="/detail/:residx" element={<DetailPage/>}/>

          {/* 지도 페이지 */}
          {/* <Route path="/map/bests" element={<BestRestaurantsMapPage/>}></Route>
          <Route path="/map/restaurants" element={<RestaurantsMapPage/>}></Route> */}
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;