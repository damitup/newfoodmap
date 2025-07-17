package kr.map.food.service.apiData.penalty;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyApiResponse;
import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyGuApiInfoENUM;
import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyRawDTO;
;

@Component
public class PenaltyApiCollector {

    private final RestTemplate restTemplate = new RestTemplate();
    private final XmlMapper xmlMapper = new XmlMapper();
    private static final Logger logger = LoggerFactory.getLogger(PenaltyApiCollector.class);
    private static final Logger log = LoggerFactory.getLogger(PenaltyFilterService.class);


    
    public List<PenaltyRawDTO> collectPenaltyData(PenaltyGuApiInfoENUM guInfo, String apiKey) {
        log.info("[OpenAPI 요청 시작] {}", guInfo.name());
        List<PenaltyRawDTO> penaltyrawList = new ArrayList<>();
        int page = 1;

        try {
            String url = String.format(
                "%s/%s/xml/%s/1/1",
                guInfo.getBaseUrl(),
                apiKey,
                guInfo.getCode()
            );

            String xmlBody = restTemplate.getForObject(url, String.class);
            PenaltyApiResponse response = xmlMapper.readValue(xmlBody, PenaltyApiResponse.class);

            int listTotalCount = response.getListTotalCount();
            int totalPage = (listTotalCount + 1000 - 1) / 1000;

            while (page <= totalPage) {
                int fromNum = (page - 1) * 1000 + 1;
                int toNum = page * 1000;

                String pageUrl = String.format(
                    "%s/%s/xml/%s/%d/%d",
                    guInfo.getBaseUrl(),
                    apiKey,
                    guInfo.getCode(),
                    fromNum,
                    toNum
                );

                String pageXmlBody = restTemplate.getForObject(pageUrl, String.class);
                PenaltyApiResponse pageResponse = xmlMapper.readValue(pageXmlBody, PenaltyApiResponse.class);

                List<PenaltyRawDTO> rows = pageResponse.getRow();
                if (rows == null || rows.isEmpty()) {
                    break;
                }

                penaltyrawList.addAll(rows);
                page++;
            }

        } catch (Exception e) {
            logger.error("행정처분 데이터 수집 중 오류 발생 - 구: {}", guInfo.name(), e);
        }

        return penaltyrawList;

    }
}
