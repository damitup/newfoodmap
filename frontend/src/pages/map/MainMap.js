import { useRef, useEffect } from "react";
import useRestaurants from "../../hooks/map/RestaurantsHook";
import { createMarkerWithOverlay } from "../../utils/mapUtils/CreateMarker";
import { getOverlayContent } from "../../components/map/restaurant/RestaurantOverlay";

export default function MainMap({ selectedTab }) {
  const mapRef = useRef(null);


  const endpointMap = {
    search: "/restaurants",
    best: "/bests",
    clean: "/clean",
    penal: "/penalty",
  };
  const endpoint = selectedTab ? endpointMap[selectedTab] : null;
  const { data } = useRestaurants(endpoint);


  // ✅ 지도 초기 생성
  useEffect(() => {
    if (!window.kakao || !mapRef.current) return;

    const map = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780),
      level: 3,
    });

    mapRef.current.kakaoMap = map;
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

  return <div ref={mapRef} style={{ width: "100%", height: "900px" }} />;
}
