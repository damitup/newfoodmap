export const kakaoMapApi = {
  loadScript(callback) {
    const scriptId = "kakao-map-sdk";

    // 이미 스크립트가 로드되었는지 확인
    if (document.getElementById(scriptId)) {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(callback);
      } else {
        // script는 있지만 아직 로딩 중이면 onload 설정
        document.getElementById(scriptId).onload = () => {
          window.kakao.maps.load(callback);
        };
      }
      return;
    }

    // 새 script 태그 생성
    const script = document.createElement("script");
    script.id = scriptId;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=52ed3a86aca1c97ca34b9222c7f4a83b&autoload=false";
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(callback);
    };

    document.head.appendChild(script);
  }
};