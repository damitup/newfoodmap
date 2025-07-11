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
        "객실잠금장치", "국세", "기타", "도박", "단란주점", "단란형태", "멸실", "면적변경", "무단확장", "무도", "무도장", "무허가", "반주",
          "반주장치", "변경신고", "사업자등록", "사업자", "사행성", "성매매", "성매매 알선", "성매매알선", "손님", "시설물", "시설철거", "음향",
        "음향반주기기", "자동반주장치", "재난배상", "재난배상책임보험", "주류", "주류만취급", "주류전문", "주류제공",
        "잠금장치", "집단급식소식품판매업", "집합금지", "청소년", "청소년 주류제공",
        "청소년주류제공", "춤", "영업장외 영업행위(1차)", "영업장외 영업행위(2차)", "영업장외 영업행위(3차)",
         "유흥", "유흥접객", "유흥접객행위", "음향", "ㅇ 유흥접객행위", "ㅇ 청소년주류제공", "폐업", "폐쇄");



    public List<PenaltyFilteredDTO> filterdData(List<PenaltyRawDTO> rawList) {
        List<PenaltyFilteredDTO> result = new ArrayList<>();

        for (PenaltyRawDTO raw : rawList) {


            // 업태명 IDX 조회
            Integer typeIdx = restaurantTypeTrans.getTypeIdx(raw.getSNT_UPTAE_NM());

            // typeIdx 없으면 필터
            if (typeIdx == null) continue;

            // 업종명 필터링
            if(isExcludedBizType(raw.getSNT_COB_NM())) continue;

            // 위반 내용 필터링
            if (isExcludedPenaltyContent(raw.getVIOL_CN())) continue;

            

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

    private boolean isExcludedPenaltyContent(String violCn) {
    if (violCn == null) return false;

    for (String keyword : penaltyContent) {
        if (violCn.contains(keyword)) {
            return true;
        }
    }
    return false;
    }
}
