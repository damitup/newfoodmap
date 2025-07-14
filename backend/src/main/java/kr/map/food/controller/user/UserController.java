package kr.map.food.controller.user;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.map.food.domain.user.FavoriteDTO;
import kr.map.food.domain.user.UserDTO;
import kr.map.food.service.user.FavoriteService;
import kr.map.food.service.user.UserLoginService;
import kr.map.food.service.user.UserRegisterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {

    @Autowired
    private final FavoriteService favoriteService;
    private final UserRegisterService userRegisterService;
    private final UserLoginService userLoginService;

  
    
    
     @PostMapping("/register")
        public ResponseEntity<String> registerUser(@RequestBody UserDTO dto) {
        userRegisterService.registerUser(dto);
        
        return ResponseEntity.ok("컨트롤러 회원가입 성공");
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginId(@RequestBody UserDTO dto, HttpServletResponse response) {

        log.info("login 체크");

        UserDTO user = userLoginService.loginId(dto);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 틀렸습니다.");
        }
        Cookie cookie = new Cookie("userIdx", user.getUserIdx());
        cookie.setPath("/");
        cookie.setHttpOnly(false); // 개발용: JS 접근 허용
        cookie.setSecure(false);   // 개발용: HTTPS 아님
        cookie.setMaxAge(60 * 60); // 1시간
        response.addCookie(cookie); 

        return ResponseEntity.ok("로그인 성공");
    }
    @GetMapping("/status")
    public ResponseEntity<Map<String, Boolean>> checkLogin(HttpServletRequest request) {
        boolean isLoggedIn = false;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("userIdx".equals(cookie.getName())) {
                    isLoggedIn = true;
                    break;
                }
            }
        }
        return ResponseEntity.ok(Collections.singletonMap("loggedIn", isLoggedIn));
    }
    @PostMapping("/logout")
        public ResponseEntity<?> logout(@RequestBody Map<String, String> body, HttpServletResponse response) {
        String path = body.get("path"); // React에서 보낸 현재 경로

        Cookie cookie = new Cookie("userIdx", null);
        cookie.setMaxAge(0);
        cookie.setPath(path != null ? path : "/");

        response.addCookie(cookie);
        return ResponseEntity.ok().build();
    }

    // 즐겨찾기 추가
   @PostMapping("/favorite")
    public ResponseEntity<?> addFavorite(@RequestBody FavoriteDTO dto) {
        favoriteService.addFavorite(dto);
        return ResponseEntity.ok().body("즐겨찾기 등록 완료");
    }

    // ✅ 즐겨찾기 삭제
    @DeleteMapping("/favorite")
    public ResponseEntity<?> removeFavorite(@RequestBody FavoriteDTO dto) {
        favoriteService.removeFavorite(dto);
        return ResponseEntity.ok().body("즐겨찾기 해제 완료");
    }

    // ✅ 즐겨찾기 여부 조회 (선택)
    @GetMapping("/favorite/show/{userIdx}")
    public ResponseEntity<List<FavoriteDTO>> getFavoritesByUser(@PathVariable String userIdx) {
        List<FavoriteDTO> favorites = favoriteService.getFavoritesByUser(userIdx);
        return ResponseEntity.ok(favorites);
    }

}
