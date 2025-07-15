package kr.map.food.service.apiData.dataTrans;

import org.locationtech.proj4j.CRSFactory;
import org.locationtech.proj4j.CoordinateReferenceSystem;
import org.locationtech.proj4j.CoordinateTransform;
import org.locationtech.proj4j.CoordinateTransformFactory;
import org.locationtech.proj4j.ProjCoordinate;

import kr.map.food.domain.apiData.restaurant.RestaurantApiDTO;
import kr.map.food.domain.apiData.restaurant.RestaurantRawDTO;

public class CoordinateTrans {

    /**
     * UTM-K 좌표 범위 체크 (서울 기준 대략 범위)
     */
    private static boolean isUtmk(double x, double y) {
        return (x > 100000 && x < 300000) && (y > 300000 && y < 700000);
    }

    /**
     * UTM-K 좌표를 WGS84 경위도로 변환
     */
    private static double[] convertUtmkToWgs84(double x, double y) {
        CRSFactory factory = new CRSFactory();

        CoordinateReferenceSystem srcCrs = factory.createFromParameters(
            "EPSG:5179",
            "+proj=tmerc +lat_0=38 +lon_0=127 +k=1.0 "
            + "+x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"
        );

        CoordinateReferenceSystem dstCrs = factory.createFromName("epsg:4326");

        CoordinateTransformFactory ctFactory = new CoordinateTransformFactory();
        CoordinateTransform transform = ctFactory.createTransform(srcCrs, dstCrs);

        ProjCoordinate srcCoord = new ProjCoordinate(x, y);
        ProjCoordinate dstCoord = new ProjCoordinate();

        transform.transform(srcCoord, dstCoord);

        // dstCoord.x = 경도, dstCoord.y = 위도
        return new double[] { dstCoord.x, dstCoord.y };
    }

    /**
     * raw 데이터의 좌표를 확인해서 
     * UTM-K 좌표면 WGS84로 변환 후 dto에 세팅,
     * 아니면 기존 좌표 그대로 세팅
     */
    public static void setCoordinate(RestaurantRawDTO raw, RestaurantApiDTO dto) {
        Double x = null;
        Double y = null;

        try {
            x = Double.parseDouble(raw.getX());
            y = Double.parseDouble(raw.getY());
        } catch (Exception e) {
            // 파싱 실패 시 null 처리
        }

        if (x == null || y == null) {
            // 좌표 없으면 그냥 안함
            return;
        }

        if (isUtmk(x, y)) {
            double[] wgs84 = convertUtmkToWgs84(x, y);
            dto.setXPOS(wgs84[0]);
            dto.setYPOS(wgs84[1]);
        } else {
            // 이미 WGS84 좌표로 가정하고 그대로 넣음
            dto.setXPOS(x);
            dto.setYPOS(y);
        }
    }
    
}
