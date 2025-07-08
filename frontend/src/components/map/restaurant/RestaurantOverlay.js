export function getOverlayContent(pos) {
  return `
    <div class="info">
      <div class="title">
        ${pos.title}
        <div class="close" title="닫기"></div>
      </div>
      <div class="body">
        <div class="img">
          <img src="${pos.img}" width="73" height="70">
        </div>
        <div class="desc">
          <div class="ellipsis">${pos.address}</div>
          <div class="jibun ellipsis">${pos.jibun}</div>
          <div><a href="${pos.link}" target="_blank" class="link">홈페이지</a></div>
        </div>
      </div>
    </div>
  `;
}
