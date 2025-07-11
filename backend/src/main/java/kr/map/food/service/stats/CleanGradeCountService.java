package kr.map.food.service.stats;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.map.food.domain.stats.CleanGradeCountDTO;
import kr.map.food.mapper.stats.CleanGradeCountMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CleanGradeCountService {

    public final CleanGradeCountMapper cleanGradeCountMapper;

    public List<CleanGradeCountDTO> getCleanGradeCount(String ADDRGU) {
        List<CleanGradeCountDTO> list = cleanGradeCountMapper.findCleanGradeCount(ADDRGU);
        return list;
    }
    
}
