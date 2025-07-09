package kr.map.food.domain.apiData.penaltyRestaurant;

import lombok.Data;

@Data
public class PenaltyKakaoAddrDTO {
    private String roadAddress;   // 도로명 주소
    private String jibunAddress;  // 지번 주소
    private String postCode;      // 우편번호
    private Double latitude;      // 위도 (Y)
    private Double longitude;     // 경도 (X)
}
