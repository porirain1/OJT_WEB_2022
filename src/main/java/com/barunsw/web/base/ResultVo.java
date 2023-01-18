package com.barunsw.web.base;

import java.util.HashMap;

public class ResultVo extends HashMap<String, Object> {

	private static final long serialVersionUID = 6777310599187225992L;

	public void setResult(String result) {
		super.put("result", result);
	}
	
	public void setReason(String reason) {
		super.put("reason", reason);
	}
	
	public Object put(String key, Object value) {
		return super.put(key, value);
	}
	
}
