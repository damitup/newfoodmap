package kr.map.food.domain.apiData.bestRestaurant;

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
public class BestRestaurantRawDTO {

    @XmlElement(name = "PERM_NT_NO")
    private String PERM_NT_NO;

    @XmlElement(name = "MAIN_EDF")
    private String MAIN_EDF;

    @XmlElement(name = "ASGN_YY")
    private String ASGN_YY;
    
}
