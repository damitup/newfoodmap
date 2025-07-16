import '../styles/components/header.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { userLoginCheck, userLogout } from "../api/user/userLoginCheck";
import { useState, useEffect } from 'react';

export default function HeaderPage({ name, onSearch}) {
  const [inputValue, setInputValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // React Router에서 현재 경로
  const path = location.pathname + location.search;
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
            navigate("/");
            onSearch(keyword); // ✅ 함수인 경우만 실행
        } else {
            console.warn("onSearch prop is not a function:", onSearch);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") resSearch();
    };

  // 로그인 여부 확인
  useEffect(() => {
    userLoginCheck()
      .then(res => {
        setIsLoggedIn(res.data.loggedIn);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  // 로그아웃
  const handleLogout = () => {
    userLogout()
      .then(() => {
        setIsLoggedIn(false);
       alert("로그아웃 되었습니다.");
        navigate(location.pathname+location.search); // 로그아웃 후 홈으로 이동 (선택)
        
        
      });
  };

  return (
    <div className="headerPage">
      <div className="goHomeIcon">
        <Link to='/' className='linkHome'>
          <div className="logo">
            <svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
              <g transform="scale(0.35)">
                <text x="10" y="60" fontFamily="Verdana" fontSize="50" fontWeight="bold" fill="#FF6347">Food</text>
                <text x="45" y="110" fontFamily="Verdana" fontSize="50" fontWeight="bold" fill="#4CAF50">Map</text>
              </g>
            </svg>
          </div>
        </Link>
      </div>

      <div className="resName">
        <span>{name}</span>
      </div>

      <div className="container searchBox">
        <label htmlFor="searchKeyword" className="screenOut">지도 검색</label>
        <div className="inputWrapper">
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
        </div>
        <div className="kakaoIcon search" onClick={resSearch} />
      </div>

      <div className="btn login">
        {isLoggedIn ? (
          <span onClick={handleLogout}>로그아웃</span>
        ) : (
          <span>
            {/* 로그인 페이지로 이동할 때 현재 경로를 state로 넘겨줌 */}
            <Link to="/login" state={{ from: path }}>로그인</Link>
          </span>
        )}
      </div>
    </div>
  );
}
