export function createMapWithCurrentPosition(container, level, onMapReady) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("내 현재 위치:", position);
      const center = new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
      const map = new window.kakao.maps.Map(container, { center, level });

      new window.kakao.maps.Marker({ map, position: center });
      onMapReady(map);
    },
    (error) => {
      console.error("내 위치 가져오기 실패:", error);
      const defaultCenter = new window.kakao.maps.LatLng(37.5540, 126.9706);
      const map = new window.kakao.maps.Map(container, { center: defaultCenter, level });
      onMapReady(map);
    }
  );
}
