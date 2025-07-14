package kr.map.food.domain.apiData.restaurant;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
public class RestaurantRawDTO {

    @JacksonXmlProperty(localName = "MGTNO")
    private String MGTNO;

    @JacksonXmlProperty(localName = "BPLCNM")
    private String BPLCNM;

    @JacksonXmlProperty(localName = "DTLSTATEGBN")
    private String DTLSTATEGBN;

    @JacksonXmlProperty(localName = "SITETEL")
    private String SITETEL;

    @JacksonXmlProperty(localName = "UPTAENM")
    private String UPTAENM;

    @JacksonXmlProperty(localName = "LVSENM")
    private String LVSENM;

    @JacksonXmlProperty(localName = "SITEWHLADDR")
    private String SITEWHLADDR;

    @JacksonXmlProperty(localName = "RDNWHLADDR")
    private String RDNWHLADDR;

    @JacksonXmlProperty(localName = "RDNPOSTNO")
    private String RDNPOSTNO;

    @JacksonXmlProperty(localName = "X")
    private String X;

    @JacksonXmlProperty(localName = "Y")
    private String Y;
}
