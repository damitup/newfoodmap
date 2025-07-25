package kr.map.food.domain.apiData.penaltyRestaurant;

import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import kr.map.food.domain.util.ResultDTO;
import lombok.Data;

@Data
public class PenaltyApiResponse {

    @JacksonXmlProperty(localName = "list_total_count")
    private int listTotalCount;

    @JacksonXmlProperty(localName = "RESULT")
    private ResultDTO result;

    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "row")
    private List<PenaltyRawDTO> row;
}
