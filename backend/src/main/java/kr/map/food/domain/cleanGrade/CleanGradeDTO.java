package kr.map.food.domain.cleanGrade;

import lombok.Data;

@Data
public class CleanGradeDTO {

    // IDX, 업소명, 소재지, 지정등급, 지정년도, 삭제여부
    private String CLIDX;
    private String CLNAME;
    private String ASSIGNGRADE;
    private int ASSIGNYEAR;
    private String ADDRGU;
    private String ADDRDONG;
    private String OLDADDR;
    private String NEWADDR;
    private String NUMADDR;
    private Double XPOS;
    private Double YPOS;
    private String DELYN = "N";

}
