package com.barunsw.web.code;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CodeService {
	
	@Autowired
	private CodeDao codeDao;
	
	public List<CodeVo> selectCodeList(CodeVo codeVo) {
		return codeDao.selectCodeList(codeVo);
	}	
	
	public CodeVo selectCodeOne(CodeVo codeVo) {
		return codeDao.selectCodeOne(codeVo);
	}
	
	public int insertCode(CodeVo codeVo) {
		return codeDao.insertCode(codeVo);
	}
	
	public int updateCode(CodeVo codeVo) {
		return codeDao.updateCode(codeVo);
	}
	
	public int deleteCode(CodeVo codeVo) {
		return codeDao.deleteCode(codeVo);		
	}
}
