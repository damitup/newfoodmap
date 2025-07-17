package kr.map.food.service.apiData.penalty;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import kr.map.food.config.ApiKeyConfig;
import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyFilteredDTO;
import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyGuApiInfoENUM;

import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyRawDTO;

import kr.map.food.service.apiData.dataTrans.FindNullData;
import kr.map.food.service.apiData.dataTrans.KakaoApiClient;

@Service
public class PenaltyApiDataService {

    private static final Logger log = LoggerFactory.getLogger(PenaltyFilterService.class);

    
    private final PenaltyApiCollector penaltyCollector;
    private final PenaltyFilterService filterService;

    private static final String apiKey = ApiKeyConfig.SEOUL_OPENAPI_KEY;

    public PenaltyApiDataService(PenaltyApiCollector penaltyCollector, PenaltyFilterService filterService) {
        this.penaltyCollector = penaltyCollector;
        this.filterService = filterService;
    }

    public List<PenaltyFilteredDTO> filterAll() {
        log.info("Penalty 행정처분 필터링 전체 시작");

        List<PenaltyFilteredDTO> finalResult = new ArrayList<>();

        for (PenaltyGuApiInfoENUM gu : PenaltyGuApiInfoENUM.values()) {
            log.info("{} 처리 시작", gu.name());
            List<PenaltyRawDTO> rawList = penaltyCollector.collectPenaltyData(gu, apiKey);

            for (PenaltyRawDTO raw : rawList) {
                // 지번주소와 도로명 주소가 모두 없으면 제외
                if (FindNullData.isEmpty(raw.getSITE_ADDR()) && FindNullData.isEmpty(raw.getSITE_ADDR_RD())) {
                    continue;
                }

                // 1차 필터링
                List<PenaltyFilteredDTO> filteredList = filterService.filterdData(List.of(raw));
                log.info("필터링 결과: {}건", filteredList.size());

                if (filteredList.isEmpty()) continue; 

                PenaltyFilteredDTO dto = filteredList.get(0);
                log.info("필터링된 DTO 준비 완료: {}", dto.getSTORENAME());

                // 주소 보완 (도로명 없을 경우)
                if (FindNullData.isEmpty(dto.getROADADDR())) {
                    String queryAddress = dto.getSITEADDR(); // 지번주소 사용

                    if (!FindNullData.isEmpty(queryAddress)) {
                        log.info("도로명 주소 보완 시도: {}", queryAddress);
                        String roadAddr = KakaoApiClient.fetchRoadAddressOnly(queryAddress);
                        log.info("도로명 주소 응답: {}", roadAddr);
                        if (roadAddr != null) {
                            dto.setROADADDR(roadAddr);
                        }
                    }
                }
                finalResult.add(dto);
            }
        }
        log.info("Penalty 필터링 전체 완료: 최종 필터링된 데이터 {}건", finalResult.size());
        return finalResult;
    }
}
