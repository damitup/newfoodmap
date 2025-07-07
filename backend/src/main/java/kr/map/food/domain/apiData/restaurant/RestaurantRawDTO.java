package kr.map.food.domain.apiData.restaurant;

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
public class RestaurantRawDTO {

    @XmlElement(name = "MGTNO")
    private String MGTNO;

    @XmlElement(name = "BPLCNM")
    private String BPLCNM;

    @XmlElement(name = "DTLSTATEGBN")
    private String DTLSTATEGBN;

    @XmlElement(name = "SITETEL")
    private String SITETEL;

    @XmlElement(name = "UPTAENM")
    private String UPTAENM;

    @XmlElement(name = "LVSENM")
    private String LVSENM;

    @XmlElement(name = "SITEWHLADDR")
    private String SITEWHLADDR;

    @XmlElement(name = "RDNWHLADDR")
    private String RDNWHLADDR;

    @XmlElement(name = "RDNPOSTNO")
    private String RDNPOSTNO;

    @XmlElement(name = "X")
    private String X;

    @XmlElement(name = "Y")
    private String Y;
    
}
