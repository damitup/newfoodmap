import { useRef, useEffect, useState } from "react";
import useRestaurants from "../../hooks/map/RestaurantsHook";
import { createMarkerWithOverlay } from "../../utils/mapUtils/CreateMarker";
import { getOverlayContent } from "../../components/map/restaurant/RestaurantOverlay";
import MapBtn from "./MapBtn";


export default function MainMap({ selectedTab, setBounds, onMapControlReady, selectedRestaurant }) {
  const mapRef = useRef(null);
  const [currentOverlay, setCurrentOverlay] = useState(null);
  const endpointMap = {
    search: "/restaurants",
    best: "/bests",
    clean: "/clean",
    penal: "/penalty",
  };
  const endpoint = selectedTab ? endpointMap[selectedTab] : "/restaurants";
  const { data } = useRestaurants(endpoint);
  const [visibleData, setVisibleData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [overlays, setOverlays] = useState([]);

  // ✅ 지도 객체 초기화
  useEffect(() => {
    if (!window.kakao || !mapRef.current) return;
    console.log(data);
    const map = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780),
      level: 3,
      draggable: true,
      scrollwheel: true,
    });

    mapRef.current.kakaoMap = map;

    // ✅ 지도 이동 끝났을 때 마커 새로 그림
    window.kakao.maps.event.addListener(map, "idle", () => {
      const bounds = map.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();
      const center = map.getCenter();

      if (setBounds) {
        setBounds({
          blY: sw.getLat(),
          blX: sw.getLng(),
          urY: ne.getLat(),
          urX: ne.getLng(),
        });
      }

      if (!data || data.length === 0) return;

      // 기존 마커/오버레이 제거
      markers.forEach((m) => m.setMap(null));
      overlays.forEach((o) => o.setMap(null));
      setMarkers([]);
      setOverlays([]);

      // bounds 내 + 중심 가까운 순 + 최대 50개
      const filtered = data
        .filter((item) => {
          const x = parseFloat(item.xpos);
          const y = parseFloat(item.ypos);
          return (
            x >= sw.getLng() && x <= ne.getLng() &&
            y >= sw.getLat() && y <= ne.getLat()
          );
        })
        .sort((a, b) => {
          const aDist = Math.pow(center.getLat() - a.ypos, 2) + Math.pow(center.getLng() - a.xpos, 2);
          const bDist = Math.pow(center.getLat() - b.ypos, 2) + Math.pow(center.getLng() - b.xpos, 2);
          return aDist - bDist;
        })
        .slice(0, 50);

      const newMarkers = [];
      const newOverlays = [];

      filtered.forEach((pos) => {
        const { marker, overlay } = createMarkerWithOverlay(
          map,
          pos,
          getOverlayContent(pos),
          (newOverlay) => {
            if (currentOverlay) currentOverlay.setMap(null);
            newOverlay.setMap(map);
            setCurrentOverlay(newOverlay);
          }
        );
        marker.setMap(map);
        newMarkers.push(marker);
        newOverlays.push(overlay);
      });

      setMarkers(newMarkers);
      setOverlays(newOverlays);
    });

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

    if (onMapControlReady) {
      onMapControlReady((positions) => {
        const bounds = new window.kakao.maps.LatLngBounds();
        positions.forEach((pos) => {
          bounds.extend(new window.kakao.maps.LatLng(pos.ypos, pos.xpos));
        });
        map.setBounds(bounds);
      });
    }
  }, [selectedTab, data]);
    // ✅ 음식점 클릭 시 오버레이 표시
    useEffect(() => {
      const map = mapRef.current?.kakaoMap;
      if (!map || !selectedRestaurant) return;

      const pos = new window.kakao.maps.LatLng(selectedRestaurant.ypos, selectedRestaurant.xpos);
      map.setLevel(3);
      map.panTo(pos);

      const { overlay } = createMarkerWithOverlay(
        map,
        selectedRestaurant,
        getOverlayContent(selectedRestaurant),
        (newOverlay) => {
          if (currentOverlay) currentOverlay.setMap(null);
          newOverlay.setMap(map);
          setCurrentOverlay(newOverlay);
        }
      );

    overlay.setMap(map);
    setCurrentOverlay(overlay);

    return () => {
      overlay.setMap(null);
    };
  }, [selectedRestaurant]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      <MapBtn map={mapRef.current?.kakaoMap} />
    </div>
  );
}