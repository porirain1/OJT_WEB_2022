package com.barunsw.web.statis;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisService {
	
	@Autowired
	private StatisDao statisDao;
	
	public List<StatisVo> statisList(StatisVo statisVo) {	
		
		return statisDao.statisList(statisVo);
	}
	
	public List<StatisVo> checkBoxData() {
		
//		ArrayList<HashMap<String, Object>> checkBoxData = new ArrayList<HashMap<String, Object>>();
//		
//		for(int i = 0; i < list.size(); i++) {
//			HashMap<String, Object> items = new HashMap<>();
//
//			items.put("label", list.get(i).getAuthName());
//			items.put("value", i);
//			
//			checkBoxData.add(items);
//			String.format("items :  %s", items);
//		}
		return statisDao.statisList(new StatisVo());
	}
	
	public List<HashMap<String, Object>> chartData(StatisVo statisVo) {

		List<StatisVo> list = statisDao.statisList(statisVo);
		List<HashMap<String, Object>> chartData = new ArrayList<HashMap<String, Object>>();
		
		for(int i = 0; i < list.size(); i++) {
			HashMap<String, Object> items = new HashMap<>();

			items.put("권한 명",list.get(i).getAuthName());
			items.put(list.get(i).getAuthName() , list.get(i).getCount());
			
			chartData.add(items);
			String.format("items : %s", items);
		}
		
		return chartData;
	}
	
	public List<HashMap<String, Object>> seriesData(StatisVo statisVo) {

		List<StatisVo> list = statisDao.statisList(statisVo);
		List<HashMap<String, Object>> seriesData = new ArrayList<HashMap<String, Object>>();
		
		for(int i = 0; i < list.size(); i++) {
			HashMap<String, Object> oneSeries = new HashMap<>();
			
			HashMap<String, Object> option = new HashMap<>();
			option.put("dataField",list.get(i).getAuthName());
			option.put("displayText",list.get(i).getAuthName());
			
			List series = new ArrayList();
			series.add(option);
			
			oneSeries.put("type","column");
			oneSeries.put("series", series);
			
			seriesData.add(oneSeries);
			String.format("oneSeries : %s", oneSeries);
		}
		
		return seriesData;
	}
}
