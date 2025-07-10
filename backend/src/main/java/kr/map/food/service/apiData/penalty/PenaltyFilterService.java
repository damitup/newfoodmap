package kr.map.food.service.apiData.penalty;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyFilteredDTO;
import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyRawDTO;

@Service
public class PenaltyFilterService {

    private static final List<String> categoryNames = Arrays.asList(
        "백화점", "감성주점", "경양식", "과자점", "관광호텔", "극장식당", "기타", "기타 식품제조가공업",
        "기타 휴게음식점", "김밥(도시락)", "까페", "다방", "라이브카페", "분식", "뷔페식",
        "식육(숯불구이)", "식품등 수입판매업", "식품자동판매기영업", "아이스크림",
        "외국음식전문점(인도,태국등)", "일반조리판매", "일식", "전통찻집", "정종/대포집/소주방",
        "제과점영업", "중국식", "즉석판매제조가공업", "철도역구내", "커피숍", "키즈카페",
        "탕류(보신용)", "통닭(치킨)", "패밀리레스토랑", "패스트푸드", "편의점",
        "한식", "호프/통닭", "회집", "냉면집", "떡카페", "복어취급"
    );

    private static final List<String> bizTypes = Arrays.asList(
        "건강기능식품수입업", "건강기능식품유통전문판매업", "식용얼음판매업", 
        "식품소분업", "식품운반업", "용기.포장지제조업", 
        "위탁급식영업", "유흥주점영업", "집단급식소", "집단급식소식품판매업"
    );




    public List<PenaltyFilteredDTO> filterdData(List<PenaltyRawDTO> rawList) {
        List<PenaltyFilteredDTO> result = new ArrayList<>();

        for (PenaltyRawDTO raw : rawList) {
            if(!isValidCategory(raw.getSNT_UPTAE_NM())) continue;
            if(isExcludedBizType(raw.getSNT_COB_NM())) continue;

            if (raw.getVIOL_CN() != null && (raw.getVIOL_CN().contains("폐쇄") || raw.getVIOL_CN().contains("폐업"))) {
            continue; 
            }


            PenaltyFilteredDTO dto = new PenaltyFilteredDTO(
                raw.getUPSO_NM(),
                raw.getSNT_COB_NM(),
                raw.getSNT_UPTAE_NM(),
                raw.getSITE_ADDR(),
                raw.getSITE_ADDR_RD(),
                raw.getVIOL_CN(),
                null,
                null

            );

            result.add(dto);
        }

        return result;
    }

    private boolean isValidCategory(String categoryName) {
        return categoryName != null && categoryNames.contains(categoryName.trim());
    }

    private boolean isExcludedBizType(String bizType) {
        return bizType != null && bizTypes.contains(bizType.trim());
    }
}
