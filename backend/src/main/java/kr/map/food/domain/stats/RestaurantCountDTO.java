package kr.map.food.domain.stats;

import lombok.Data;

@Data
public class RestaurantCountDTO {

    private String ADDRDONG;
    private int totalRestaurantCount;
    private int bestRestaurantCount;
    private int penaltyRestaurantCount;
    private int penaltyCount;
    private double avgPenaltyPerRestaurant;
    
}
