package kr.map.food.mapper.mapInfo;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.mapInfo.CleanGradeMapDTO;

@Mapper
public interface CleanGradeMapMapper {

    List<CleanGradeMapDTO> findAllCleanGrade();

    CleanGradeMapDTO findByCleanIdx(String CLIDX);
    
}
