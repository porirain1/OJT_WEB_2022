package com.barunsw.web.spring;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.barunsw.web.history.HistoryService;
import com.barunsw.web.interceptor.MenuInterceptor;
import com.barunsw.web.menu.MenuService;
import com.barunsw.web.menu.MenuVo;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

	@Autowired
	private MenuService menuService;
	
//	@Override
//	public void addInterceptors(InterceptorRegistry registry) {		
//		registry.addInterceptor(menuInterceptor())
//			.addPathPatterns("/**")
//			.excludePathPatterns("/resources/**");
//	}
//	
//	@Bean
//	public MenuInterceptor menuInterceptor() {
//		return new MenuInterceptor();
//	}
	
	// new를 통해 Interceptor 객체를 만들어 등록하면 Spring Container에서 관리하지 못함
    @Autowired
    private MenuInterceptor menuInterceptor;
    
	@Override
	public void addInterceptors(InterceptorRegistry registry) {		
		List<String> ADD_PATHS = new ArrayList<>();
		List<MenuVo> menuList = menuService.selectMenuUse(new MenuVo());
		for (MenuVo menu : menuList) {
			ADD_PATHS.add(menu.getMenuUrl());
		}
		
		registry.addInterceptor(menuInterceptor)
			.addPathPatterns(ADD_PATHS);
	}
	
}
