package com.barunsw.web.statis;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.barunsw.web.auth.AuthVo;

public class StatisVo extends AuthVo {
	private int count;
	private String label;
	private int value;
	private String dataField;
	private String displayText;
	
	public StatisVo () {}
		
	public StatisVo(int count) {
		this.count = count;
	}
		
	public int getCount() {
		return count;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}
	
	public String getDataField() {
		return dataField;
	}
	
	public void setDataField(String dataField) {
		this.dataField = dataField;
	}
	
	public String getDisplayText() {
		return displayText;
	}
	
	public void setDisPlayText(String displayText) {
		this.displayText = displayText;
	}
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}

}
