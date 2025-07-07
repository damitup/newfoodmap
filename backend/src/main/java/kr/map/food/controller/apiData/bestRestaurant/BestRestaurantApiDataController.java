package kr.map.food.controller.apiData.bestRestaurant;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import kr.map.food.domain.apiData.bestRestaurant.BestRestaurantDTO;
import kr.map.food.mapper.apiData.BestRestaurantApiDataMapper;

@RestController
public class BestRestaurantApiDataController {

    private final BestRestaurantApiDataMapper bestMapper;

    public BestRestaurantApiDataController(BestRestaurantApiDataMapper bestMapper) {
        this.bestMapper = bestMapper;
    }

    @GetMapping("/api/bestRestaurant")
    public List<BestRestaurantDTO> getAll() {
        return bestMapper.selectAll();
    }

    @GetMapping("/api/bestRestaurant/{RESIDX}")
    public BestRestaurantDTO getById(@PathVariable String RESIDX) {
        return bestMapper.selectById(RESIDX);
    }

}
