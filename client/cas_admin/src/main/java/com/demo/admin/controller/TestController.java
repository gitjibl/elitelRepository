package com.demo.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin()
@RequestMapping("/test")
public class TestController {

    @ResponseBody
    @RequestMapping("sayhello")
    public String sayHello() {
        return "say Hello....";
    }
}
