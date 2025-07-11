package kr.map.food.service.apiData.dataTrans;

import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyFilteredDTO;
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
    
        // 변환할때 사용할 주소 선택
        String queryAddress = !FindNullData.isEmpty(dto.getNEWADDR()) 
            ? dto.getNEWADDR()
            : dto.getOLDADDR();


        // 카카오맵 api 호출
        RestaurantKakaoAddressDTO kakaoInfo = KakaoApiClient.searchAddress(queryAddress);

        if (kakaoInfo == null) {
            return;
        }

        // 결과값 세팅
        if (FindNullData.isEmpty(dto.getNEWADDR())) {
            dto.setNEWADDR(kakaoInfo.getRoadAddress());
        }
        if (FindNullData.isEmpty(dto.getOLDADDR())) {
            dto.setOLDADDR(kakaoInfo.getJibunAddress());
        }
        if (FindNullData.isEmpty(dto.getNUMADDR())) {
            dto.setNUMADDR(kakaoInfo.getPostCode());
        }
        dto.setADDRGU(kakaoInfo.getGu());
        dto.setADDRDONG(kakaoInfo.getDong());
        dto.setXPOS(kakaoInfo.getLongitude());
        dto.setYPOS(kakaoInfo.getLatitude());
    
    }


    public static void applyKakaoInfoToPenaltyDTO(PenaltyKakaoAddrDTO kakaoInfo, PenaltyFilteredDTO dto) {

        if (kakaoInfo == null || dto == null) return;

        if(FindNullData.isEmpty(dto.getROADADDR()) && kakaoInfo.getRoadAddress() != null) {
            dto.setROADADDR(kakaoInfo.getRoadAddress());
        }

        if(FindNullData.isEmpty(dto.getSITEADDR()) && kakaoInfo.getJibunAddress() != null) {
            dto.setSITEADDR(kakaoInfo.getJibunAddress());
        }

        if(FindNullData.isEmpty(dto.getPXPOS()) && kakaoInfo.getLongitude() != null) {
            dto.setPXPOS(String.valueOf(kakaoInfo.getLongitude()));
        }
        
        if(FindNullData.isEmpty(dto.getPYPOS()) && kakaoInfo.getLatitude() != null) {
            dto.setPYPOS(String.valueOf(kakaoInfo.getLatitude()));
        }
    }
}    