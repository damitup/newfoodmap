package kr.map.food.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.map.food.domain.user.ReviewDTO;
import kr.map.food.service.user.ReviewService;
import lombok.Data;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
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
    @GetMapping("/store/{resIdx}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByResidx(@PathVariable String resIdx) {
        List<ReviewDTO> reviews = reviewService.getReviewsByResidx(resIdx);
        return ResponseEntity.ok(reviews);
    }
    // 마이페이지 리뷰내역보기
    @GetMapping("/my/{userIdx}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByUserIdx(@PathVariable String userIdx) {
        ReviewDTO dto = new ReviewDTO();
        dto.setUserIdx(userIdx);
        List<ReviewDTO> reviews = reviewService.getReviewsByUserIdx(userIdx);
        return ResponseEntity.ok(reviews);
    }
     @PutMapping("/{reviewIdx}")
    public ResponseEntity<?> updateReview(
                                            @PathVariable String reviewIdx,
                                            @RequestBody ReviewUpdateRequest request
                                            ){
        reviewService.updateReview(reviewIdx, request.getReviewContent());
        return ResponseEntity.ok().build();
    }

    // 리뷰 삭제
    @DeleteMapping("/{reviewIdx}")
    public ResponseEntity<?> deleteReview(@PathVariable String reviewIdx) {
        reviewService.deleteReview(reviewIdx);
        return ResponseEntity.ok().build();
    }

    @Data
    public static class ReviewUpdateRequest {
        private String reviewContent;
    }
    
}
