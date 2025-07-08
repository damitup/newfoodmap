package kr.map.food.mapper.user;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.user.UserDTO;

@Mapper
public interface UserMapper {

    //회원가입
    void registId(UserDTO userDTO);
    //중복 아이디 유효성검사
    int countByUserID(String userId);
    //로그인
    void findId(UserDTO userDTO);
    // idx
    String getUserIdx();

}
