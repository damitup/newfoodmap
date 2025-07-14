package kr.map.food.domain.util;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ResultDTO {

    @JacksonXmlProperty(localName = "CODE")
    private String code;

    @JacksonXmlProperty(localName = "MESSAGE")
    private String message;
    
}

