package kr.map.food.mapper.apiData;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.apiData.bestRestaurant.BestRestaurantApiDTO;

@Mapper
public interface BestRestaurantApiDataMapper {

    void insertBestRestaurant(BestRestaurantApiDTO dto);

    List<BestRestaurantApiDTO> selectAll();

    BestRestaurantApiDTO selectById(String RESIDX);
    
}
