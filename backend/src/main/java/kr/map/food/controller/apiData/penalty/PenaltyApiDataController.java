package kr.map.food.controller.apiData.penalty;

import org.springframework.web.bind.annotation.RestController;

import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyApiDTO;
import kr.map.food.mapper.apiData.PenaltyApiDataMapper;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class PenaltyApiDataController {

    private final PenaltyApiDataMapper penaltyMapper;

    public PenaltyApiDataController(PenaltyApiDataMapper penaltyMapper) {
        this.penaltyMapper = penaltyMapper;
    }

    @GetMapping("/api/penalty")
    public List<PenaltyApiDTO> getAll() {
        return penaltyMapper.selectAll();
    }
    
}
