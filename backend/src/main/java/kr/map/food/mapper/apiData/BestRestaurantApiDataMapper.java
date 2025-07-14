package kr.map.food.mapper.apiData;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.apiData.bestRestaurant.BestRestaurantApiDTO;

@Mapper
public interface BestRestaurantApiDataMapper {

    void insertBestRestaurant(BestRestaurantApiDTO dto);
    
}
