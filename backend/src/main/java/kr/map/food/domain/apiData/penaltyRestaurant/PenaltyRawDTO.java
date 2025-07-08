package kr.map.food.domain.apiData.penaltyRestaurant;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import lombok.Builder;
import lombok.Data;

@XmlRootElement(name = "row")
@XmlAccessorType(XmlAccessType.FIELD)
@Data
@Builder
public class PenaltyRawDTO {

    // 업소명
    @XmlElement(name = "UPSO_NM")
    private String UPSO_NM;

    // 소재지 도로명
    @XmlElement(name = "SITE_ADDR_RD")
    private String SITE_ADDR_RD;

    // 소재지 지번
    @XmlElement(name = "SITE_ADDR")
    private String SITE_ADDR;

    // 위반내용
    @XmlElement(name = "VIOL_CN")
    private String VIOL_CN;

    // 업태명
    @XmlElement(name = "SNT_UPTAE_NM")
    private String SNT_UPTAE_NM;

}
