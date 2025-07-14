package kr.map.food.domain.apiData.penaltyRestaurant;

public enum PenaltyGuApiInfoENUM {

    GANGNAM_PENALTY(
        "http://openAPI.gangnam.go.kr:8088",
        "GnAdminMesureFood"
     )
    //  ,
    // GANGDONG_PENALTY(
    //     "http://openAPI.gd.go.kr:8088",
    //     "GdAdminMesureFood"
    // ),
    // GANGBUK_PENALTY(
    //     "http://openAPI.gangbuk.go.kr:8088",
    //     "GbAdminMesureFood"
    // ),
    // GANGSEO_PENALTY(
    //     "http://openAPI.gangseo.seoul.kr:8088",
    //     "GangseoAdminMesureFood"
    // ),
    // GWANAK_PENALTY(
    //     "http://openAPI.gwanak.go.kr:8088",
    //     "GaAdminMesureFood"
    // ),
    // GWANGJIN_PENALTY(
    //     "http://openAPI.gwangjin.go.kr:8088",
    //     "GwangjinAdminMesureFood"
    // ),
    // GURO_PENALTY(
    //     "http://openAPI.guro.go.kr:8088",
    //     "GuroAdminMesureFood"
    // ),
    // GEUMCHEON_PENALTY(
    //     "http://openAPI.geumcheon.go.kr:8088",
    //     "GeumcheonAdminMesureFood"
    // ),
    // NOWON_PENALTY(
    //     "http://openAPI.nowon.go.kr:8088",
    //     "NwAdminMesureFood"
    // ),
    // DOBONG_PENALTY(
    //     "http://openAPI.dobong.go.kr:8088",
    //     "DobongAdminMesureFood"
    // ),
    // DONGDAEMUN_PENALTY(
    //     "http://openAPI.ddm.go.kr:8088",
    //     "DongdeamoonAdminMesureFood"
    // ),
    // DONGJAK_PENALTY(
    //     "http://openAPI.dongjak.go.kr:8088",
    //     "DjAdminMesureFood"
    // ),
    // MAPO_PENALTY(
    //     "http://openAPI.mapo.go.kr:8088",
    //     "MpAdminMesureFood"
    // ),
    // SEODAEMUN_PENALTY(
    //     "http://openAPI.sdm.go.kr:8088",
    //     "SeodaemunAdminMesureFood"
    // ),
    // SEOCHO_PENALTY(
    //     "http://openAPI.seocho.go.kr:8088",
    //     "ScAdminMesureFood"
    // ),
    // SEONGDONG_PENALTY(
    //     "http://openAPI.sd.go.kr:8088",
    //     "SdAdminMesureFood"
    // ),
    // SEONGBUK_PENALTY(
    //     "http://openAPI.sb.go.kr:8088",
    //     "SbAdminMesureFood"
    // ),
    // SONGPA_PENALTY(
    //     "http://openAPI.songpa.seoul.kr:8088",
    //     "SpAdminMesureFood"
    // ),
    // YANGCHEON_PENALTY(
    //     "http://openAPI.yangcheon.go.kr:8088",
    //     "YcAdminMesureFood"
    // ),
    // YEONGDEUNGPO_PENALTY(
    //     "http://openAPI.ydp.go.kr:8088",
    //     "YdpAdminMesureFood"
    // ),
    // YONGSAN_PENALTY(
    //     "http://openAPI.yongsan.go.kr:8088",
    //     "YsAdminMesureFood"
    // ),
    // EUNPYEONG_PENALTY(
    //     "http://openAPI.ep.go.kr:8088",
    //     "EpAdminMesureFood"
    // ),
    // JONGNO_PENALTY(
    //     "http://openAPI.jongno.go.kr:8088",
    //     "JongnoAdminMesureFood"
    // ),
    // JUNGGU_PENALTY(
    //     "http://openAPI.junggu.seoul.kr:8088",
    //     "JungguAdminMesureFood"
    // ),
    // JUNGNANG_PENALTY(
    //     "http://openAPI.jungnang.seoul.kr:8088",
    //     "JungnangAdminMesureFood"
    // )
    ;

    
    private final String baseUrl;
    private final String code;

    PenaltyGuApiInfoENUM(String baseUrl, String code) {
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
