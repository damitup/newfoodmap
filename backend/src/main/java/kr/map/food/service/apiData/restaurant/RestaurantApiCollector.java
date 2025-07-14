package kr.map.food.service.apiData.restaurant;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import kr.map.food.domain.apiData.restaurant.RestaurantGuApiInfoENUM;
import kr.map.food.domain.apiData.restaurant.RestaurantRawDTO;
import kr.map.food.domain.apiData.restaurant.RestaurantApiResponse;

@Component 
public class RestaurantApiCollector {

    private final RestTemplate restTemplate = new RestTemplate();
    private final XmlMapper xmlMapper = new XmlMapper();

    public List<RestaurantRawDTO> collect(RestaurantGuApiInfoENUM guInfo, String apiKey) {
        List<RestaurantRawDTO> rawList = new ArrayList<>();
        int page = 1;

        try {
            String url = String.format(
                "%s/%s/xml/%s/1/1",
                guInfo.getBaseUrl(),
                apiKey,
                guInfo.getCode()
            );

            String xmlBody = restTemplate.getForObject(url, String.class);
            RestaurantApiResponse response = xmlMapper.readValue(xmlBody, RestaurantApiResponse.class);

            int listTotalCount = response.getListTotalCount();
            int totalPage = 1; // 테스트용 임시 주석 처리 (listTotalCount + 1000 - 1) / 1000;

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
                RestaurantApiResponse pageResponse = xmlMapper.readValue(pageXmlBody, RestaurantApiResponse.class);

                List<RestaurantRawDTO> rows = pageResponse.getRow();
                if (rows == null || rows.isEmpty()) {
                    break;
                }

                rawList.addAll(rows);
                page++;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return rawList;
    }
}
