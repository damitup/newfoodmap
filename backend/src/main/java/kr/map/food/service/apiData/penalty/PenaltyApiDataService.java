package kr.map.food.service.apiData.penalty;

import org.springframework.stereotype.Service;

@Service
public class PenaltyApiDataService {

    private final PenaltyApiCollector penaltyCollector;
    private final PenaltyApiDataMapper penaltyMapper;

    private static final String apiKey = ApiKeyConfig.SEOUL_OPENAPI_KEY;

    public PenaltyApiDataService (PenaltyApiCollector penaltyCollector, PenaltyApiDataMapper penaltyMapper) {
        this.penaltyCollector = penaltyCollector;
        this.penaltyMapper = penaltyMapper;
    }

    
}
