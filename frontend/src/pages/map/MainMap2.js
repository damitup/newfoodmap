import { useRef, useEffect, useState } from "react";
import useRestaurants from "../../hooks/map/RestaurantsHook";
import { createMarkerWithOverlay } from "../../utils/mapUtils/CreateMarker";
import { getOverlayContent } from "../../components/map/restaurant/RestaurantOverlay";

export default function MainMap({ selectedTab }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const overlaysRef = useRef([]);
  const [currentOverlay, setCurrentOverlay] = useState(null);
  const mapClickListenerRef = useRef(null);

  const [체크, set체크] = useState(0);

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

  // ✅ 마커 및 오버레이 처리
  useEffect(() => {
    const map = mapRef.current?.kakaoMap;
    if (!map || !data || data.length === 0) return;
    
    console.log(map);
    
    markersRef.current.forEach((marker, idx) => {
      marker.setMap(null);
    });
    markersRef.current = [];
  
    // 기존 오버레이 제거
    overlaysRef.current.forEach((overlay, idx) => {
        console.log(`🔴 오버레이 제거: #${idx + 1}`);
        overlay.setMap(null);
    });
    overlaysRef.current = [];

   if (currentOverlay) {
      console.log("🟡 currentOverlay 제거");
      currentOverlay.setMap(null);
      setCurrentOverlay(null);
    }

    // ✅ 기존 map 클릭 이벤트 제거
    if (mapClickListenerRef.current ) {
      window.kakao.maps.event.removeListener(mapClickListenerRef.current);
      mapClickListenerRef.current = null;
    }
    
    console.log('===========');

    console.log("🧹 before: 기존 마커 수:", markersRef.current.length);

    // ✅ 마커 및 오버레이 생성
    console.log('data: ',data);
    data.forEach((pos, idx) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(pos.y, pos.x),
        map,
      });

      const overlay = createMarkerWithOverlay(
        map,
        pos,
        getOverlayContent(pos),
        (newOverlay) => {
          if (currentOverlay) currentOverlay.setMap(null);
          newOverlay.setMap(map);
          setCurrentOverlay(newOverlay);
        }
      );

      window.kakao.maps.event.addListener(marker, "click", () => {
        if (currentOverlay) currentOverlay.setMap(null);
        overlay.setMap(map);
        setCurrentOverlay(overlay);
      });



      markersRef.current.push(marker);
      overlaysRef.current.push(overlay);


    });

    // ✅ 지도 클릭 시 오버레이 닫기
    const clickListener = window.kakao.maps.event.addListener(map, "click", () => {
      if (currentOverlay) {
        currentOverlay.setMap(null);
        setCurrentOverlay(null);
        console.log("📍 지도 클릭으로 오버레이 닫음");
      }
    });

    console.log("🧹 after: 기존 마커 수:", markersRef.current.length);

    // Marker 용
    for (var i = 0; i < markersRef.current.length; i++) {
        markersRef.current[i].setMap(null);
    }   
    


    // Marker 용
    // for (var i = 0; i < markersRef.current.length; i++) {
    //     markersRef.current[i].setMap(map);
    // }   
    
    
    for (var i = 0; i < overlaysRef.current.length; i++) {
        overlaysRef.current[i].setMap(null);
    }        
    //overlay.setMap(map);
    //setCurrentOverlay(overlay);

    mapClickListenerRef.current = clickListener;

    set체크(체크+1);

    // ✅ cleanup
    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      overlaysRef.current.forEach(overlay => overlay.setMap(null));
      overlaysRef.current = [];

      if (currentOverlay) {
        currentOverlay.setMap(null);
        setCurrentOverlay(null);
      }

      if (mapClickListenerRef.current) {
        window.kakao.maps.event.removeListener(mapClickListenerRef.current);
        mapClickListenerRef.current = null;
      }
    };
  }, [data, selectedTab]);

  return <div ref={mapRef} style={{ width: "100%", height: "900px" }} />;
}
