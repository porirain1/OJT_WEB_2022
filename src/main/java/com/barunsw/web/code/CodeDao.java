package com.barunsw.web.code;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CodeDao {
	public List<CodeVo> selectCodeList(CodeVo codeVo);
	public CodeVo selectCodeOne(CodeVo codeVo);
	public int insertCode(CodeVo codeVo);
	public int updateCode(CodeVo codeVo);
	public int deleteCode(CodeVo codeVo);
}
