package kr.map.food.domain.apiData.bestRestaurant;

public enum BestRestaurantGuApiInfoENUM {

    GANGNAM_MODEL(
        "http://openAPI.gangnam.go.kr:8088",
        "GnModelRestaurantDesignate"
    ),
    GANGDONG_MODEL(
        "http://openAPI.gd.go.kr:8088",
        "GdModelRestaurantDesignate"
    ),
    GANGBUK_MODEL(
        "http://openAPI.gangbuk.go.kr:8088",
        "GbModelRestaurantDesignate"
    ),
    GANGSEO_MODEL(
        "http://openAPI.gangseo.seoul.kr:8088",
        "GangseoModelRestaurantDesignate"
    ),
    GWANAK_MODEL(
        "http://openAPI.gwanak.go.kr:8088",
        "GaModelRestaurantDesignate"
    ),
    GWANGJIN_MODEL(
        "http://openAPI.gwangjin.go.kr:8088",
        "GwangjinModelRestaurantDesignate"
    ),
    GURO_MODEL(
        "http://openAPI.guro.go.kr:8088",
        "GuroModelRestaurantDesignate"
    ),
    GEUMCHEON_MODEL(
        "http://openAPI.geumcheon.go.kr:8088",
        "GeumcheonModelRestaurantDesignate"
    ),
    NOWON_MODEL(
        "http://openAPI.nowon.go.kr:8088",
        "NwModelRestaurantDesignate"
    ),
    DOBONG_MODEL(
        "http://openAPI.dobong.go.kr:8088",
        "DobongModelRestaurantDesignate"
    ),
    DONGDAEMUN_MODEL(
        "http://openAPI.ddm.go.kr:8088",
        "DongdeamoonModelRestaurantDesignate"
    ),
    DONGJAK_MODEL(
        "http://openAPI.dongjak.go.kr:8088",
        "DjModelRestaurantDesignate"
    ),
    MAPO_MODEL(
        "http://openAPI.mapo.go.kr:8088",
        "MpModelRestaurantDesignate"
    ),
    SEODAEMUN_MODEL(
        "http://openAPI.sdm.go.kr:8088",
        "SeodaemunModelRestaurantDesignate"
    ),
    SEOCHO_MODEL(
        "http://openAPI.seocho.go.kr:8088",
        "ScModelRestaurantDesignate"
    ),
    SEONGDONG_MODEL(
        "http://openAPI.sd.go.kr:8088",
        "SdModelRestaurantDesignate"
    ),
    SEONGBUK_MODEL(
        "http://openAPI.sb.go.kr:8088",
        "SbModelRestaurantDesignate"
    ),
    SONGPA_MODEL(
        "http://openAPI.songpa.seoul.kr:8088",
        "SpModelRestaurantDesignate"
    ),
    YANGCHEON_MODEL(
        "http://openAPI.yangcheon.go.kr:8088",
        "YcModelRestaurantDesignate"
    ),
    YEONGDEUNGPO_MODEL(
        "http://openAPI.ydp.go.kr:8088",
        "YdpModelRestaurantDesignate"
    ),
    YONGSAN_MODEL(
        "http://openAPI.yongsan.go.kr:8088",
        "YsModelRestaurantDesignate"
    ),
    EUNPYEONG_MODEL(
        "http://openAPI.ep.go.kr:8088",
        "EpModelRestaurantDesignate"
    ),
    JONGNO_MODEL(
        "http://openAPI.jongno.go.kr:8088",
        "JongnoModelRestaurantDesignate"
    ),
    JUNGGU_MODEL(
        "http://openAPI.junggu.seoul.kr:8088",
        "JungguModelRestaurantDesignate"
    ),
    JUNGNANG_MODEL(
        "http://openAPI.jungnang.seoul.kr:8088",
        "JungnangModelRestaurantDesignate"
    );

    private final String baseUrl;
    private final String code;

    BestRestaurantGuApiInfoENUM(String baseUrl, String code) {
        this.baseUrl = baseUrl;
        this.code = code;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public String getCode() {
        return code;
    }
    
}
