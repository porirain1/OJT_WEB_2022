package com.barunsw.web.sample;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SampleDao {

	public List<Map<String, Object>> getSamleList(SampleVo sampleVo);
}
