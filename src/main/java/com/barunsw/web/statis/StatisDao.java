package com.barunsw.web.statis;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StatisDao {

	public List<StatisVo> statisList(StatisVo authVo);
	public List<StatisVo> statisOne(StatisVo authVo);
		
}
