package kr.map.food.domain.user;

import lombok.Data;

@Data
public class UserDTO {

    private String userIdx;
    private String userId;
    private String userPassword;
    private String userName;
    private String userTel;
    private boolean userdel;    
}
