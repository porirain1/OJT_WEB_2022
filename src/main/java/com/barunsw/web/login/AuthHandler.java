package com.barunsw.web.login;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.stereotype.Component;

import com.barunsw.web.constants.CommonConstants;
import com.barunsw.web.user.UserVo;


@Component
public class AuthHandler implements AuthenticationSuccessHandler, AuthenticationFailureHandler, LogoutSuccessHandler {
	private static final Logger logger = LogManager.getLogger(AuthHandler.class);

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		UserVo userVo = (UserVo) authentication.getDetails();
		request.getSession().setAttribute(CommonConstants.USER_VO, userVo);
		response.sendRedirect("/dashboard");
	}

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		
		if ( exception instanceof SessionAuthenticationException ) {
			responseWriteMessage(request, response, "다른 PC에서 로그인한 계정입니다. 로그아웃 후 로그인하세요.", "/login");
		}
		else {
			logger.error(exception.getMessage(), exception);
			responseWriteMessage(request, response, "로그인에 실패했습니다. 관리자에게 문의하세요.", "/login");
		}
	}

	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		response.sendRedirect(String.format("%s/login", request.getContextPath()));
	}

	private void responseWriteMessage(final HttpServletRequest request, final HttpServletResponse response, final String message, String returnUrl) {
		returnUrl = request.getContextPath() + returnUrl;

		try {
			StringBuffer html = new StringBuffer();
			html.append("<html><head>");
			html.append("<title>JMS</title>");
			html.append("<script type='text/javascript'>");
			html.append(" alert(\"");
			html.append(message);
			html.append(" \"); ");
			html.append("location.href='" + returnUrl + "';");
			html.append("</script></head>");
			html.append("<body></body></html>");

			response.setContentType("text/html;charset=UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.getOutputStream().write(html.toString().getBytes("UTF-8"));

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
