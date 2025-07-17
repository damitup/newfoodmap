package kr.map.food.domain.user;

import lombok.Data;

@Data
public class FavoriteDTO {
    private String userIdx;
    private String userName;
    private String resIdx;
    private String resName;
    private String newAddr;
    private String oldAddr;
    private String resNum;
}
