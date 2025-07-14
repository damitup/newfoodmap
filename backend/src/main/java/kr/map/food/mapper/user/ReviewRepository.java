package kr.map.food.mapper.user;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.user.ReviewDTO;

@Mapper
public interface ReviewRepository {    
    void insertReview(ReviewDTO dto);

    List<ReviewDTO> getReviewsByResidx(String resIdx);

    List<ReviewDTO> getReviewsByUserIdx(String userIdx);

    String getLastReviewIdx(ReviewDTO dto);

    String findUserNameByIdx(String userIdx);
}
