package com.barunsw.web.statis;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class StatisVo {
	private String authId;
	private String authName;
	private int count;
	
	public StatisVo () {}
	
	public StatisVo(String authId, String authName, int count) {
		this.authId = authId;
		this.authName = authName;
		this.count = count;
	}
		
	public String getAuthId() {
		return authId;
	}

	public void setAuthId(String authId) {
		this.authId = authId;
	}

	public String getAuthName() {
		return authName;
	}

	public void setAuthName(String authName) {
		this.authName = authName;
	}	

	public int getCount() {
		return count;
	}
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}

}
