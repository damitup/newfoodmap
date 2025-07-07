package kr.map.food.service.apiData.bestRestaurant;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.map.food.config.ApiKeyConfig;
import kr.map.food.domain.apiData.bestRestaurant.BestRestaurantApiDTO;
import kr.map.food.domain.apiData.bestRestaurant.BestRestaurantRawDTO;
import kr.map.food.domain.apiData.bestRestaurant.BestRestaurantGuApiInfoENUM;
import kr.map.food.mapper.apiData.BestRestaurantApiDataMapper;
import kr.map.food.service.apiData.dataTrans.DataTypeTrans;
import kr.map.food.service.apiData.dataTrans.FindNullData;


@Service
public class BestRestaurantApiDataService {

    private final BestRestaurantApiCollector collector;
    private final BestRestaurantApiDataMapper bestRestaurantMapper;

    private static final String apiKey = ApiKeyConfig.SEOUL_OPENAPI_KEY;
;

    public BestRestaurantApiDataService( BestRestaurantApiCollector collector, BestRestaurantApiDataMapper bestRestaurantMapper ) {
        this.collector = collector;
        this.bestRestaurantMapper = bestRestaurantMapper;
    }

    public void collectAllGuData() {

        for ( BestRestaurantGuApiInfoENUM guURL : BestRestaurantGuApiInfoENUM.values() ) {
            List<BestRestaurantRawDTO> rawList = collector.collect( guURL, apiKey );

            for ( BestRestaurantRawDTO raw : rawList ) {
                if ( FindNullData.isEmpty( raw.getPERM_NT_NO() ) ) {
                    continue;
                }

                BestRestaurantApiDTO dto = buildRestaurant( raw );

                //bestRestaurantMapper.insertBestRestaurant(dto);
            }

        }

    }

    private BestRestaurantApiDTO buildRestaurant( BestRestaurantRawDTO raw ) {
        BestRestaurantApiDTO r = new BestRestaurantApiDTO();
        r.setRESIDX(raw.getPERM_NT_NO());
        r.setRESMAINDISH(raw.getMAIN_EDF());
        r.setBESTREGYEAR(DataTypeTrans.parseIntSafe(raw.getASGN_YY()));
        return r;
    }
    
}
