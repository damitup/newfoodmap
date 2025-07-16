package kr.map.food.mapper.mapInfo;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.mapInfo.RestaurantDTO;

@Mapper
public interface RestaurantMapper {

    List<RestaurantDTO> findAll();

    RestaurantDTO findById(String id);

    List<RestaurantDTO> findByLocation(double blY, double urY, double blX, double urX);
    
    List<RestaurantDTO> searchRestaurants(String keyword);
}
