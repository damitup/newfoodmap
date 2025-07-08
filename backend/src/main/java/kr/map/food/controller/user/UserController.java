package kr.map.food.controller.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import kr.map.food.domain.user.UserDTO;
import kr.map.food.service.user.UserLoginService;
import kr.map.food.service.user.UserRegisterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {

    private final UserRegisterService userRegisterService;
    private final UserLoginService userLoginService;

    
    
     @PostMapping("/register")
        public ResponseEntity<String> registerUser(@RequestBody UserDTO dto) {
        userRegisterService.registerUser(dto);
        
        return ResponseEntity.ok("컨트롤러 회원가입 성공");
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginId(@RequestBody UserDTO dto, HttpServletResponse response) {
        UserDTO user = userLoginService.loginId(dto);
    if (user == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 틀렸습니다.");
    }

    Cookie cookie = new Cookie("userIdx", user.getUserIdx());
    cookie.setPath("/");
    response.addCookie(cookie); 

    return ResponseEntity.ok("로그인 성공");
}
    
}
