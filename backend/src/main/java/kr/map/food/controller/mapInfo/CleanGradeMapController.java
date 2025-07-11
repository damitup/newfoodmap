package kr.map.food.controller.mapInfo;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.map.food.domain.mapInfo.CleanGradeMapDTO;
import kr.map.food.service.mapInfo.CleanGradeMapService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/map/clean")
@RequiredArgsConstructor
public class CleanGradeMapController {

    private final CleanGradeMapService cleanGradeMapService;

    @GetMapping
    public List<CleanGradeMapDTO> getAllCleanGrade() {
        return cleanGradeMapService.getAllCleanGrade();
    }

    @GetMapping("/{CLIDX}")
    public CleanGradeMapDTO getById(@PathVariable String CLIDX) {
        return cleanGradeMapService.getCleanGradeById(CLIDX);
    }  
    
}
