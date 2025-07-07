package kr.map.food.service.test;

import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import kr.map.food.domain.test.TestDTO;
import kr.map.food.mapper.test.TestMapper;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class TestService {

    @Value("${clean-test.excel-path}")
    private String excelPath;

    // 생성자 주입 (@RequiredArgsConstructor + final)
    private final TestMapper mapper;
    private final TestExcel excel;


    public void uploadExcel() throws Exception {
        
        ClassPathResource res = new ClassPathResource(excelPath);
        InputStream input = res.getInputStream();


        // 엑셀 파싱
        List<TestDTO> list = excel.parse(input);
        
        // 논리 삭제 CLDELYN = "Y"
        mapper.markAllDeleted();

        
        for(TestDTO dto : list) {
            if(mapper.existsClean(dto) > 0) {
                mapper.updateClean(dto);
            } else {
                dto.setCleanIdx(generateNextCleanIdx());
                mapper.insertClean(dto);
            }
        }
    }

    private String generateNextCleanIdx() {
        String max = mapper.getMaxCleanIdx();
        int next = (max != null) ? Integer.parseInt(max) + 1 : 1;

        return String.format("%05d", next);
    }
}
