package com.barunsw.web.base;

import com.barunsw.web.utils.StringUtil;

public class PageVo {
	private long pagenum;
	private long pagesize;
	private long recordstartindex;
	private long recordendindex;
	private String sortdatafield;
	private String sortorder;
	private boolean isExcelDownload;
	
	public long getPagenum() {
		return pagenum;
	}

	public void setPagenum(long pagenum) {
		this.pagenum = pagenum;
	}

	public long getPagesize() {
		return pagesize;
	}

	public void setPagesize(long pagesize) {
		this.pagesize = pagesize;
	}
	
	public long getRecordendindex() {
		return recordendindex;
	}

	public void setRecordendindex(long recordendindex) {
		this.recordendindex = recordendindex;
	}

	public long getRecordstartindex() {
		return recordstartindex;
	}

	public void setRecordstartindex(long recordstartindex) {
		this.recordstartindex = recordstartindex;
	}

	public String getSortdatafield() {
		if ( sortdatafield != null ) {
			// 데이터 정렬 필드 DB 컬럼명 방식과 같아지도록
			sortdatafield = StringUtil.camelToDbStyle(sortdatafield);
		}
		return sortdatafield;
	}

	public void setSortdatafield(String sortdatafield) {
		this.sortdatafield = sortdatafield;
	}

	public String getSortorder() {
		return sortorder;
	}

	public void setSortorder(String sortorder) {
		this.sortorder = sortorder;
	}

	public boolean getIsExcelDownload() {
		return isExcelDownload;
	}

	public void setIsExcelDownload(boolean isExcelDownload) {
		this.isExcelDownload = isExcelDownload;
	}
	
}