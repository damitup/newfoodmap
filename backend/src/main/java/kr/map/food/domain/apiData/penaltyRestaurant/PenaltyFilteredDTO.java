package kr.map.food.domain.apiData.penaltyRestaurant;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PenaltyFilteredDTO {

    // 업소명
    private String STORENAME;
    // 업종명
    private String BIZTYPE;
    // 업태명
    private String CATEGORYNAME;
    // 지번 주소
    private String SITEADDR;        
    // 도로명 주소
    private String ROADADDR;
    // 위반 내용
    private String PENALTYCONTENT;
    // Kakao API에서 받은 경도 (longitude)
    private String PXPOS;  
    // Kakao API에서 받은 위도 (latitude)
    private String PYPOS;  

}
