package com.barunsw.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.barunsw.web.history.HistoryService;
import com.barunsw.web.history.HistoryVo;
import com.barunsw.web.menu.MenuService;
import com.barunsw.web.menu.MenuVo;

@Component
public class MenuInterceptor extends HandlerInterceptorAdapter {

	private static final Logger logger = LogManager.getLogger(MenuInterceptor.class);

	@Autowired
	private HistoryService historyService;
	@Autowired
	private MenuService menuService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		logger.debug("=== START ===");
		historyInsert(request);
		return super.preHandle(request, response, handler);
		//return false; // Controller 접근 못함
		//return true;// Controller 로 접근 가능
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		logger.debug("=== END ===");
		super.postHandle(request, response, handler, modelAndView);
	}	
	
	private void historyInsert(HttpServletRequest request) {	
		MenuVo selectMenu = new MenuVo();
		selectMenu.setMenuUrl(request.getRequestURI());
		MenuVo oneMenu = menuService.selectMenuOne(selectMenu);
		
		HistoryVo historyVo = new HistoryVo(); 
		historyVo.setHistoryIp(request.getRemoteAddr());
		historyVo.setHistoryMenu(oneMenu.getMenuName());// db 저장된 메뉴 정보
		historyVo.setMenuUrl(oneMenu.getMenuUrl());// db 저장된 메뉴 정보
		historyService.insertHistory(historyVo); 
	}
}
