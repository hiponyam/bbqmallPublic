package com.hiponya.bbqmall.configs;

import com.hiponya.bbqmall.interceptors.CommonInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer { // 웹의 전반적인 설정 조율

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(this.commonInterceptor())
                .addPathPatterns("/**")// 모든 경로
                .excludePathPatterns("/**/resources/**"); // 해당 경로에 있는 파일은 intercept 제외
    }


    @Bean // CommonInterceptor 사용하기 위해
    public CommonInterceptor commonInterceptor() {
        return new CommonInterceptor();
    }
}
