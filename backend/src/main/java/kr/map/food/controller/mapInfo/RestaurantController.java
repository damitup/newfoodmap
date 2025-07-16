package kr.map.food.controller.mapInfo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public List<RestaurantDTO> getAll(@RequestParam(defaultValue = "0") int num) {
        return restaurantService.getAllRestaurants(num);
    }

    @GetMapping("/{RESIDX}")
    public RestaurantDTO getById(@PathVariable String RESIDX) {
        return restaurantService.getRestaurantById(RESIDX);
    }

    @GetMapping("/here")
    public List<RestaurantDTO> getByLocation(
        @RequestParam double blY,
        @RequestParam double urY,
        @RequestParam double blX,
        @RequestParam double urX ) {
        return restaurantService.getRestaurantByLocation(blY, urY, blX, urX);
    }
    @GetMapping("/search/{keyword}")
    public ResponseEntity<?> searchRestaurants(@PathVariable String keyword) {
        // keyword는 자동으로 디코딩됨 (Spring Boot 기본 설정일 경우)
        return ResponseEntity.ok(restaurantService.searchByKeyword(keyword));
    }
    
}
