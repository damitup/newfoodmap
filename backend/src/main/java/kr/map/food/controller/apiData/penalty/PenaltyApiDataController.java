package kr.map.food.controller.apiData.penalty;

import org.springframework.web.bind.annotation.RestController;

import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyFilteredDTO;
import kr.map.food.service.apiData.penalty.PenaltyApiDataService;
import kr.map.food.service.apiData.penalty.ResMatchingService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
@RequestMapping("/api/penalty")
public class PenaltyApiDataController {

    private static final Logger log = LoggerFactory.getLogger(PenaltyApiDataController.class);

    private final PenaltyApiDataService penaltyApiDataService;
    private final ResMatchingService resMatchingService;

    public PenaltyApiDataController(PenaltyApiDataService penaltyApiDataService, ResMatchingService resMatchingService) {
        this.penaltyApiDataService = penaltyApiDataService;
        this.resMatchingService = resMatchingService;
    }
    
    @GetMapping("/collect")
    public String collectAndSavePenaltyData() {
        try {
            log.info("[API 요청] 행정처분 데이터 수집 및 저장 시작");
            List<PenaltyFilteredDTO> filtered = penaltyApiDataService.filterAll();

            resMatchingService.matchAndSave(filtered);

        return "행정처분 데이터 수집 및 저장 완료 (" + filtered.size() + "건 필터링됨)";
        } catch (Exception e) {
            log.error("행정처분 데이터 처리 중 오류 발생: {}", e.getMessage(), e);
        return "데이터 수집/저장 중 오류 발생: " + e.getMessage();
        }
    
    }
}
