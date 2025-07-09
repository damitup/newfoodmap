package kr.map.food.domain.apiData.penaltyRestaurant;

import lombok.Data;

@Data
public class PenaltyKakaoAddrDTO {

    private String roadAddr;
    private String siteAddr;
    private String postCode;
    private Double latitude;
    private Double longitude;
    private String gu;
    private String dong;
    
}
