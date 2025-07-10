export function getPenaltyOverlayContent(pos) {
  return `
    <div class="info">
      <div class="title">
        ${pos.resname}
        <div class="close" title="닫기"></div>
      </div>
      <div class="body">
        <div class="desc">
          <div class="ellipsis">${pos.newaddr}</div>
          <div><a href="/restaurant/${pos.residx}" target="_blank" class="link">상세보기</a></div>
        </div>
      </div>
    </div>
  `;
}
