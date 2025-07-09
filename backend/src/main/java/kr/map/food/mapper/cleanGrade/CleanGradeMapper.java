package kr.map.food.mapper.cleanGrade;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.cleanGrade.CleanGradeDTO;


@Mapper
public interface CleanGradeMapper {
    
    // 등록
    void insertClean(CleanGradeDTO gradeDTO);
    // 중복 여부
    int existsClean(CleanGradeDTO gradeDTO);
    // 기존 전체 CLDELYN = "Y"
    void markAllDeleted();
    // 중복 항목 살아있음 처리
    void markAlive();
    // 가장 큰 IDX 번호 조회
    String getMaxCleanIdx();
    // 등급 변경 시(업소명 동일)
    void updateClean(CleanGradeDTO gradeDTO);

}
