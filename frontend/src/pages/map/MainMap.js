import { useRef,useEffect,useState   } from "react";
import useRestaurants from "../../hooks/map/RestaurantsHook"; // 경로에 맞게 조정하세요
import { createMarkerWithOverlay } from "../../utils/mapUtils/CreateMarker";
import { getOverlayContent } from "../../components/map/restaurant/RestaurantOverlay";


export default function MainMap({ selectedTab }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [currentOverlay, setCurrentOverlay] = useState(null);


  // ✅ endpoint를 탭에 따라 결정
  const endpointMap = {
    search: "/restaurants",
    best: "/bests",
    clean: "/clean",
    penal: "/penalty",
  };
  console.log(endpointMap);
  const endpoint = endpointMap[selectedTab];
  const { data } = useRestaurants(endpoint); // ✅ 훅 사용

  // 지도 생성 및 마커 갱신
  useEffect(() => {
    if (!window.kakao || !mapRef.current) return;

    const map = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심
      level: 3,
    });

    mapRef.current.kakaoMap = map;
  }, []);

  useEffect(() => {
    const map = mapRef.current?.kakaoMap;
    if (!map || !data) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    data.forEach((pos) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(pos.y, pos.x), // 좌표 필드 이름 확인
        map: map,
      });
      
      const overlay = createMarkerWithOverlay(map, pos,getOverlayContent(pos),(newOverlay) => {
        if (currentOverlay) currentOverlay.setMap(null);
        setCurrentOverlay(newOverlay);
        if (newOverlay) newOverlay.setMap(map);
      });
       window.kakao.maps.event.addListener(marker, "click", () => {
      if (currentOverlay) currentOverlay.setMap(null);
      overlay.setMap(map);
      setCurrentOverlay(overlay);
    });

    markersRef.current.push(marker);
  });
  window.kakao.maps.event.addListener(map, "click", () => {
    if (currentOverlay) {
      currentOverlay.setMap(null);
      setCurrentOverlay(null);
    }
  });
      
  }, [data]);

  return <div ref={mapRef} style={{ width: "100%", height: "900px" }} />;
}
