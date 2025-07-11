package kr.map.food.domain.user;

import lombok.Data;

@Data
public class ReviewDTO {
    private String reviewIdx;
    private String reviewContent;
    private String reviewDate;
    private String userIdx;
    private String resIdx;
}
