package kr.map.food.mapper.apiData;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.apiData.bestRestaurant.BestRestaurantDTO;

@Mapper
public interface BestRestaurantApiDataMapper {

    void insertBestRestaurant(BestRestaurantDTO dto);

    List<BestRestaurantDTO> selectAll();

    BestRestaurantDTO selectById(String RESIDX);
    
}
