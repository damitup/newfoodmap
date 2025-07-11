package kr.map.food.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.map.food.domain.user.ReviewDTO;
import kr.map.food.service.user.ReviewService;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/write")
    public ResponseEntity<String> writeReview(@RequestBody ReviewDTO dto) {
        try {
            reviewService.writeReview(dto);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("fail");
        }
    }
      @GetMapping("/res/{resIdx}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByResidx(@PathVariable String resIdx) {
        ReviewDTO dto = new ReviewDTO();
        dto.setResIdx(resIdx);
        List<ReviewDTO> reviews = reviewService.getReviewsByResidx(resIdx);
        return ResponseEntity.ok(reviews);
    }

    // ✅ 2. 특정 사용자의 리뷰 조회 (ex. 마이페이지)
    @GetMapping("/user/{userIdx}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByUserIdx(@PathVariable String userIdx) {
        ReviewDTO dto = new ReviewDTO();
        dto.setUserIdx(userIdx);
        List<ReviewDTO> reviews = reviewService.getReviewsByUserIdx(userIdx);
        return ResponseEntity.ok(reviews);
    }
}
