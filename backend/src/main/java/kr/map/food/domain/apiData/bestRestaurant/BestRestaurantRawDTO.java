package kr.map.food.domain.apiData.bestRestaurant;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
public class BestRestaurantRawDTO {

    @JacksonXmlProperty(localName = "PERM_NT_NO")
    private String PERM_NT_NO;

    @JacksonXmlProperty(localName = "MAIN_EDF")
    private String MAIN_EDF;

    @JacksonXmlProperty(localName = "ASGN_YY")
    private String ASGN_YY;
    
}
