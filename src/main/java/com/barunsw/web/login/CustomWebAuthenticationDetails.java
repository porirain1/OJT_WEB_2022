package com.barunsw.web.login;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.web.authentication.WebAuthenticationDetails;

public class CustomWebAuthenticationDetails extends WebAuthenticationDetails {

	private static final long serialVersionUID = -2880440929013475601L;

	private String userPasswd;
	
	public CustomWebAuthenticationDetails(HttpServletRequest request) {
		super(request);
		this.userPasswd = request.getParameter("password");
	}

	public String getUserPasswd() {
		return userPasswd;
	}

	public void setUserPasswd(String userPasswd) {
		this.userPasswd = userPasswd;
	}
	
}
