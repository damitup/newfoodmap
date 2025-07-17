package kr.map.food.service.user;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.map.food.domain.user.ReviewDTO;
import kr.map.food.mapper.user.ReviewRepository;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public void writeReview(ReviewDTO dto) {
        String newIdx = generateReviewIdx(dto);
        dto.setReviewIdx(newIdx);
        log.info("DTO 정보가 뭘까요 ",dto);
        reviewRepository.insertReview(dto);
    }

    public List<ReviewDTO> getReviewsByResidx(String resIdx){
        return reviewRepository.getReviewsByResidx(resIdx);
    }

    public List<ReviewDTO> getReviewsByUserIdx(String userIdx){
        return reviewRepository.getReviewsByUserIdx(userIdx);
    }

    private String generateReviewIdx(ReviewDTO dto) {
        String lastIdx = reviewRepository.getLastReviewIdx(dto); // ex: REV000023
        int num = 0;
        if (lastIdx != null && lastIdx.startsWith("REV")) {
            num = Integer.parseInt(lastIdx.substring(3)) + 1;
        }
        return String.format("REV%06d", num); // REV000024
    }
    
}
