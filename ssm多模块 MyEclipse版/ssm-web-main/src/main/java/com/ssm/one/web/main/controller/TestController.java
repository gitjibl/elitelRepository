package com.ssm.one.web.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ssm.one.entity.main.SnBsbi;
import com.ssm.one.entity.main.ext.ExtSnBsbi;
import com.ssm.one.srv.main.service.TestService;

@Controller
@RequestMapping("/test")
public class TestController {
	
	@Autowired
	private TestService testService;
	
	@RequestMapping("/getData")
	@ResponseBody
	public List<SnBsbi> selectSnbsbis(){
		List<SnBsbi> list = testService.selectSnbsbis();
		return list;
	}
	
	@RequestMapping("/getExtData")
	@ResponseBody
	public List<ExtSnBsbi> selectExtSnbsbis(){
		List<ExtSnBsbi> list = testService.selectExtSnbsbis();
		return list;
	}
	
}
