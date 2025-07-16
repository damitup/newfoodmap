export function getOverlayContent(pos) {
  return `
    <div class="wrap">
      <div class="info">
        <div class="title">
          ${pos.resName}
          <div class="close" title="닫기"></div>
        </div>
        <div class="body">
          <div class="desc">
            <div class="ellipsis">${pos.newAddr}</div>
            <div><a href="/restaurant/${pos.resIdx}" target="_blank" class="link">상세보기</a></div>
          </div>
        </div>
      </div>
    </div>
  `;
}