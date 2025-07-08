package kr.map.food.controller.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.map.food.domain.user.UserDTO;
import kr.map.food.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {

    private final UserService userService;

    
    
     @PostMapping("/register")
        public ResponseEntity<String> registerUser(@RequestBody UserDTO dto) {
        log.info("dto: {}", dto.toString());
        userService.registerUser(dto);
        
        return ResponseEntity.ok("컨트롤러 회원가입 성공");
    }
}
