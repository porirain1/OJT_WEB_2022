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
	
	public ArrayList<HashMap<String, Object>> checkBoxData(StatisVo statisVo) {

		List<StatisVo> list = statisDao.statisList(statisVo);
		ArrayList<HashMap<String, Object>> checkBoxData = new ArrayList<HashMap<String, Object>>();
		
		for(int i = 0; i < list.size(); i++) {
			HashMap<String, Object> items = new HashMap<>();

			items.put("label",list.get(i).getAuthName());
			items.put("value",i);
			
			checkBoxData.add(items);
			System.out.println("items : "+items);
		}
		return checkBoxData;
	}
	
	public ArrayList<HashMap<String, Object>> chartData(StatisVo statisVo) {

		List<StatisVo> list = statisDao.statisList(statisVo);
		ArrayList<HashMap<String, Object>> chartData = new ArrayList<HashMap<String, Object>>();
		
		for(int i = 0; i < list.size(); i++) {
			HashMap<String, Object> items = new HashMap<>();

			items.put("권한 명",list.get(i).getAuthName());
			items.put(list.get(i).getAuthName() , list.get(i).getCount());
			
			chartData.add(items);
			System.out.println("items : "+items);
		}
		return chartData;
	}
	
	public ArrayList<HashMap<String, Object>> seriesData(StatisVo statisVo) {

		List<StatisVo> list = statisDao.statisList(statisVo);
		ArrayList<HashMap<String, Object>> seriesData = new ArrayList<HashMap<String, Object>>();
		
		for(int i = 0; i < list.size(); i++) {
			HashMap<String, Object> items = new HashMap<>();
			HashMap<String, Object> items2 = new HashMap<>();
			List series = new ArrayList();
			
			items.put("type","column");
			items.put("series", series);
			items2.put("dataField",list.get(i).getAuthName());
			items2.put("displayText",list.get(i).getAuthName());
			
			series.add(items2);
			seriesData.add(items);
			System.out.println("items : "+items);
		}
		return seriesData;
	}
}
