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
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
                log.info("업데이트: {} / {} / {} → {}", 
                            dto.getRESNAME(), 
                            dto.getASSIGNYEAR(), 
                            dto.getADDRGU(), 
                            dto.getRESCLEANSCORE()
                        );
            } else {
                dto.setRESIDX(generateNextCleanIdx());
                mapper.insertClean(dto);
                log.info("삽입: {} / {} / {} → {}", 
                            dto.getRESNAME(), 
                            dto.getASSIGNYEAR(), 
                            dto.getADDRGU(), 
                            dto.getRESCLEANSCORE());
            }
        }
        log.info("업로드 완료. 총 {}건 처리됨", list.size());
    }

    private String generateNextCleanIdx() {
        String max = mapper.getMaxCleanIdx();
        int nextNumber;

        if (max != null && max.startsWith("CL")) {
            String numberPart = max.substring(2);
            nextNumber = Integer.parseInt(numberPart) + 1;
        } 
        else {
            nextNumber = 1;
        }

        return String.format("CL%06d", nextNumber);
    }

}
