import { useRef, useEffect,useState } from "react";
import useRestaurants from "../../hooks/map/RestaurantsHook";
import { createMarkerWithOverlay } from "../../utils/mapUtils/CreateMarker";
import { getOverlayContent } from "../../components/map/restaurant/RestaurantOverlay";
import  MapBtn from "./MapBtn";

export default function MainMap({ selectedTab }) {
  const mapRef = useRef(null);
  const [bounds, setBounds] = useState(null); 
  const endpointMap = {
    search: "/restaurants",
    best: "/bests",
    clean: "/clean",
    penal: "/penalty",
  };
  const endpoint = selectedTab ? endpointMap[selectedTab] : "/restaurants";
  const { data } = useRestaurants(endpoint);


  // ✅ 지도 초기 생성
  useEffect(() => {
  if (!window.kakao || !mapRef.current) return;

  const map = new window.kakao.maps.Map(mapRef.current, {
    center: new window.kakao.maps.LatLng(37.5665, 126.9780),
    level: 3,
    draggable: true,
    scrollwheel: true,
  });

  mapRef.current.kakaoMap = map;

    window.kakao.maps.event.addListener(map, "idle", () => {
      const bounds = map.getBounds();
      const sw = bounds.getSouthWest(); // 좌하단
      const ne = bounds.getNorthEast(); // 우상단

      setBounds({
        blY: sw.getLat(),
        blX: sw.getLng(),
        urY: ne.getLat(),
        urX: ne.getLng(),
      });
    });

  // ✅ 지도를 생성한 후 위치를 가져와서 중심 이동
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const userPos = new window.kakao.maps.LatLng(lat, lng);

      // ✅ 지도가 생성된 이후에 위치 중심 이동
      map.setCenter(userPos);
     
    },
    (error) => {
      console.warn("GPS 위치 정보를 가져오지 못했습니다:", error);
    }
  );
}, []);

  let overlayTest = [];
  // ✅ 마커 및 오버레이 처리
  useEffect(() => {

    let 마커관리 = [];
    let 오버레이관리 = [];

    const map = mapRef.current?.kakaoMap;
    if (!map || !data || data.length === 0) return;


    data.forEach((pos, idx) => {
      const { marker, overlay }  = createMarkerWithOverlay(
        map,
        pos,
        getOverlayContent(pos),
        //오버레이 열 때 만드는 event
        (newOverlay) => {
          newOverlay.setMap(map);
        }
      );
      마커관리.push(marker);
      오버레이관리.push(overlay);
    });

    // ✅ cleanup
    return () => {
      오버레이관리.forEach(overlay => overlay.setMap(null));
      마커관리.forEach(marker => marker.setMap(null));
    };
  }, [data, selectedTab]);
  console.log( "현재위치 " ,mapRef.current);

  return ( 
  
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      
      <MapBtn map={mapRef.current?.kakaoMap} /> {/* ✅ 지도 위에 겹쳐짐 */}
    </div>
    );
}
