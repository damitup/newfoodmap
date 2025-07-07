package kr.map.food;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



@SpringBootApplication(scanBasePackages = {
	"kr.map.food.controller.test",
	"kr.map.food.service.test",
	"kr.map.food.mapper.test",
	"kr.map.food.domain.test",
	"kr.map.food.service.test"
})
public class FoodApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodApplication.class, args);
	}

}
