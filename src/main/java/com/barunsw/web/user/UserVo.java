package com.barunsw.web.user;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class UserVo {
	private int userNum;
	private String userId;
	private String userPasswd;
	private String userName;
	private String userEmail;
	private String userAddress;
	
	public UserVo () {}
	
	public UserVo(String userId, String userPasswd) {
		this.userId = userId;
		this.userPasswd = userPasswd;
	}
	
	public UserVo(int userNum, String userId, String userPasswd,
					String userName, String userEmail, String userAddress) {
		this.userNum		= userNum;
		this.userId 		= userId;
		this.userPasswd 	= userPasswd;
		this.userName 		= userName;
		this.userEmail 	= userEmail;
		this.userAddress 	= userAddress;
	}

	public int getuserNum() {
		return userNum;
	}

	public void setuserNum(int userNum) {
		this.userNum = userNum;
	}

	public String getuserId() {
		return userId;
	}

	public void setuserId(String userId) {
		this.userId = userId;
	}

	public String getuserPasswd() {
		return userPasswd;
	}

	public void setuserPasswd(String userPasswd) {
		this.userPasswd = userPasswd;
	}

	public String getuserName() {
		return userName;
	}

	public void setuserName(String userName) {
		this.userName = userName;
	}

	public String getuserEmail() {
		return userEmail;
	}

	public void setuserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getuserAddress() {
		return userAddress;
	}

	public void setuserAddress(String userAddress) {
		this.userAddress = userAddress;
	}
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

}
