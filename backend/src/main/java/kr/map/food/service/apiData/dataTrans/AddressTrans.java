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

        dto.setADDRGU(gu);
        dto.setADDRDONG(dong);

        dto.setXPOS(kakaoInfo.getLongitude());
        dto.setYPOS(kakaoInfo.getLatitude());

        System.out.println("XPOS 세팅: " + dto.getXPOS());
        System.out.println("YPOS 세팅: " + dto.getYPOS());
    
    }

}    