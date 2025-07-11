package kr.map.food.mapper.apiData;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.apiData.penaltyRestaurant.PenaltyApiDTO;


@Mapper
public interface PenaltyApiDataMapper {
    
    void insertPenalty(PenaltyApiDTO penaltyDTO);

    List<PenaltyApiDTO> selectAll();

    PenaltyApiDTO selectById(String PENALTYIDX);
}
