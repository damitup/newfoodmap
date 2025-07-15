package kr.map.food.service.apiData.penalty;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyFilteredDTO;
import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyRawDTO;
import kr.map.food.service.apiData.dataTrans.RestaurantTypeTrans;

@Service
public class PenaltyFilterService {

    private static final Logger log = LoggerFactory.getLogger(PenaltyFilterService.class);
    
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

    // 제외할 위반 내용 필터링
    private static final List<String> outPenaltyKeyworld = Arrays.asList(
        "객실잠금장치", "국세", "기타", "도박", "단란주점", "단란형태", "멸실", "면적변경", "무단확장", "무도", "무도장", "무허가", "반주",
          "반주장치", "변경신고", "사업자등록", "사업자", "사행성", "성매매", "성매매 알선", "성매매알선", "손님", "시설물", "시설철거", "음향",
        "음향반주기기", "자동반주장치", "재난배상", "재난배상책임보험", "주류", "주류만취급", "주류전문", "주류제공",
        "잠금장치", "집단급식소식품판매업", "집합금지", "청소년", "청소년 주류제공",
        "청소년주류제공", "춤", "영업장외 영업행위(1차)", "영업장외 영업행위(2차)", "영업장외 영업행위(3차)",
         "유흥", "유흥접객", "유흥접객행위", "음향", "ㅇ 유흥접객행위", "ㅇ 청소년주류제공", "폐업", "폐쇄");


    // 포함할 위반 내용 필터링
    private static final List<String> includePenaltyKeyword = Arrays.asList(
        "건강진단", "경과", "경과된", "경과식품", "곰팡이", "구제", "기타이물", "냉동시설", "냉장", "도마",
        "미비치", "미설치", "미실시", "미준수", "방제", "변질", "보관", "부패", "불량", "사용", "설치류",
        "소비기한이", "시설기준", "식품", "식품내", "쓰레기통", "영업신고증", "원료", "위반", "위생교육",
        "위생모", "위생상태", "위생불량", "위생적", "위생적 취급기준 위반", "위생해충", "자가품질검사",
        "조리기구", "조리목적", "조리실", "조리장", "제품", "청결"
    );


    public List<PenaltyFilteredDTO> filterdData(List<PenaltyRawDTO> rawList) {
        List<PenaltyFilteredDTO> result = new ArrayList<>();

        for (PenaltyRawDTO raw : rawList) {

            try {
                // 업태명 IDX 조회 typeIdx 없으면 필터
                Integer typeIdx = restaurantTypeTrans.getTypeIdx(raw.getSNT_UPTAE_NM());

                if (typeIdx == null) {
                    log.debug("업태명 매핑 실패: {}", raw.getSNT_UPTAE_NM());
                    continue;
                }

                // 업종명 필터링
                if(isExcludedBizType(raw.getSNT_COB_NM())) {
                    log.debug("제외 업종명 필터됨: {}", raw.getSNT_COB_NM());
                    continue;
                } 

                // 위반 내용 필터링
                if (isExcludedPenaltyContent(raw.getVIOL_CN())) {
                    log.debug("위반 내용 필터됨: {}", raw.getVIOL_CN());
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
            catch (Exception e) {
                log.error("Penalty 필터링 중 오류 발생: {}", e.getMessage(), e);
            }
            
        }

        return result;
    }

    private boolean isExcludedBizType(String bizType) {
        return bizType != null && bizTypes.contains(bizType.trim());
    }

    private boolean isExcludedPenaltyContent(String violCn) {
        if (violCn == null) return false;

        for (String exclude : outPenaltyKeyworld) {
            if (violCn.contains(exclude)) {
                return true;
            }
        }

        for (String include : includePenaltyKeyword) {
            if (violCn.contains(include)) {
                return false;
            }
        }

        return false;
    }
}
