package com.barunsw.web.statis;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StatisDao {

	public List<StatisVo> statisList(StatisVo statisVo);
		
}
