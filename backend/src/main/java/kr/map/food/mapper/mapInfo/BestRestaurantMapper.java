package kr.map.food.mapper.mapInfo;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.mapInfo.RestaurantDTO;

@Mapper
public interface BestRestaurantMapper {

    List<RestaurantDTO> findAllBest();

    RestaurantDTO findByIdBest(String id);
    
}
