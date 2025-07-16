package kr.map.food.service.cleanGrade.excel;

import kr.map.food.domain.apiData.restaurant.RestaurantKakaoAddressDTO;
import kr.map.food.domain.cleanGrade.CleanGradeDTO;
import kr.map.food.service.apiData.dataTrans.KakaoApiClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;


@Slf4j
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

            String RESNAME = getCellValue(row.getCell(1));
            String rawAddress = getCellValue(row.getCell(2));
            String RESCLEANSCORE = getCellValue(row.getCell(3));
            String assignDate = getCellValue(row.getCell(5));

            if(!rawAddress.startsWith("서울특별시")) continue;

            int ASSIGNYEAR = 0;
            if (assignDate != null && assignDate.length() >= 4) {
                ASSIGNYEAR = Integer.parseInt(assignDate.substring(0, 4));
            }

            RestaurantKakaoAddressDTO kakaoInfo = KakaoApiClient.searchAddress(rawAddress);


            if (kakaoInfo == null) {
                log.warn("Kakao 주소 변환 실패: {}", rawAddress);
                continue; // 해당 데이터는 건너뜀
            }
            
            
            CleanGradeDTO dto = new CleanGradeDTO();
            
                dto.setRESNAME(RESNAME);
                dto.setRESCLEANSCORE(RESCLEANSCORE);
                dto.setASSIGNYEAR(ASSIGNYEAR);

                dto.setOLDADDR(kakaoInfo.getJibunAddress());
                dto.setNEWADDR(kakaoInfo.getRoadAddress());
                dto.setADDRGU(kakaoInfo.getGu());
                dto.setADDRDONG(kakaoInfo.getDong());
                dto.setNUMADDR(kakaoInfo.getPostCode());
                dto.setXPOS(kakaoInfo.getLongitude());
                dto.setYPOS(kakaoInfo.getLatitude());

                dto.setDELYN("N");

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
