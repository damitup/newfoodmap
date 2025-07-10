package kr.map.food.service.apiData.dataTrans;

import org.springframework.stereotype.Service;

import kr.map.food.mapper.apiData.RestaurantTypeMapper;

@Service
public class RestaurantTypeTrans {

    private final RestaurantTypeMapper restaurantTypeMapper;

    public RestaurantTypeTrans( RestaurantTypeMapper restaurantTypeMapper ) {
        this.restaurantTypeMapper = restaurantTypeMapper;
    }

    public Integer getTypeIdx(String TYPENAME) {
        return restaurantTypeMapper.findTypeIdx(TYPENAME);
    }
    
}
