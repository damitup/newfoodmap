package kr.map.food.controller.mapInfo;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.map.food.domain.mapInfo.RestaurantDTO;
import kr.map.food.service.mapInfo.RestaurantService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/map/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping
    public List<RestaurantDTO> getAll() {
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/{RESIDX}")
    public RestaurantDTO getById(@PathVariable String RESIDX) {
        return restaurantService.getRestaurantById(RESIDX);
    }
    
}
