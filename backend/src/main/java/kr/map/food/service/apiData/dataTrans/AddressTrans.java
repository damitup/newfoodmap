package kr.map.food.service.apiData.dataTrans;

import kr.map.food.domain.apiData.restaurant.RestaurantApiDTO;
import kr.map.food.domain.apiData.restaurant.RestaurantKakaoAddressDTO;
import kr.map.food.domain.apiData.restaurant.RestaurantRawDTO;

public class AddressTrans {

    // 구 설정
    public static String parseGu( String addr ) {
        if (addr == null || addr.isBlank()) return "";
        String[] parts = addr.trim().split(" ");
        return parts.length >= 2 ? parts[1] : "";
    }

    // 동 설정
    public static String parseDong( String addr ) {
        if (addr == null || addr.isBlank()) return "";
        String[] parts = addr.trim().split(" ");
        return parts.length >= 3 ? parts[2] : "";
    }
            
    // 우편번호 앞에 0 추가
    public static String formatPostCode(String rawPostCode) {
        if (rawPostCode == null || rawPostCode.isBlank()) {
            return "00000"; // 기본값
        }
        
        // 혹시 숫자 아닌 문자가 섞여있으면 제거
        String digitsOnly = rawPostCode.replaceAll("\\D", "");

        // 5자리로 왼쪽에 0 채움
        return String.format("%05d", Integer.parseInt(digitsOnly));
    }

    // 지번주소, 도로명주소, x좌표, y좌표 중 하나라도 없을 때
    public static void setAddress ( RestaurantRawDTO raw, RestaurantApiDTO dto ) {

        System.out.println("setAddress 호출됨, 주소 변환 시도: " + raw.getSITEWHLADDR());
    
        // 변환할때 사용할 주소 선택
        String queryAddress = !FindNullData.isEmpty(dto.getNEWADDR()) 
            ? dto.getNEWADDR()
            : dto.getOLDADDR();

        System.out.println("카카오 API 호출 주소: " + queryAddress);

        // 카카오맵 api 호출
        RestaurantKakaoAddressDTO kakaoInfo = KakaoApiClient.searchAddress(queryAddress);

        if (kakaoInfo == null || kakaoInfo.getLongitude() == null || kakaoInfo.getLatitude() == null) {
            System.out.println("카카오 API에서 좌표 정보 없음, 저장 취소");
            return;  // 저장 중단 또는 적절한 조치
        }

        System.out.println("카카오 API 결과 있음 - 좌표: (" + kakaoInfo.getLongitude() + ", " + kakaoInfo.getLatitude() + ")");

        // 결과값 세팅
        if (FindNullData.isEmpty(dto.getNEWADDR())) {
            dto.setNEWADDR(kakaoInfo.getRoadAddress());
            System.out.println("NEWADDR 세팅: " + dto.getNEWADDR());
        }
        if (FindNullData.isEmpty(dto.getOLDADDR())) {
            dto.setOLDADDR(kakaoInfo.getJibunAddress());
            System.out.println("OLDADDR 세팅: " + dto.getOLDADDR());
        }
        if (FindNullData.isEmpty(dto.getNUMADDR())) {
            dto.setNUMADDR(kakaoInfo.getPostCode());
            System.out.println("NUMADDR 세팅: " + dto.getNUMADDR());
        }

        String gu = kakaoInfo.getGu();
        String dong = kakaoInfo.getDong();

        // 구 못가져왔으면 OLDADDR에서 파싱
        if (FindNullData.isEmpty(gu)) {
            gu = parseGu(dto.getOLDADDR());
            System.out.println("구를 OLDADDR에서 파싱: " + gu);
        }

        // 동 못가져왔으면 OLDADDR에서 파싱
        if (FindNullData.isEmpty(dong)) {
            dong = parseDong(dto.getOLDADDR());
            System.out.println("동을 OLDADDR에서 파싱: " + dong);
        }

        //normalize(dong);

        dto.setADDRGU(gu);
        dto.setADDRDONG(dong);

        dto.setXPOS(kakaoInfo.getLongitude());
        dto.setYPOS(kakaoInfo.getLatitude());

        System.out.println("XPOS 세팅: " + dto.getXPOS());
        System.out.println("YPOS 세팅: " + dto.getYPOS());
    
    }

    // public static String normalize(String dong) {
    //     return switch (dong) {
    //         case "자곡동", "율현동" -> "세곡동";
    //         case "내발산동", "외발산동" -> "발산동";
    //         case "과해동", "오쇠동", "오곡동" -> "공항동";
    //         case "천왕동" -> "오류동";
    //         case "궁동", "온수동" -> "수궁동";
    //         case "신설동", "용두동" -> "용신동";
    //         case "동작동" -> "사당동";
    //         case "상도1동" -> "상도동";
    //         case "본동" -> "노량진동";
    //         case "중동" -> "성산동";
    //         case "노고산동" -> "대흥동";
    //         case "하중동", "당인동" -> "상수동";
    //         case "토정동" -> "용강동";
    //         case "현석동", "구수동" -> "신수동";
    //         case "신공덕동" -> "공덕동";
    //         case "신정동" -> "신수동";
    //         case "창전동" -> "서강동";
    //         case "마포동" -> "도화동";
    //         case "봉원동", "대현동", "대신동" -> "신촌동";
    //         case "현저동", "냉천동", "영천동", "옥천동" -> "천연동";
    //         case "미근동", "합동", "충정로2가", "충정로3가" -> "충현동";
    //         case "우면동", "원지동" -> "양재동";
    //         case "신원동", "염곡동" -> "내곡동";
    //         case "상왕십리동", "홍익동", "도선동", "하왕십리동" -> "왕십리동";
    //         case "성수동1가", "성수동2가" -> "성수동";
    //         case "금호동1가", "금호동2가", "금호동3가", "금호동4가" -> "금호동";
    //         case "성북동1가", "동소문동1가", "동소문동4가" -> "성북동";
    //         case "동선동1가", "동선동2가", "동선동3가", "동선동4가", "동선동5가", "동소문동5가", "동소문동6가", "동소문동7가" -> "동선동";
    //         case "안암동1가", "안암동2가", "안암동3가", "안암동4가", "안암동5가" -> "안암동";
    //         case "상월곡동", "하월곡동" -> "월곡동";
    //         case "삼선동1가", "삼선동2가", "삼선동3가", "삼선동4가", "삼선동5가", "동소문동2가", "동소문동3가" -> "삼선동";
    //         case "보문동1가", "보문동2가", "보문동3가", "보문동4가", "보문동5가", "보문동6가", "보문동7가" -> "보문동";
    //         case "신천동" -> "잠실동";
    //         case "영등포동1가", "영등포동2가", "영등포동3가", "영등포동4가", "영등포동5가", "영등포동6가", "영등포동7가", "영등포동8가" -> "영등포동";
    //         case "당산동1가", "당산동2가", "당산동3가", "당산동4가", "당산동5가", "당산동6가" -> "당산동";
    //         case "양평동1가", "양평동2가", "양평동3가", "양평동4가", "양평동5가", "양평동6가", "양화동" -> "양평동";
    //         case "문래동1가", "문래동2가", "문래동3가", "문래동4가", "문래동5가", "문래동6가" -> "문래동";
    //         case "산천동", "도원동", "청암동", "문배동", "원효로1가", "원효로2가", "원효로3가", "원효로4가", "신창동", "신계동" -> "원효로동";
    //         case "용산동1가", "용산동2가", "용산동3가", "용산동4가", "용산동5가", "용산동6가" -> "용산동";
    //         case "청파동1가", "청파동2가", "청파동3가", "서계동" -> "청파동";
    //         case "동빙고동", "주성동" -> "서빙고동";
    //         case "한강로1가", "한강로2가", "한강로3가" -> "한강로동";
    //         case "갈월동", "동자동" -> "남영동";
    //         case "세종로", "누상동", "누하동", "궁정동", "옥인동", "신교동", "청운동", "효자동", "통인동", "창성동" -> "청운효자동";
    //         case "통의동", "신문로1가", "신문로2가", "체부동", "내수동", "필운동", "도렴동", "내자동", "적선동", "당주동" -> "사직동";
    //         case "명륜1가", "명륜2가", "명륜3가", "명륜4가" -> "혜화동";
    //         case "재동", "계동", "원서동" -> "가회동";
    //         case "연지동", "돈의동", "수송동", "묘동", "종로1가", "종로2가", "종로3가", "종로4가", "종로5가", "종로6가", 
    //                 "관수동", "서린동", "권농동", "충신동", "견지동", "원남동", "봉익동", "장사동", "익선동", "와룡동", "관훈동", 
    //                 "청진동", "효제동", "예지동", "경운동", "운니동", "인의동", "공평동", "중학동", "관철동", "인사동", "낙원동" -> "종로동";
    //         case "소격동", "송현동", "사간동", "팔판동", "화동", "안국동" -> "삼청동";
    //         case "홍파동", "평동", "교북동", "행촌동" -> "교남동";
    //         case "신영동", "홍지동" -> "부암동";
    //         case "연건동", "동숭동" -> "이화동";
    //         case "구기동" -> "평창동";
    //         case "방산동", "주교동", "을지로1가", "을지로2가", "을지로3가", "을지로4가", "을지로5가", "을지로6가", "을지로7가", "초동", "입정동", "저동2가",
    //                  "산림동", "인현동1가" -> "을지로동";
    //         case "남창동", "회현동1가", "회현동2가", "회현동3가", "봉래동1가", "봉래동2가", "남대문로5가" -> "회현동";
    //         case "서소문동", "남대문로3가", "남대문로4가", "태평로2가", "순화동", "충정로1가", "정동", "의주로1가", "북창동" -> "소공동";
    //         case "충무로4가", "충무로5가", "오장동", "쌍림동", "광희동1가", "광희동2가", "예관동", "인현동2가" -> "광희동";
    //         case "장충동1가", "장충동2가" -> "장충동";
    //         case "남산동1가", "남산동2가", "남산동3가", "명동1가", "명동2가", "다동", "수하동", "남대문로1가", "남대문로2가", "저동1가", "장교동", "삼각동", 
    //                 "충무로1가", "충무로2가", "무교동", "수표동", "태평로1가" -> "명동";
    //         case "충무로3가", "필동1가", "필동2가", "필동3가", "주자동", "남학동", "묵정동", "예장동" -> "필동";
    //         case "만리동1가", "만리동2가", "의주로2가" -> "중림동";
    //         case "흥인동", "무학동" -> "신당동";

    //         default -> dong;
    //     };
    // }

}    