export function getOverlayContent(pos) {
  return `
    <div class="info">
      <div class="title">
        ${pos.RESNAME}
        <div class="close" title="닫기"></div>
      </div>
      <div class="body">
        <div class="desc">
          <div class="ellipsis">${pos.NEWADDR}</div>
          <div><a href="/restaurant/${pos.RESIDX}" target="_blank" class="link">상세보기</a></div>
        </div>
      </div>
    </div>
  `;
}
