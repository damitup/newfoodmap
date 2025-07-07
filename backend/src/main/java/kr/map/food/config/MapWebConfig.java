package kr.map.food.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MapWebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/map/**")
                .allowedOrigins("http://192.168.0.67:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }

}
