package kr.map.food.controller.mapInfo;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.map.food.domain.mapInfo.RestaurantDTO;
import kr.map.food.service.mapInfo.BestRestaurantService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/map/bests")
@RequiredArgsConstructor
public class BestRestaurantController {

    private final BestRestaurantService bestRestaurantService;

        @GetMapping
    public List<RestaurantDTO> getAll() {
        return bestRestaurantService.getAllBestRestaurants();
    }

    @GetMapping("/{RESIDX}")
    public RestaurantDTO getById(@PathVariable String RESIDX) {
        return bestRestaurantService.getBestRestaurantById(RESIDX);
    }
    
}
