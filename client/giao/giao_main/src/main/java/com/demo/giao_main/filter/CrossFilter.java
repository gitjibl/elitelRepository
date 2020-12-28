package com.demo.giao_main.filter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@Component
public class CrossFilter implements Filter {

    @Value("${allowOrigins}")
    private String allowOrigins;

    private ArrayList<String> allowOrigin = new ArrayList<>();

    public CrossFilter() {
//        allowOrigin.add("http://127.0.0.1:9921");
//        allowOrigin.add("http://localhost:9921");
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println(allowOrigins+" CrossFilter init...................");
        String[] allowOriginArr = allowOrigins.split(",");
        for(int i=0;i<allowOriginArr.length;i++){
           allowOrigin.add(allowOriginArr[i]);
        }
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        String origin = ((HttpServletRequest)servletRequest).getHeader("Origin");
        //设置允许的跨域请求源
        if(allowOrigin.contains(origin)){
            httpServletResponse.setHeader("Access-Control-Allow-Origin",origin);
        }else{
            httpServletResponse.setHeader("Access-Control-Allow-Origin","http://localhost:8080");
        }
        // 设置允许的跨域请求头
        httpServletResponse.setHeader("Access-Control-Allow-Headers","Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, userId, token, x-requested-with, XMLHttpRequest, Accept");
        // 设置允许的跨域请求方法
        httpServletResponse.setHeader("Access-Control-Allow-Methods","POST, GET, OPTIONS, DELETE");
        //  设置允许跨域请求的最长时间，这里设置了30天，就为了尽量延长允许时间，
        //  时间过短会导致经常在请求前先发送一个Option请求，用于获取服务端允许哪些跨域访问类型，导致资源浪费。
        httpServletResponse.setHeader("Access-Control-Max-Age","2592000");
        // 设置允许携带证书信息，包括Session和Cookie等等
        httpServletResponse.setHeader("Access-Control-Allow-Credentials","true");
        //  设置请求类型为json请求
        httpServletResponse.setContentType("application/json;charset=utf-8");

        filterChain.doFilter(servletRequest,servletResponse);
    }

    @Override
    public void destroy() {

    }
}
