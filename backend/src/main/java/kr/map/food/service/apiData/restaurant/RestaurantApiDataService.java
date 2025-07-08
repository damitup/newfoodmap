package kr.map.food.service.apiData.restaurant;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.map.food.config.ApiKeyConfig;
import kr.map.food.domain.apiData.restaurant.RestaurantGuApiInfoENUM;
import kr.map.food.domain.apiData.restaurant.RestaurantApiDTO;
import kr.map.food.domain.apiData.restaurant.RestaurantRawDTO;
import kr.map.food.mapper.apiData.RestaurantApiDataMapper;
import kr.map.food.service.apiData.dataTrans.AddressTrans;
import kr.map.food.service.apiData.dataTrans.DataTypeTrans;
import kr.map.food.service.apiData.dataTrans.FindNullData;
import kr.map.food.service.apiData.dataTrans.TelNumTrans;

@Service
public class RestaurantApiDataService {
    
    private final RestaurantApiCollector collector;
    private final RestaurantApiDataMapper restaurantMapper;

    // properties 공부
    private static final String apiKey = ApiKeyConfig.SEOUL_OPENAPI_KEY;
;

    public RestaurantApiDataService( RestaurantApiCollector collector, RestaurantApiDataMapper restaurantMapper ) {
        this.collector = collector;
        this.restaurantMapper = restaurantMapper;
    }

    public void collectAllGuData() {

        for ( RestaurantGuApiInfoENUM guURL : RestaurantGuApiInfoENUM.values() ) {
            List<RestaurantRawDTO> rawList = collector.collect( guURL, apiKey );
            for ( RestaurantRawDTO raw : rawList ) {

                // null값 찾기
                if ( FindNullData.isEmpty( raw.getSITEWHLADDR() ) && FindNullData.isEmpty( raw.getRDNWHLADDR() ) ) {
                    continue;
                }

                RestaurantApiDTO dto = buildRestaurant(raw);

                // 주소 가공
                if ( FindNullData.isEmpty( raw.getSITEWHLADDR() ) 
                    || FindNullData.isEmpty( raw.getRDNWHLADDR() )
                    || FindNullData.isEmpty( raw.getX() )
                    || FindNullData.isEmpty( raw.getY() )
                    ) {
                    AddressTrans.setAddress( raw, dto );
                }

                // 전화번호 가공
                TelNumTrans.setTelNum( dto.getRESNUM() );

                // restaurantMapper.insertRestaurant(dto);

            }
        }
    }

    private RestaurantApiDTO buildRestaurant(RestaurantRawDTO raw) {
        RestaurantApiDTO r = new RestaurantApiDTO();
        r.setRESIDX(raw.getMGTNO());
        r.setRESNAME(raw.getBPLCNM());
        r.setRESRUN(DataTypeTrans.parseIntSafe(raw.getDTLSTATEGBN()));
        r.setRESNUM(raw.getSITETEL());
        r.setTYPEIDX(1); // 업태구분은 임시
        r.setRESCLEANSCORE(raw.getLVSENM());
        r.setOLDADDR(raw.getSITEWHLADDR());
        r.setNEWADDR(raw.getRDNWHLADDR());
        r.setNUMADDR(AddressTrans.formatPostCode(raw.getRDNPOSTNO()));
        r.setXPOS(DataTypeTrans.parseDoubleSafe(raw.getX()));
        r.setYPOS(DataTypeTrans.parseDoubleSafe(raw.getY()));
        return r;
    }

}
