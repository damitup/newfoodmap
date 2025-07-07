package kr.map.food.controller.test;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.map.food.service.test.TestService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequiredArgsConstructor
@RequestMapping("/api/clean-test")
public class TestController {

    private final TestService cleanGradeService;

    // resources에 저장된 엑셀 파일을 읽어 DB에 저장하는 수동 API

    @GetMapping("/upload")
    public ResponseEntity<String> localCleanGradeExcel() {
        try {
            cleanGradeService.uploadExcel();
            return ResponseEntity.ok("엑셀 파일 저장 완료");
        }
        catch (Exception e) {
             e.printStackTrace(); // 콘솔 디버깅
            return ResponseEntity.internalServerError() .body("업로드 실패: " + e.getMessage());
        }
    }
    
}
