package kr.map.food.service.mapInfo;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.map.food.domain.mapInfo.PenaltyRestaurantDTO;
import kr.map.food.mapper.mapInfo.PenaltyRestaurantMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PenaltyRestaurantService {

    private final PenaltyRestaurantMapper penaltyRestaurantMapper;

    public List<PenaltyRestaurantDTO> getAllPenaltyRestaurant() {
        return penaltyRestaurantMapper.findAllPenaltyRestaurant();
    }

    public PenaltyRestaurantDTO getPenaltyRestaurantById(String RESIDX) {
        return penaltyRestaurantMapper.findPenaltyRestaurantById(RESIDX);
    }
    
}
