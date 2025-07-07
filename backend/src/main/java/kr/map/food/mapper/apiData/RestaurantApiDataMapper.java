package kr.map.food.mapper.apiData;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.apiData.restaurant.RestaurantDTO;

@Mapper
public interface RestaurantApiDataMapper {

    void insertRestaurant(RestaurantDTO dto);

    List<RestaurantDTO> selectAll();

    RestaurantDTO selectById(String RESIDX);
    
}
