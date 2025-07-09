export function createMarkerWithOverlay(map, pos, overlayContentHtml, onOverlayOpen) {
  const marker = new window.kakao.maps.Marker({
    map,
    position: new window.kakao.maps.LatLng(pos.YPOS, pos.XPOS)
  });

  const content = document.createElement("div");
  content.className = "wrap";
  content.innerHTML = overlayContentHtml;

  const overlay = new window.kakao.maps.CustomOverlay({
    content,
    position: marker.getPosition(),
    yAnchor: 1
  });

  window.kakao.maps.event.addListener(marker, "click", () => {
    onOverlayOpen(overlay);
  });

  content.querySelector(".close").addEventListener("click", () => {
    overlay.setMap(null);
    onOverlayOpen(null);
  });

  return overlay;
}
