package kr.map.food.service.user;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.map.food.domain.user.ReviewDTO;
import kr.map.food.mapper.user.ReviewRepository;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public void writeReview(ReviewDTO dto) {
        reviewRepository.insertReview(dto);
    }
    public List<ReviewDTO> getReviewsByResidx(String resIdx){
        return reviewRepository.getReviewsByResidx(resIdx);
    }
       public List<ReviewDTO> getReviewsByUserIdx(String userIdx){
        return reviewRepository.getReviewsByUserIdx(userIdx);
    }
}
