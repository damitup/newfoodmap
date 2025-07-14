package kr.map.food.controller.apiData.restaurant;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.map.food.service.apiData.restaurant.RestaurantApiDataService;

@RestController
@RequestMapping("/api")
public class RestaurantApiDataController {

    private final RestaurantApiDataService restaurantService;
    
    public RestaurantApiDataController(RestaurantApiDataService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @PostMapping("/restaurant/collect")
    public void collect() {
        restaurantService.collectAllGuData();
    }
    
}
