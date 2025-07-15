package kr.map.food.service.apiData.dataTrans;

import kr.map.food.domain.apiData.restaurant.RestaurantApiDTO;

public class TelNumTrans {
    
    public static void setTelNum( RestaurantApiDTO dto ) {
        
        if (dto == null || dto.getRESNUM() == null || dto.getRESNUM().isBlank()) {
            dto.setRESNUM("");
            return;
        }

        String cleaned = dto.getRESNUM().replaceAll("\\s+", "");

        String formatted = "";

        if ( cleaned.startsWith("02") ) {
            String number = cleaned.substring(2);
            if (number.length() == 8) {
                formatted = "02-" + number.substring(0, 4) + "-" + number.substring(4);
            } 
            if (number.length() == 7) {
                formatted = "02-" + number.substring(0, 3) + "-" + number.substring(3);
            }
        } 

        if ( cleaned.startsWith("070") ) {
            String number = cleaned.substring(3);
            if (number.length() == 8) {
                formatted = "070-" + number.substring(0, 4) + "-" + number.substring(4);
            } 
            if (number.length() == 7) {
                formatted = "070-" + number.substring(0, 3) + "-" + number.substring(3);
            }
        } 

        if ( cleaned.startsWith("2") ) {
            if ( cleaned.length() == 9 ) {
                String number = cleaned.substring(1);
                formatted = "02-" + number.substring(0, 4) + "-" + number.substring(4);
            }
            if ( cleaned. length() == 8 ) {
                String number = cleaned.substring(1);
                formatted = "02-" + number.substring(0, 3) + "-" + number.substring(3);
            }
        }

        if ( cleaned.length() == 8 ) {
            formatted = "02-" + cleaned.substring(0,4) + "-" + cleaned.substring(4);
        }

        if ( cleaned.length() == 7 ) {
            formatted = "02-" + cleaned.substring(0, 3) + "-" + cleaned.substring(3);
        }
        
        dto.setRESNUM(formatted);

    }

}
