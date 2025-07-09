package kr.map.food.mapper.user;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.user.UserDTO;

@Mapper
public interface UserInfoMapper {

    //회원가입
    void registId(UserDTO userDTO);
    //중복 아이디 유효성검사
    int countByUserId(String param);
    //로그인
    UserDTO loginId(UserDTO userDTO);
    // idx
    String getUserIdx();

}
