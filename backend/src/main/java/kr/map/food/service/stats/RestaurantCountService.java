package kr.map.food.service.stats;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.map.food.domain.stats.RestaurantCountDTO;
import kr.map.food.mapper.stats.RestaurantCountMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RestaurantCountService {

    public final RestaurantCountMapper restaurantCountMapper;

    public List<RestaurantCountDTO> getAllRestaurantsCount(String ADDRGU) {
        List<RestaurantCountDTO> list = restaurantCountMapper.findAllRestaurantsCount(ADDRGU);
        calculateAvgPerRestaurant(list);
        return list;
    }

    private void calculateAvgPerRestaurant(List<RestaurantCountDTO> list) {
        for (RestaurantCountDTO dto : list) {
            if (dto.getPenaltyRestaurantCount() > 0) {
                dto.setAvgPenaltyPerRestaurant(
                    (double) dto.getPenaltyCount() / dto.getPenaltyRestaurantCount()
                );
            } 
            else {
                dto.setAvgPenaltyPerRestaurant(0.0);
            }
        }
    }
    
}
