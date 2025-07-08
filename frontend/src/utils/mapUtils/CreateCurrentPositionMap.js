export function createMapWithCurrentPosition(container, level, onMapReady) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const center = new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
      const map = new window.kakao.maps.Map(container, { center, level });

      new window.kakao.maps.Marker({ map, position: center });
      onMapReady(map);
    },
    () => {
      const defaultCenter = new window.kakao.maps.LatLng(37.5665, 126.9780);
      const map = new window.kakao.maps.Map(container, { center: defaultCenter, level });
      onMapReady(map);
    }
  );
}
