package kr.map.food.domain.apiData.restaurant;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RestaurantApiDTO {

    private String RESIDX;
    private String RESNAME;
    private int RESRUN;
    private String RESNUM;
    private int TYPEIDX;
    private String RESCLEANSCORE;
    private String ADDRGU;
    private String ADDRDONG;
    private String OLDADDR;
    private String NEWADDR;
    private String NUMADDR;
    private Double XPOS;
    private Double YPOS;
    
}
