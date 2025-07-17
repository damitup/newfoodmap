import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLoginCheck, userLogout } from "../../api/user/userLoginCheck";
import "../../styles/mapBtn.css";

export default function MapBtn({ map }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const goMyPosition = () => {
    if (!navigator.geolocation) {
      alert("이 브라우저에서는 위치 정보가 지원되지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log("사용자의 현재 gps 위치:", lat, lon);

        if (!map) {
          alert("지도가 로드되지 않았습니다.");
          return;
        }

        const locPosition = new window.kakao.maps.LatLng(lat, lon);

        // ✅ 지도 중심 이동
        map.setCenter(locPosition);
      },
      (error) => {
        alert("위치 정보를 가져오지 못했습니다.");
        console.error(error);
      }
    );
  };

  useEffect(() => {
    userLoginCheck()
      .then((res) => {
        setIsLoggedIn(res.data.loggedIn);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  const handleLogout = () => {
    userLogout().then(() => setIsLoggedIn(false));
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="mapBtnPage">
      <div className="container top left"></div>
      <div className="container top right">
        <div className="btn login">
          {isLoggedIn ? (
            <span onClick={handleLogout}>로그아웃</span>
          ) : (
            <span onClick={handleLogin}>로그인</span>
          )}
        </div>
        <div className="controller rightView">
          <div className="setMyPos" onClick={goMyPosition}></div>
        </div>
      </div>
    </div>
  );
}
