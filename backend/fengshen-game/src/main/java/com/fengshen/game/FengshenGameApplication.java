package com.fengshen.game;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.fengshen")
@MapperScan("com.fengshen.**.mapper")
public class FengshenGameApplication {

    public static void main(String[] args) {
        SpringApplication.run(FengshenGameApplication.class, args);
    }
}
