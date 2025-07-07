package kr.map.food.domain.apiData.restaurant;

import lombok.Data;

@Data
public class RestaurantKakaoAddressDTO {

    private String roadAddress;
    private String jibunAddress;
    private String postCode;
    private Double latitude;
    private Double longitude;
    private String gu;
    private String dong;
    
}
