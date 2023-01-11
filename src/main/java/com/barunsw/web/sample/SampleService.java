package com.barunsw.web.sample;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SampleService {
	
	@Autowired
	private SampleDao sampleDao;
	
	public List<Map<String, Object>> getSamleList(SampleVo sampleVo) {
		return sampleDao.getSamleList(sampleVo);
	}
}
