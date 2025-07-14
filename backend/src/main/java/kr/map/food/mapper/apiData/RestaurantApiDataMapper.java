package kr.map.food.mapper.apiData;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.apiData.restaurant.RestaurantApiDTO;

@Mapper
public interface RestaurantApiDataMapper {

    void insertRestaurant(RestaurantApiDTO dto);

    List<RestaurantApiDTO> selectAll();

    RestaurantApiDTO selectById(String RESIDX);
    
}
