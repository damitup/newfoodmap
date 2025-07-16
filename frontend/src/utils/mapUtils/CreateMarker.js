export function createMarkerWithOverlay(map, pos, overlayContent, onOverlayOpen, onDetailClick) {
  const marker = new window.kakao.maps.Marker({
    map,
    position: new window.kakao.maps.LatLng(pos.ypos, pos.xpos),
    title: pos.resname || "이름 없음"
  });

  const overlay = new window.kakao.maps.CustomOverlay({
    content: overlayContent,
    position: marker.getPosition(),
    yAnchor: 1
  });

  // 마커 클릭 → 오버레이 표시
  window.kakao.maps.event.addListener(marker, "click", () => {
    if (typeof onOverlayOpen === "function") {
      onOverlayOpen(overlay);
    }
  });

  const closeBtn = overlayContent.querySelector(".close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => overlay.setMap(null));
  }

  const linkBtn = overlayContent.querySelector(".link");
  if (linkBtn) {
    linkBtn.addEventListener("click", (e) => {
      e.preventDefault(); // 페이지 이동 방지
      if (onDetailClick) onDetailClick(pos.residx);
    });
  }

  return { marker, overlay };
}
