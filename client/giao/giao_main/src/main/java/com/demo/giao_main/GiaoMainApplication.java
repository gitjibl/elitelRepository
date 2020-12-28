package com.demo.giao_main;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"com.demo.*"})
@MapperScan({"com.demo.*.dao.*"})
public class GiaoMainApplication {

    public static void main(String[] args) {
        SpringApplication.run(GiaoMainApplication.class, args);
    }

}
