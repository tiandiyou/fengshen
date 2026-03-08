package com.fengshen;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.fengshen")
@MapperScan("com.fengshen.**.mapper")
public class FengshenApplication {

    public static void main(String[] args) {
        SpringApplication.run(FengshenApplication.class, args);
    }
}
