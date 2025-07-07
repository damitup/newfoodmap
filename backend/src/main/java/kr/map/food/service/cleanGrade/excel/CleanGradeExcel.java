package kr.map.food.service.cleanGrade.excel;

import kr.map.food.domain.cleanGrade.CleanGradeDTO;
import lombok.RequiredArgsConstructor;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;



@Component
@RequiredArgsConstructor
public class CleanGradeExcel {

    public List<CleanGradeDTO> parse(InputStream inputStream) throws Exception {
        List<CleanGradeDTO> list = new ArrayList<>();
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0);

        // 3번째 행부터 데이터 있음
        for(int i = 2; i <= sheet.getLastRowNum(); i++ ) {
            Row row = sheet.getRow(i);

            if(row == null) continue;

            String upsoNm = getCellValue(row.getCell(1));
            String siteAddr = getCellValue(row.getCell(2));
            String assignGrade = getCellValue(row.getCell(3));
            String assignDate = getCellValue(row.getCell(5));

            if(!siteAddr.startsWith("서울특별시")) continue;

            int assignYear = 0;
            if (assignDate != null && assignDate.length() >= 4) {
                assignYear = Integer.parseInt(assignDate.substring(0, 4));
            }

            CleanGradeDTO dto = new CleanGradeDTO();
            dto.setUpsoNm(upsoNm);
            dto.setSiteAddr(siteAddr);
            dto.setAssignGrade(assignGrade);
            dto.setAssignYear(assignYear);
            dto.setClDelYn("N");

            list.add(dto);
        }

        workbook.close();
                
        return list;
    } 

    private String getCellValue(Cell cell) {
        if(cell == null) return "";

        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue().trim();
            case NUMERIC -> (DateUtil.isCellDateFormatted(cell))
                    ? cell.getDateCellValue().toString().substring(0, 10)
                    : String.valueOf((int) cell.getNumericCellValue());
            default -> "";
        };
    }
}
