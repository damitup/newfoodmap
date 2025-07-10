package kr.map.food.util;

import org.apache.commons.text.similarity.JaroWinklerSimilarity;

public class StoreNmSimilarityUtil {

    // 영어 소문자 변환 + 공백 제거 + 유사도 계산
    public static double calculateSimilarity(String name1, String name2) {

        if (name1 == null || name2 == null) return 0.0;

        // 소문자 변환
        name1 = name1.toLowerCase();
        name2 = name2.toLowerCase();

        // 공백 제거
        name1 = name1.replaceAll("\\s+", "");
        name2 = name2.replaceAll("\\s+", "");
    
        // 유사도 계산
        JaroWinklerSimilarity jws = new JaroWinklerSimilarity();
        
        return jws.apply(name1, name2); 
    }
}
