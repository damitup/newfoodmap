package kr.map.food.controller.apiData.restaurant;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import kr.map.food.domain.apiData.restaurant.RestaurantApiDTO;
import kr.map.food.mapper.apiData.RestaurantApiDataMapper;

@RestController
public class RestaurantApiDataController {

    private final RestaurantApiDataMapper restaurantMapper;
    
    public RestaurantApiDataController(RestaurantApiDataMapper restaurantMapper) {
        this.restaurantMapper = restaurantMapper;
    }

    @GetMapping("/api/restaurant")
    public List<RestaurantApiDTO> getAll() {
        return restaurantMapper.selectAll(); 
    }

    @GetMapping("/api/restaurant/{RESIDX}")
    public RestaurantApiDTO getById(@PathVariable String RESIDX) {
        return restaurantMapper.selectById(RESIDX);
    }
    
}
