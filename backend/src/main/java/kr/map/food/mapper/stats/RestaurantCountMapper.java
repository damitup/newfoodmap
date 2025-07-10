package kr.map.food.mapper.stats;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.stats.RestaurantCountDTO;

@Mapper
public interface RestaurantCountMapper {

    List<RestaurantCountDTO> findAllRestaurantsCount(String ADDRGU);
    
}
