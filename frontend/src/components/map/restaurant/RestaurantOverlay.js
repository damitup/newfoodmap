export function getOverlayContent(pos) {
  const wrap = document.createElement("div");
  wrap.className = "wrap";

  wrap.innerHTML = `
    <div class="info">
      <div class="title">
        ${pos.resname || "제목 없음"}
        <div class="close" title="닫기"></div>
      </div>
      <div class="body">
        <div class="desc">
          <div class="ellipsis">${pos.newaddr || "주소 없음"}</div>
          <div>
            <a href="/restaurant/${pos.residx}" class="link">상세보기</a>
          </div>
        </div>
      </div>
    </div>
  `;

  return wrap;
}
