package com.barunsw.web.auth;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class AuthVo {
	private int authId;
	private String authName;
	private String userId;
	private String userName;
	
	public AuthVo () {}
	
	public AuthVo(int authId, String authName, String userId, String userName) {
		this.authId = authId;
		this.authName = authName;
		this.userId = userId;
		this.userName = userName;
	}
		
	public int getAuthId() {
		return authId;
	}

	public void setAuthId(int authId) {
		this.authId = authId;
	}

	public String getAuthName() {
		return authName;
	}

	public void setAuthName(String authName) {
		this.authName = authName;
	}	

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

}
