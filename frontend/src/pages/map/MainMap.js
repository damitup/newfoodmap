import { useRef, useEffect, useState } from "react";
import useRestaurants from "../../hooks/map/RestaurantsHook";
import { createMarkerWithOverlay } from "../../utils/mapUtils/CreateMarker";
import { getOverlayContent } from "../../components/map/restaurant/RestaurantOverlay";
import MapBtn from "./MapBtn";

export default function MainMap({ selectedTab, setBounds }) {
  const mapRef = useRef(null);
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

    // ✅ 지도의 idle 이벤트로 bounds 전달
    window.kakao.maps.event.addListener(map, "idle", () => {
      const bounds = map.getBounds();
      const sw = bounds.getSouthWest(); // 좌하단
      const ne = bounds.getNorthEast(); // 우상단

      if (setBounds) {
        setBounds({
          blY: sw.getLat(),
          blX: sw.getLng(),
          urY: ne.getLat(),
          urX: ne.getLng(),
        });
      }
    });

    // ✅ GPS 위치 중심 이동
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const userPos = new window.kakao.maps.LatLng(lat, lng);
        map.setCenter(userPos);
      },
      (error) => {
        console.warn("GPS 위치 정보를 가져오지 못했습니다:", error);
      }
    );
  }, [selectedTab]);

  // ✅ 마커 및 오버레이 처리
  useEffect(() => {
    const map = mapRef.current?.kakaoMap;
    if (!map || !data || data.length === 0) return;

    let 마커관리 = [];
    let 오버레이관리 = [];

    data.forEach((pos) => {
      const { marker, overlay } = createMarkerWithOverlay(
        map,
        pos,
        getOverlayContent(pos),
        (newOverlay) => {
          newOverlay.setMap(map);
        }
      );
      마커관리.push(marker);
      오버레이관리.push(overlay);
    });

    // ✅ cleanup
    return () => {
      오버레이관리.forEach((overlay) => overlay.setMap(null));
      마커관리.forEach((marker) => marker.setMap(null));
    };
  }, [data, selectedTab]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      <MapBtn map={mapRef.current?.kakaoMap} />
    </div>
  );
}
