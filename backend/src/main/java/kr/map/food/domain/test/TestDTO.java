package kr.map.food.domain.test;

import lombok.Data;

@Data
public class TestDTO {

    // IDX, 업소명, 소재지, 지정등급, 지정년도, 삭제여부
    private String cleanIdx;
    private String upsoNm;
    private String siteAddr;
    private String assignGrade;
    private int assignYear;
    private String clDelYn = "N";
}