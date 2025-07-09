package kr.map.food.controller.mapInfo;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.map.food.domain.mapInfo.PenaltyRestaurantDTO;
import kr.map.food.service.mapInfo.PenaltyRestaurantService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/map/penalty")
@RequiredArgsConstructor
public class PenaltyRestaurantController {
    
    private final PenaltyRestaurantService penaltyRestaurantService;

    @GetMapping
    public List<PenaltyRestaurantDTO> getAllPenaltyRestaurants() {
        return penaltyRestaurantService.getAllPenaltyRestaurant();
    }

    @GetMapping("/{CLEANIDX}")
    public PenaltyRestaurantDTO getById(@PathVariable String RESIDX) {
        return penaltyRestaurantService.getPenaltyRestaurantById(RESIDX);
    }  
    
}
