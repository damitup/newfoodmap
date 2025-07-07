package kr.map.food.service.mapInfo;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.map.food.domain.mapInfo.RestaurantDTO;
import kr.map.food.mapper.mapInfo.RestaurantMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RestaurantService {
    
    private final RestaurantMapper restaurantMapper;

    public List<RestaurantDTO> getAllRestaurants() {
        return restaurantMapper.findAll();
    }

    public RestaurantDTO getRestaurantById(String RESIDX) {
        return restaurantMapper.findById(RESIDX);
    }
    
}
