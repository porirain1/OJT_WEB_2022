package com.barunsw.web.history;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class HistoryVo {
	
	private String historyNow;
	private int historyCount;
	private String historyIp;
	private String historyMenu;
	private String menuUrl;
	
	public HistoryVo() {}
	
	public HistoryVo(String historyNow, int historyCount, String historyIp, String historyMenu, String menuUrl) {
		this.historyNow = historyNow;
		this.historyCount = historyCount;
		this.historyIp = historyIp;
		this.historyMenu = historyMenu;
		this.menuUrl = menuUrl;
	}

	public String getHistoryNow() {
		return historyNow;
	}

	public void setHistoryNow(String historyNow) {
		this.historyNow = historyNow;
	}

	public int getHistoryCount() {
		return historyCount;
	}

	public void setHistoryCount(int historyCount) {
		this.historyCount = historyCount;
	}

	public String getHistoryIp() {
		return historyIp;
	}

	public void setHistoryIp(String historyIp) {
		this.historyIp = historyIp;
	}

	public String getHistoryMenu() {
		return historyMenu;
	}

	public void setHistoryMenu(String historyMenu) {
		this.historyMenu = historyMenu;
	}

	public String getMenuUrl() {
		return menuUrl;
	}

	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}

	@Override
	public String toString() {
	  return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}
	
}