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

    public List<RestaurantDTO> getRestaurantByLocation(double blY, double urY, double blX, double urX) {
        return restaurantMapper.findByLocation(blY, urY, blX, urX);
    }
    public List<RestaurantDTO> searchRestaurants(String keyword) {
        return restaurantMapper.searchRestaurants("%" + keyword + "%"); // LIKE 검색
    }
}
