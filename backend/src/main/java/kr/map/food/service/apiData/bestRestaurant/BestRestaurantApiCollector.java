package kr.map.food.service.apiData.bestRestaurant;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import kr.map.food.domain.apiData.bestRestaurant.BestRestaurantGuApiInfoENUM;
import kr.map.food.domain.apiData.bestRestaurant.BestRestaurantRawDTO;
import kr.map.food.domain.apiData.bestRestaurant.BestRestaurantApiResponse;

@Component 
public class BestRestaurantApiCollector {

    private final RestTemplate restTemplate = new RestTemplate();
    private final XmlMapper xmlMapper = new XmlMapper();

    public List<BestRestaurantRawDTO> collect(BestRestaurantGuApiInfoENUM guInfo, String apiKey) {
        List<BestRestaurantRawDTO> rawList = new ArrayList<>();
        int page = 1;

        try {
            String url = String.format(
                "%s/%s/xml/%s/1/1",
                guInfo.getBaseUrl(),
                apiKey,
                guInfo.getCode()
            );

            String xmlBody = restTemplate.getForObject(url, String.class);
            BestRestaurantApiResponse response = xmlMapper.readValue(xmlBody, BestRestaurantApiResponse.class);

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
                BestRestaurantApiResponse pageResponse = xmlMapper.readValue(pageXmlBody, BestRestaurantApiResponse.class);

                List<BestRestaurantRawDTO> rows = pageResponse.getRow();
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
