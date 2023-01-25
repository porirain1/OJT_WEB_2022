package com.barunsw.web.code;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class CodeVo {
	
	private int codeId;
	private int parentCodeId;
	private String codeName;
	private String codeInfo;
	private String useYn;

	public CodeVo() {}

	public CodeVo(int codeId, int parentCodeId, String codeName, String codeInfo, String useYn) {
		this.codeId = codeId;
		this.parentCodeId = parentCodeId;
		this.codeName = codeName;
		this.codeInfo = codeInfo;
		this.useYn = useYn;
	}

	public int getCodeId() {
		return codeId;
	}

	public void setCodeId(int codeId) {
		this.codeId = codeId;
	}

	public int getParentCodeId() {
		return parentCodeId;
	}

	public void setParentCodeId(int parentCodeId) {
		this.parentCodeId = parentCodeId;
	}

	public String getCodeName() {
		return codeName;
	}

	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}

	public String getCodeInfo() {
		return codeInfo;
	}

	public void setCodeInfo(String codeInfo) {
		this.codeInfo = codeInfo;
	}

	public String getUseYn() {
		return useYn;
	}

	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

	@Override
	public String toString() {
	  return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}
	
}
