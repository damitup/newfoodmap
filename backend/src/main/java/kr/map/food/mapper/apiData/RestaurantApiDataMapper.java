package kr.map.food.mapper.apiData;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.apiData.restaurant.RestaurantApiDTO;

@Mapper
public interface RestaurantApiDataMapper {

    void insertRestaurant(RestaurantApiDTO dto);

}
