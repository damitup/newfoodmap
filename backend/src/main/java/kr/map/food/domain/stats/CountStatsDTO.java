package kr.map.food.domain.stats;

import java.util.List;

import lombok.Data;

@Data
public class CountStatsDTO {

    private List<RestaurantCountDTO> restaurantCount;
    private List<CleanGradeCountDTO> cleanGradeCount;
    
}
