import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 추가
import { userLoginCheck, userLogout } from "../../api/user/userLoginCheck";
import "../../styles/mapBtn.css";

export default function MapBtn({map}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // ✅ 사용 준비


  const goMyPosition = () => {
    if (!navigator.geolocation) {
      alert("이 브라우저에서는 위치 정보가 지원되지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const locPosition = new window.kakao.maps.LatLng(lat, lon);

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: locPosition,
          title: "내 위치",
        });

        // 지도 중심 이동
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
    navigate("/login"); // ✅ 로그인 페이지로 이동
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
          <div className="setMyPos" /*onClick={goMyPosition}*/></div>
        </div>
      </div>
    </div>
  );
}
