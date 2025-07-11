package kr.map.food.service.apiData.penalty;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyFilteredDTO;
import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyRawDTO;
import kr.map.food.service.apiData.dataTrans.RestaurantTypeTrans;

@Service
public class PenaltyFilterService {


    private final RestaurantTypeTrans restaurantTypeTrans;

    public PenaltyFilterService(RestaurantTypeTrans restaurantTypeTrans) {
        this.restaurantTypeTrans = restaurantTypeTrans;
    }

    // 제외 업종명 필터링
    private static final List<String> bizTypes = Arrays.asList(
        "건강기능식품수입업", "건강기능식품유통전문판매업", "식용얼음판매업", 
        "식품소분업", "식품운반업", "용기.포장지제조업", 
        "위탁급식영업", "유흥주점영업", "집단급식소", "집단급식소식품판매업"
    );

    // 위반 내용 필터링
    private static final List<String> penaltyContent = Arrays.asList(
        "폐업", "폐쇄", "유흥접객행위", "청소년주류제공", "청소년 주류제공", "청소년주류제공(1차)", 
        "영업장 외 영업", "영업장외 영업", "영업장 외 영업 - 1차", "ㅇ 청소년주류제공", "차량 변경 미신고", 
        "재난배상책임보험 미가입", "노래반주기설치", "노래방기기설치", "ㅇ 유흥접객행위", "집단급식소식품판매업",
        "휴업", "유흥", "접객", "청소년", "주류", "주류제공", "주류전문", "노래", "음향", "반주", "재난배상",
        "변경신고", "시설철거", "사업자등록"
    );



    public List<PenaltyFilteredDTO> filterdData(List<PenaltyRawDTO> rawList) {
        List<PenaltyFilteredDTO> result = new ArrayList<>();

        for (PenaltyRawDTO raw : rawList) {


            // 업태명 IDX 조회
            Integer typeIdx = restaurantTypeTrans.getTypeIdx(raw.getSNT_UPTAE_NM());

            // typeIdx 없으면 필터
            if (typeIdx == null) continue;

            // 업종명 필터링
            if(isExcludedBizType(raw.getSNT_COB_NM())) continue;

            // '폐쇄' or '폐업' 포함 시 제외
            if (raw.getVIOL_CN() != null && 
                (raw.getVIOL_CN().contains("폐쇄") || raw.getVIOL_CN().contains("폐업"))) {
                continue; 
            }


            PenaltyFilteredDTO dto = new PenaltyFilteredDTO(
                raw.getUPSO_NM(),
                raw.getSNT_COB_NM(),
                typeIdx,
                raw.getSITE_ADDR(),
                raw.getSITE_ADDR_RD(),
                raw.getVIOL_CN()
            );
            result.add(dto);
        }

        return result;
    }

    private boolean isExcludedBizType(String bizType) {
        return bizType != null && bizTypes.contains(bizType.trim());
    }
}
