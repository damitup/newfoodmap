import { useEffect, useRef } from "react";

export default function MainMap({ selectedTab, data }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!window.kakao) return;

    const map = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심
      level: 3
    });

    mapRef.current.kakaoMap = map; // map 인스턴스를 참조에 저장
  }, []);

  // 마커 갱신
  useEffect(() => {
    const map = mapRef.current?.kakaoMap;
    if (!map || !data) return;

    // 기존 마커 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    data.forEach((pos) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(pos.lat, pos.lng),
        map: map
      });
      markersRef.current.push(marker);
    });

  }, [data]);

  return <div ref={mapRef} style={{ width: "100%", height: "900px" }} />;
}