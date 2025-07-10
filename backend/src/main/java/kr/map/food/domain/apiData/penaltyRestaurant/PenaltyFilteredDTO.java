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
    private int TYPEIDX;
    // 지번 주소
    private String SITEADDR;        
    // 도로명 주소
    private String ROADADDR;
    // 위반 내용
    private String PENALTYCONTENT;  

}
