package kr.map.food.service.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.map.food.domain.user.UserDTO;
import kr.map.food.mapper.user.UserInfoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserLoginService {

    private final UserInfoMapper userMapper;

    @Transactional
    public UserDTO loginId(UserDTO userDTO) {
        // 1. 아이디로 사용자 정보 조회
    UserDTO userFromDb = userMapper.loginId(userDTO);

    // 2. 사용자 존재 여부 확인
    if (userFromDb == null) {
        throw new IllegalArgumentException("존재하지 않는 아이디입니다.");
    }

    // 3. 비밀번호 일치 여부 확인
    if (!userFromDb.getUserPassword().equals(userDTO.getUserPassword())) {
        throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
    }

    // 4. 로그인 성공 → 사용자 정보 반환
        return userFromDb;
    }
}