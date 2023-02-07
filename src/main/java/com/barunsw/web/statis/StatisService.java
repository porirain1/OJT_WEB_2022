package com.barunsw.web.statis;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisService {
	
	@Autowired
	private StatisDao statisDao;
	
	public List<StatisVo> statisList(StatisVo authVo) {			
		return statisDao.statisList(authVo);
	}
	
	public List<StatisVo> statisOne(StatisVo authVo) {			
		return statisDao.statisOne(authVo);
	}
	
}
