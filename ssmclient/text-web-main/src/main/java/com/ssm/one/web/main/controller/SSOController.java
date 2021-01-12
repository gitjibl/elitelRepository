package com.ssm.one.web.main.controller;

import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.jasig.cas.client.authentication.AttributePrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SSOController {
	
	@RequestMapping("/login")
	@ResponseBody
	public Map login(HttpServletRequest request){
		String path = request.getContextPath();
		String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
		AttributePrincipal principal = (AttributePrincipal)request.getUserPrincipal();  
		String loginName = principal.getName();
		Map<String, Object> attributes = principal.getAttributes();
		for (String key : attributes.keySet()) {
			System.out.println(key + "/" + attributes.get(key));
		}
		return attributes;
    }
	
	 @RequestMapping("/logOut")
	    public String logout(HttpSession session,HttpServletRequest request) {
//		 	String path = request.getContextPath();
//		 	String baseUrl = request.getScheme() 
//		 			+ "://" + request.getServerName() 
//		 			+ ":" 
//		 			+ request.getServerPort() 
//		 			+ path 
//		 			+ "/";
//	        session.invalidate();
//	        return "redirect:http://192.168.0.239:8082/cas/logout?service="+baseUrl;
			session.invalidate();// 销毁跟用户关联session
			ServletContext context =request.getServletContext();
			System.out.println("logout-------"+context.getInitParameter("casServerLogoutUrl"));
			System.out.println("servername-------"+context.getInitParameter("serverName"));
			return "redirect:" + context.getInitParameter("casServerLogoutUrl")
					+ "?service=" + context.getInitParameter("serverName")+"/text-web-main"; 
	    }

}
