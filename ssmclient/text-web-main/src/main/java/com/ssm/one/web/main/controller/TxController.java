package com.ssm.one.web.main.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;



@Controller
@RequestMapping("/test")
public class TxController {

	
	@RequestMapping("/getData")
	@ResponseBody
	public String selectSnbsbis(){
		return "fff";
	}
	

	
}
