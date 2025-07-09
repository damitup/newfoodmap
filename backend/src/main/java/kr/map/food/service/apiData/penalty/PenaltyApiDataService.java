package kr.map.food.service.apiData.penalty;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import kr.map.food.config.ApiKeyConfig;
import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyFilteredDTO;
import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyGuApiInfoENUM;
import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyRawDTO;

@Service
public class PenaltyApiDataService {

    private final PenaltyApiCollector penaltyCollector;
    private final PenaltyFilterService filterService;

    private static final String apiKey = ApiKeyConfig.SEOUL_OPENAPI_KEY;

    public PenaltyApiDataService(PenaltyApiCollector penaltyCollector, PenaltyFilterService filterService) {
        this.penaltyCollector = penaltyCollector;
        this.filterService = filterService;
    }

    public List<PenaltyFilteredDTO> filterAll() {
        List<PenaltyFilteredDTO> finalResult = new ArrayList<>();

        for (PenaltyGuApiInfoENUM gu : PenaltyGuApiInfoENUM.values()) {
            List<PenaltyRawDTO> rawList = penaltyCollector.collectPenaltyData(gu, apiKey);

            for (PenaltyRawDTO raw : rawList) {
                // 지번주소와 도로명 주소가 모두 없으면 제외
                if (FindNullData.isEmpty(raw.getSITE_ADDR()) && FindNullData.isEmpty(raw.getSITE_ADDR_RD())) {
                    continue;
                }

                // 1차 필터링
                List<PenaltyFilteredDTO> filteredList = filterService.filterPenaltyData(List.of(raw));
                if (filteredList.isEmpty()) continue; 

                PenaltyFilteredDTO dto = filteredList.get(0);

        }

        return '';
    }
}
