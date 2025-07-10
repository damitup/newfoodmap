package kr.map.food.service.apiData.dataTrans;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

import org.json.JSONArray;
import org.json.JSONObject;

import kr.map.food.config.ApiKeyConfig;

import kr.map.food.domain.apiData.restaurant.RestaurantKakaoAddressDTO;

public class KakaoApiClient {
    
    // 카카오api 이용하여 데이터 받기
    public static RestaurantKakaoAddressDTO searchAddress(String address) {

        try {
            String apiKey = ApiKeyConfig.KAKAO_REST_API_KEY;
            String apiUrl = "https://dapi.kakao.com/v2/local/search/address.json?query=" 
                            + URLEncoder.encode(address, StandardCharsets.UTF_8);

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Authorization", apiKey)
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            JSONObject json = new JSONObject(response.body());
            JSONArray documents = json.getJSONArray("documents");

            if (documents.isEmpty()) return null;

            JSONObject first = documents.getJSONObject(0);
            JSONObject road = first.optJSONObject("road_address");
            JSONObject jibun = first.optJSONObject("address");

            RestaurantKakaoAddressDTO info = new RestaurantKakaoAddressDTO();
            if (road != null) {
                info.setRoadAddress(road.optString("address_name"));
                info.setPostCode(road.optString("zone_no"));
            }
            if (jibun != null) {
                info.setJibunAddress(jibun.optString("address_name"));

                String gu = jibun.optString("region_2depth_name");
                info.setGu(gu != null ? gu : "");

                String dong = jibun.optString("region_3depth_name");
                info.setDong(dong != null ? dong : "");
        
                if (info.getPostCode() == null) {
                    info.setPostCode(jibun.optString("zip_code"));
                }
            }
            String x = first.optString("x", null);
            if (x != null && !x.isBlank()) info.setLongitude(Double.parseDouble(x));

            String y = first.optString("y", null);
            if (y != null && !y.isBlank()) info.setLatitude(Double.parseDouble(y));
            return info;
        } 
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }


    public static String fetchRoadAddressOnly(String address) {
    
        try {
            String apiKey = ApiKeyConfig.KAKAO_REST_API_KEY;
            String apiUrl = "https://dapi.kakao.com/v2/local/search/address.json?query=" 
                        + URLEncoder.encode(address, StandardCharsets.UTF_8);

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Authorization", apiKey)
                .GET()
                .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
            JSONObject json = new JSONObject(response.body());
            JSONArray documents = json.getJSONArray("documents");

            if (documents.isEmpty()) return null;

            JSONObject first = documents.getJSONObject(0);
            JSONObject road = first.optJSONObject("road_address");

            if (road != null) {
            return road.optString("address_name");
            }

            return null;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    



}
