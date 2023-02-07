package com.barunsw.web.history;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class HistoryVo {
	
	private String mode;
	private String fromDate;
	private String toDate;
	private int historyCount;
	private String historyNow;
	private String historyIp;
	private String historyMenu;
	private String menuUrl;
	
	public HistoryVo() {}
	
	public HistoryVo(String mode, String fromDate, String toDate, int historyCount, String historyNow, String historyIp,
			String historyMenu, String menuUrl) {
		this.mode = mode;
		this.fromDate = fromDate;
		this.toDate = toDate;
		this.historyCount = historyCount;
		this.historyNow = historyNow;
		this.historyIp = historyIp;
		this.historyMenu = historyMenu;
		this.menuUrl = menuUrl;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public int getHistoryCount() {
		return historyCount;
	}
	
	public void setHistoryCount(int historyCount) {
		this.historyCount = historyCount;
	}

	public String getHistoryNow() {
		return historyNow;
	}

	public void setHistoryNow(String historyNow) {
		this.historyNow = historyNow;
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