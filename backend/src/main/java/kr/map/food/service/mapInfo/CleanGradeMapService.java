package kr.map.food.service.mapInfo;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.map.food.domain.mapInfo.CleanGradeMapDTO;
import kr.map.food.mapper.mapInfo.CleanGradeMapMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CleanGradeMapService {

    private final CleanGradeMapMapper cleanGradeMapMapper;

    public List<CleanGradeMapDTO> getAllCleanGrade() {
        return cleanGradeMapMapper.findAllCleanGrade();
    }

    public CleanGradeMapDTO getCleanGradeById(String CLEANIDX) {
        return cleanGradeMapMapper.findByCleanIdx(CLEANIDX);
    }
    
}
