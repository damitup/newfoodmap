package kr.map.food.service.apiData.penalty;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.map.food.controller.apiData.penalty.PenaltyApiDataController;
import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyApiDTO;
import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyFilteredDTO;
import kr.map.food.domain.apiData.restaurant.RestaurantApiDTO;
import kr.map.food.mapper.apiData.PenaltyApiDataMapper;
import kr.map.food.mapper.apiData.RestaurantApiDataMapper;
import kr.map.food.service.apiData.dataTrans.FindNullData;
import kr.map.food.util.StoreNmSimilarityUtil;



@Service
public class ResMatchingService {

    private final RestaurantApiDataMapper resMapper;
    private final PenaltyApiDataMapper penaltyMapper;

    private static final Logger log = LoggerFactory.getLogger(PenaltyApiDataController.class);

    public ResMatchingService(RestaurantApiDataMapper resMapper, PenaltyApiDataMapper penaltyMapper) {
        this.resMapper = resMapper;
        this.penaltyMapper = penaltyMapper;
    }


    private String newPenaltyIdx() {
        String lastIdx = penaltyMapper.getLastIdx();

        int lastNum = 1;

        if(lastIdx != null && lastIdx.startsWith("PN")) {
            try {
                lastNum = Integer.parseInt(lastIdx.substring(2)) + 1;
            }
            catch (NumberFormatException e) {
                lastNum = 1;
            }
        }

        return String.format("PN%06d", lastNum);
    }



    public void matchAndSave(List<PenaltyFilteredDTO> penaltyList) {
        List<RestaurantApiDTO> allRestaurant = resMapper.selectAll();

        for(PenaltyFilteredDTO penalty : penaltyList) {
            RestaurantApiDTO match = findMatchStore(penalty, allRestaurant);


            if (match != null) {

                PenaltyApiDTO insert = new PenaltyApiDTO();

                insert.setPenaltyIdx(newPenaltyIdx());
                insert.setResIdx(match.getRESIDX());
                insert.setPenaltyContent(penalty.getPENALTYCONTENT());

                try {
                    penaltyMapper.insertPenalty(insert);
                    log.info("insert 성공: {}", insert.getPenaltyIdx());
                } catch (Exception e) {
                    log.warn("insert 실패: {}", insert.getPenaltyIdx(), e);
                }
            } else {
                log.warn("매칭 실패: {}, 업소명: {}", penalty.getPENALTYCONTENT(), penalty.getSTORENAME());
            }
        }
    }


    

    
    private RestaurantApiDTO findMatchStore(PenaltyFilteredDTO filteredDTO, List<RestaurantApiDTO> restaurantDTO) {

        String pRoad = filteredDTO.getROADADDR();
        String pStore = filteredDTO.getSTORENAME();

        RestaurantApiDTO bestMatch = null;
        double bestScore = 0.0;


        for (RestaurantApiDTO res : restaurantDTO) {
            String rRoad = res.getNEWADDR();
            String rStore = res.getRESNAME();


            // 1. 도로명 && 업소명 동일
            if (!FindNullData.isEmpty(pRoad) && pRoad.equals(rRoad) && pStore.equals(rStore)) {
                return res;
            }

            // 2. 도로명 일치, 업소명 유사도
            if (!FindNullData.isEmpty(pRoad) && pRoad.equals(rRoad) && !pStore.equals(rStore)) {

                double score = StoreNmSimilarityUtil.calculateSimilarity(pStore, rStore);

                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = res;
                }
            }

            // 3. 도로명이 없으면 버림
            if (FindNullData.isEmpty(pRoad) || FindNullData.isEmpty(pStore) || FindNullData.isEmpty(rRoad)) continue;


            // 4. 업소명 일치, 도로명 비교
            String pFix = pRoad.split(",")[0].trim();
            String rFix = rRoad.split(",")[0].trim();

            if (pFix.equals(rFix) && pStore.equals(rStore)) {
                return res;
            }

        }



        return (bestScore > 0.85) ? bestMatch : null;
    }

}
