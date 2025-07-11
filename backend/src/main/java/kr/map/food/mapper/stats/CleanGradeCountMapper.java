package kr.map.food.mapper.stats;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.stats.CleanGradeCountDTO;

@Mapper
public interface CleanGradeCountMapper {

    List<CleanGradeCountDTO> findCleanGradeCount(String ADDRGU);
    
}
