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

@Component
public class MenuInterceptor extends HandlerInterceptorAdapter {

	private static final Logger logger = LogManager.getLogger(MenuInterceptor.class);

	@Autowired
	private HistoryService historyService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		System.out.println("=== START ===");
		historyInsert(request);
		return super.preHandle(request, response, handler);
		//return false; // Controller 접근 못함
		//return true;// Controller 로 접근 가능
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		System.out.println("=== END ===");
		super.postHandle(request, response, handler, modelAndView);
	}	
	
	private void historyInsert(HttpServletRequest request) {
		String menu = request.getRequestURI().split("/")[1];

		// menuService 호출하여 저장된 메뉴인지 확인 하고, 저장되었다면 해당 menu 정보로 수집한다.
		HistoryVo historyVo = new HistoryVo(); 
		historyVo.setHistoryIp(request.getRemoteAddr());
		historyVo.setHistoryMenu(getMenu(menu));// db 저장된 메뉴 정보
		historyVo.setMenuUrl(request.getRequestURI());// db 저장된 메뉴 정보
		historyService.insertHistory(historyVo); 
		
		logger.info("{}", historyVo);
	}
	
	private String getMenu(String menu) {
		switch(menu) {
		case "user":
			return "사용자 관리";
		case "group":
			return "그룹 관리";
		case "menu":
			return "메뉴 관리";
		case "auth":
			return "권한 관리";
		case "code":
			return "코드 관리";
		case "board":
			return "이력 조회";
		case "history":
			return "통계 조회";
		case "bid":
			return "나라 시장";
		default:
			return null;
		}
	}
}
