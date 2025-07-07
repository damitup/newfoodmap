package kr.map.food.domain.util;

import javax.xml.bind.annotation.XmlElement;

public class ResultDTO {

    @XmlElement(name = "CODE")
    private String code;

    @XmlElement(name = "MESSAGE")
    private String message;

    // Getter & Setter
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
}
