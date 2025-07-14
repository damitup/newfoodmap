package kr.map.food.controller.apiData.bestRestaurant;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import kr.map.food.service.apiData.bestRestaurant.BestRestaurantApiDataService;

@RestController
@RequestMapping("/api")
public class BestRestaurantApiDataController {

    private final BestRestaurantApiDataService bestRestaurantService;

    public BestRestaurantApiDataController(BestRestaurantApiDataService bestRestaurantService) {
        this.bestRestaurantService = bestRestaurantService;
    }

    @PostMapping("/bests/collect")
    public void collect() {
        bestRestaurantService.collectAllGuData();
    }

}
