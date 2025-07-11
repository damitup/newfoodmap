package kr.map.food.controller.stats;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.map.food.domain.stats.CleanGradeCountDTO;
import kr.map.food.domain.stats.CountStatsDTO;
import kr.map.food.domain.stats.RestaurantCountDTO;
import kr.map.food.service.stats.CleanGradeCountService;
import kr.map.food.service.stats.RestaurantCountService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class CountStatsController {

    private final RestaurantCountService restaurantCountService;
    private final CleanGradeCountService cleanGradeCountService;

    @GetMapping("/{ADDRGU}")
    public CountStatsDTO getById(@PathVariable String ADDRGU) {
        
        List<RestaurantCountDTO> restaurantCount = restaurantCountService.getAllRestaurantsCount(ADDRGU);
        List<CleanGradeCountDTO> cleanGradeCount = cleanGradeCountService.getCleanGradeCount(ADDRGU);

        CountStatsDTO dto = new CountStatsDTO();
        dto.setRestaurantCount(restaurantCount);
        dto.setCleanGradeCount(cleanGradeCount);

        return dto;

    }
    
}
