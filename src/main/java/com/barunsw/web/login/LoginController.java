package com.barunsw.web.login;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.barunsw.web.constants.CommonConstants;
import com.barunsw.web.user.UserVo;

@Controller
public class LoginController  {

	@GetMapping(value = "/login")
	public String login(Model model, HttpServletRequest request) throws Exception {
		UserVo userInfo = (UserVo) request.getSession().getAttribute(CommonConstants.USER_VO);
		if ( userInfo != null ) {
			return "redirect:/main";
		}
		return "/login/index";
	}
}
