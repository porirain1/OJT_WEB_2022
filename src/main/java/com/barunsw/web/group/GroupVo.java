package com.barunsw.web.group;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class GroupVo {
	
	private int groupId;
	private int parentGroupId;
	private String groupName;
	
	public GroupVo() {}
	
	public GroupVo(int groupId, int parentGroupId, String groupName) {
		this.groupId = groupId;
		this.parentGroupId = parentGroupId;
		this.groupName = groupName;
	}

	public int getGroupId() {
		return groupId;
	}
	
	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}
	
	public int getParentGroupId() {
		return parentGroupId;
	}
	
	public void setParentGroupId(int parentGroupId) {
		this.parentGroupId = parentGroupId;
	}
	
	public String getGroupName() {
		return groupName;
	}
	
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	
	@Override
	public String toString() {
	  return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}
	
}
