package kr.map.food.service.cleanGrade;

import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import kr.map.food.domain.cleanGrade.CleanGradeDTO;
import kr.map.food.mapper.cleanGrade.CleanGradeMapper;
import kr.map.food.service.cleanGrade.excel.CleanGradeExcel;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CleanGradeServiceImpl {

    @Value("${clean.excel-path}")
    private String excelPath;

    // 생성자 주입 (@RequiredArgsConstructor + final)
    private final CleanGradeMapper mapper;
    private final CleanGradeExcel excel;


    public void uploadExcel() throws Exception {
        
        ClassPathResource res = new ClassPathResource(excelPath);
        InputStream input = res.getInputStream();


        // 엑셀 파싱
        List<CleanGradeDTO> list = excel.parse(input);
        
        // 논리 삭제 CLDELYN = "Y"
        mapper.markAllDeleted();

        
        for(CleanGradeDTO dto : list) {
            if(mapper.existsClean(dto) > 0) {
                mapper.updateClean(dto);
            } else {
                dto.setCLIDX(generateNextCleanIdx());
                mapper.insertClean(dto);
            }
        }
    }

    private String generateNextCleanIdx() {
        String max = mapper.getMaxCleanIdx();
        int nextNumber;

        if (max != null && max.startsWith("CL")) {
            // max: "CL000123"
            String numberPart = max.substring(2); // "000123"
            nextNumber = Integer.parseInt(numberPart) + 1;
        } else {
            nextNumber = 1;
        }

        return String.format("CL%06d", nextNumber);
    }

}
