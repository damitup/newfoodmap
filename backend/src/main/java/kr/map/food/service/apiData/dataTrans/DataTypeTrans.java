package kr.map.food.service.apiData.dataTrans;

public class DataTypeTrans {

    public static Integer parseIntSafe(String value) {
        try {
            return (value == null || value.isBlank()) ? null : Integer.parseInt(value.trim());
        } 
        catch (NumberFormatException e) {
            return null;
        }
    }

    public static Double parseDoubleSafe(String value) {
        try {
            return (value == null || value.isBlank()) ? null : Double.parseDouble(value.trim());
        } 
        catch (NumberFormatException e) {
            return null;
        }
    }
    
}
