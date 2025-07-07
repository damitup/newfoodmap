import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// CSS import
import './App.css';
import './styles/login.css';
import './styles/regist.css';
import './styles/components/tabMenu.css';
import './styles/components/sideBar.css';
import './styles/components/managePage.css'

// Page import
import MapPage from './pages/MapPage.js';
import LoginPage from './pages/login/LogInPage.js';
import RegistUserPage from './pages/login/RegistUserPage.js';
import TabMenu from './components/TabMenu.js';
import BarBest from './pages/sideBar/TabBestRes.js';
import BarClean from './pages/sideBar/TabCleanGrd.js';
import BarMy from './pages/sideBar/TabMyPage.js';
import BarPenel from './pages/sideBar/TabPenel.js';
import BarSearch from './pages/sideBar/TabSearch.js';
import ManagePage from './components/ManagePage.js';

function Layout() {
  const location = useLocation();
  const isManagePage = location.pathname === '/manage';

  if (isManagePage) {
    return (
      <Routes>
        <Route path="/manage" element={<ManagePage />} />
      </Routes>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flex: 0 }}>
        <TabMenu />
      </div>

      <div style={{ flex: 1 }}>
        <Routes>
          {/* 일반 페이지  */}
          <Route path="/" element={<MapPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/regist" element={<RegistUserPage />} />

          {/* 사이드바 관련 라우트 */}
          <Route path="/sidebar/search" element={<BarSearch />} />
          <Route path="/sidebar/clean" element={<BarClean />} />
          <Route path="/sidebar/mypage" element={<BarMy />} />
          <Route path="/sidebar/penel" element={<BarPenel />} />
          <Route path="/sidebar/best" element={<BarBest />} />
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
