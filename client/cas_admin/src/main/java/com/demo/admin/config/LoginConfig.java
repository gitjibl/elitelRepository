package com.demo.admin.config;

import org.jasig.cas.client.util.AbstractCasFilter;
import org.jasig.cas.client.validation.Assertion;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Configuration
public class LoginConfig implements WebMvcConfigurer {

    // 更换CAS中的session中的key
    public final static String SESSION_KEY = AbstractCasFilter.CONST_CAS_ASSERTION;

    // 普通登录SESSION
    public final static String SESSION_LOGIN = "SESSION_LOGIN";

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //注册TestInterceptor拦截器
        InterceptorRegistration registration = registry.addInterceptor(new AdminInterceptor());
        registration.addPathPatterns("/**");//所有路径都被拦截
//        registration.excludePathPatterns("/error");
        registration.excludePathPatterns("/api/user/caslogin/**","/test/sayhello");
//        registration.excludePathPatterns(                         //添加不拦截路径
//                "你的登陆路径",            //登录
//                "/**/*.html",            //html静态资源
//                "/**/*.js",              //js静态资源
//                "/**/*.css",             //css静态资源
//                "/**/*.woff",
//                "/**/*.ttf"
//        );
    }
    private class AdminInterceptor extends HandlerInterceptorAdapter {
        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
            HttpSession session = request.getSession(false);

            if (session != null) {
                System.out.println("requst path " + request.getServletPath());

                Assertion assertion = (Assertion) session.getAttribute(AbstractCasFilter.CONST_CAS_ASSERTION);

                if (assertion != null) {
                    System.out.println("cas user ---------> " + assertion.getPrincipal().getName());
                }

                String value = (String) session.getAttribute(SESSION_LOGIN);

                System.out.println("security session = null ---------> " + (value == null));

                if (value != null) {
                    return true;
                }
            }

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
    }

}
