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
public class UserService {


    private final UserInfoMapper userMapper;

    @Transactional
    public void registerUser(UserDTO userDTO) {

        // 유효성 검사
        if (userDTO.getUserId() == null || userDTO.getUserId().isBlank()) {
            throw new IllegalArgumentException("아이디는 필수 입력입니다.");
        }

        if (userMapper.countByUserId(userDTO.getUserId()) > 0) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }

        log.info("설마?");
        if (userDTO.getUserPassword() == null || userDTO.getUserPassword().length() < 4) {
            throw new IllegalArgumentException("비밀번호는 4자 이상이어야 합니다.");
        }

        if (userDTO.getUserName() == null || userDTO.getUserName().isBlank()) {
            throw new IllegalArgumentException("이름은 필수 입력입니다.");
        }

        log.info("after");

        // 기본값 설정
        userDTO.setUserdel(false);
        userDTO.setUserIdx(generateUserIdx());

        log.info("mapper 등록 전");

        // 등록
        userMapper.registId(userDTO);
    }

    private String generateUserIdx() {
        String max = userMapper.getUserIdx(); // 예: user00007

    int nextNumber = 1; // 기본값

    if (max != null && max.startsWith("user")) {
        String numberStr = max.substring(4); 
        nextNumber = Integer.parseInt(numberStr) + 1;
    }

    return String.format("user%03d", nextNumber); 
    }
}