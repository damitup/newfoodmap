package kr.map.food.controller.stats;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.map.food.domain.stats.RestaurantCountDTO;
import kr.map.food.service.stats.RestaurantCountService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/stats/restaurants")
@RequiredArgsConstructor
public class RestaurantCountController {

    private final RestaurantCountService restaurantCountService;

    @GetMapping("/{ADDRGU}")
    public List<RestaurantCountDTO> getById(@PathVariable String ADDRGU) {
        return restaurantCountService.getAllRestaurantsCount(ADDRGU);
    }
    
}
