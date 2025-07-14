package kr.map.food.mapper.apiData;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RestaurantIDXMapper {

    Integer countByResIdx(String RESIDX);

}
