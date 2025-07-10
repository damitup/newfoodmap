package kr.map.food.mapper.apiData;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RestaurantTypeMapper {

    int findTypeIdx(String TYPENAME);
    
}
