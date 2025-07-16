package kr.map.food.domain.mapInfo;

import lombok.Data;

@Data
public class CleanGradeMapDTO {

    private String RESIDX;  //프론트 오버레이때문에 통일화
    private String RESNAME;
    private String RESCLEANSCORE;
    private int ASSIGNYEAR;
    private String ADDRGU;
    private String ADDRDONG;
    private String OLDADDR;
    private String NEWADDR;
    private String NUMADDR;
    private Double XPOS;
    private Double YPOS;
    private String DELYN;
    
}
