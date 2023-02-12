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
	
	public ArrayList<HashMap<String, String>> checkBoxData(StatisVo statisVo) {

		List<StatisVo> list = statisDao.statisList(statisVo);
		ArrayList<HashMap<String, String>> checkBoxData = new ArrayList<HashMap<String, String>>();
		
		for(int i = 0; i < list.size(); i++) {
			HashMap<String, String> items = new HashMap<>();

			items.put("label",list.get(i).getAuthName());
			items.put("value",String.valueOf(i));
			
			checkBoxData.add(items);
			System.out.println("items : "+items);
		}
		return checkBoxData;
	}
	
	public ArrayList<HashMap<String, String>> chartData(StatisVo statisVo) {

		List<StatisVo> list = statisDao.statisList(statisVo);
		ArrayList<HashMap<String, String>> chartData = new ArrayList<HashMap<String, String>>();
		
		for(int i = 0; i < list.size(); i++) {
			HashMap<String, String> items = new HashMap<>();

			items.put("권한 명",list.get(i).getAuthName());
			items.put(list.get(i).getAuthName() ,String.valueOf(list.get(i).getCount()));
			
			chartData.add(items);
			System.out.println("items : "+items);
		}
		
		return chartData;
	}
}
