package kr.map.food.domain.mapInfo;

import lombok.Data;

@Data
public class PenaltyRestaurantDTO {

    public String RESIDX;           // RESIDX
    public String RESNAME;          // RESNAME
    public int RESRUN;              // RESRUN
    public String RESNUM;           // RESNUM
    public int TYPEIDX;             // TYPEIDX
    public String ADDRGU;           // ADDRGU
    public String ADDRDONG;         // ADDRDONG
    public String OLDADDR;          // OLDADDR
    public String NEWADDR;          // NEWADDR
    public String NUMADDR;          // NUMADDR
    public double XPOS;             // XPOS
    public double YPOS;             // YPOS
    public String RESCLEANSCORE;    // RESCLEANSCORE
    
    public String PENALIDX;         // PENALIDX
    public String PENALTYCONTENT;   // PENALTYCONTENT
    
}
