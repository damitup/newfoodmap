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
        return restaurantCountMapper.findAllRestaurantsCount(ADDRGU);
    }
    
}
