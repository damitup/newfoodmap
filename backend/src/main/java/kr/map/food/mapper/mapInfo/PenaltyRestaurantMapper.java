package kr.map.food.mapper.mapInfo;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.mapInfo.PenaltyRestaurantDTO;

@Mapper
public interface PenaltyRestaurantMapper {

    List<PenaltyRestaurantDTO> findAllPenaltyRestaurant();

    PenaltyRestaurantDTO findPenaltyRestaurantById(String RESIDX);
    
}
