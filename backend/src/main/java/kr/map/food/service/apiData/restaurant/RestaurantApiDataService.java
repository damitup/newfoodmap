package kr.map.food.service.apiData.restaurant;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.map.food.config.ApiKeyConfig;
import kr.map.food.domain.apiData.restaurant.RestaurantGuApiInfoENUM;
import kr.map.food.domain.apiData.restaurant.RestaurantApiDTO;
import kr.map.food.domain.apiData.restaurant.RestaurantRawDTO;
import kr.map.food.mapper.apiData.RestaurantApiDataMapper;
import kr.map.food.service.apiData.dataTrans.AddressTrans;
import kr.map.food.service.apiData.dataTrans.CoordinateTrans;
import kr.map.food.service.apiData.dataTrans.DataTypeTrans;
import kr.map.food.service.apiData.dataTrans.FindNullData;
import kr.map.food.service.apiData.dataTrans.RestaurantTypeTrans;
import kr.map.food.service.apiData.dataTrans.TelNumTrans;

@Service
public class RestaurantApiDataService {

    private final RestaurantApiCollector collector;
    private final RestaurantApiDataMapper restaurantMapper;
    private final RestaurantTypeTrans restaurantTypeTrans;

    private static final String apiKey = ApiKeyConfig.SEOUL_OPENAPI_KEY;

    public RestaurantApiDataService( RestaurantApiCollector collector, RestaurantApiDataMapper restaurantMapper, RestaurantTypeTrans restaurantTypeTrans ) {
        this.collector = collector;
        this.restaurantMapper = restaurantMapper;
        this.restaurantTypeTrans = restaurantTypeTrans;
    }

    @Transactional
    public void collectAllGuData() {

        for ( RestaurantGuApiInfoENUM guURL : RestaurantGuApiInfoENUM.values() ) {
            List<RestaurantRawDTO> rawList = collector.collect( guURL, apiKey );
            for ( RestaurantRawDTO raw : rawList ) {

                System.out.println(">>> MGTNO: " + raw.getMGTNO());
                System.out.println(">>> SITEWHLADDR: [" + raw.getSITEWHLADDR() + "]");
                System.out.println(">>> RDNWHLADDR: [" + raw.getRDNWHLADDR() + "]");

                // null값 찾기
                if ( FindNullData.isEmpty( raw.getSITEWHLADDR() ) && FindNullData.isEmpty( raw.getRDNWHLADDR() ) ) {
                    System.out.println(">>> SKIP: 주소 둘 다 없음 -> " + raw.getMGTNO());
                    continue;
                }

                // 폐업 가게 찾기
                if ( !"01".equals(raw.getDTLSTATEGBN()) ) {
                    System.out.println(">>> SKIP: 폐업 가게 -> " + raw.getMGTNO() + " 상태=" + raw.getDTLSTATEGBN());
                    continue;
                }
                
                // 업태구분idx
                Integer TYPEIDX = restaurantTypeTrans.getTypeIdx( raw.getUPTAENM() );
                if ( TYPEIDX == null ) {
                    System.out.println(">>> SKIP: 업태 구분 못 찾음 -> " + raw.getMGTNO() + " 업태=" + raw.getUPTAENM());
                    continue;
                }
                
                RestaurantApiDTO dto = buildRestaurant(raw, TYPEIDX);

                // 주소 가공
                AddressTrans.setAddress( raw, dto );

                CoordinateTrans.setCoordinate(raw, dto);

                // 좌표 체크 후 없으면 저장하지 않음
                if (dto.getXPOS() == null || dto.getYPOS() == null) {
                    System.out.println(">>> SKIP: 좌표 정보 없음, 저장하지 않음 -> " + dto.getRESIDX());
                    continue;
                }

                System.out.println(">>> 실제 INSERT 시도: " + dto);

                // 전화번호 가공
                TelNumTrans.setTelNum( dto );

                restaurantMapper.insertRestaurant(dto);

            }
        }
    }

    private RestaurantApiDTO buildRestaurant(RestaurantRawDTO raw, Integer TYPEIDX) {
        RestaurantApiDTO r = new RestaurantApiDTO();
        r.setRESIDX(raw.getMGTNO());
        r.setRESNAME(raw.getBPLCNM());
        r.setRESRUN(1);
        r.setRESNUM(raw.getSITETEL());
        r.setTYPEIDX(TYPEIDX);
        r.setRESCLEANSCORE(raw.getLVSENM());
        r.setADDRGU(AddressTrans.parseGu(raw.getSITEWHLADDR()));
        r.setADDRDONG(AddressTrans.parseDong(raw.getSITEWHLADDR()));
        r.setOLDADDR(raw.getSITEWHLADDR());
        r.setNEWADDR(raw.getRDNWHLADDR());
        r.setNUMADDR(AddressTrans.formatPostCode(raw.getRDNPOSTNO()));
        return r;
    }

}
