package kr.map.food.domain.apiData.penaltyRestaurant;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import lombok.Data;
import lombok.NoArgsConstructor;



@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
public class PenaltyRawDTO {

    // 업소명
    @JacksonXmlProperty(localName = "UPSO_NM")
    private String UPSO_NM;

    // 업종명
    @JacksonXmlProperty(localName = "SNT_COB_NM")
    private String SNT_COB_NM;

    // 업태명
    @JacksonXmlProperty(localName = "SNT_UPTAE_NM")
    private String SNT_UPTAE_NM;

    // 소재지 도로명
    @JacksonXmlProperty(localName = "SITE_ADDR_RD")
    private String SITE_ADDR_RD;

    // 소재지 지번
    @JacksonXmlProperty(localName = "SITE_ADDR")
    private String SITE_ADDR;

    // 위반내용
    @JacksonXmlProperty(localName = "VIOL_CN")
    private String VIOL_CN;

    

}
