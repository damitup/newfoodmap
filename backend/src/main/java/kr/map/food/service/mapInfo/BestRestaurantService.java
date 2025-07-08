package kr.map.food.service.mapInfo;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.map.food.domain.mapInfo.RestaurantDTO;
import kr.map.food.mapper.mapInfo.BestRestaurantMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BestRestaurantService {

    private final BestRestaurantMapper bestRestaurantMapper;

    public List<RestaurantDTO> getAllBestRestaurants() {
        return bestRestaurantMapper.findAllBest();
    }

    public RestaurantDTO getBestRestaurantById(String RESIDX) {
        return bestRestaurantMapper.findByIdBest(RESIDX);
    }
    
}
