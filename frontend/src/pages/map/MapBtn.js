import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userLoginCheck, userLogout } from "../../api/user/userLoginCheck"; // ✅ API 함수 import
import '../../styles/mapBtn.css';

export default function MapBtn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    userLoginCheck()
      .then(res => {
        setIsLoggedIn(res.data.loggedIn); // 서버 응답: { loggedIn: true/false }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  const handleLogout = () => {
    userLogout().then(() => setIsLoggedIn(false));
  };

  return (
    <div className="mapBtnPage">
      <div className="container top left"></div>
      <div className="container top right">
        <div className="btn login">
          {isLoggedIn ? (
            <span onClick={handleLogout}>로그아웃</span>
          ) : (
            <span>
              <Link to="/login">로그인</Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
