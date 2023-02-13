package com.barunsw.web.statis;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/statis")
public class StatisController {
	
	@Autowired
	private StatisService statisService;

	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String statisIndex() {
		//System.out.println("select auth \n"+ authService.authList(new AuthVo()));
		return "/statis/list";
	}
	
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public @ResponseBody List<StatisVo> get() {
		List<StatisVo> statisList = statisService.statisList(new StatisVo());
		//System.out.println("param : " + param);		
		return statisList;
	}
	
	@RequestMapping(value = "/get/checkBoxData", method = RequestMethod.GET)
	public @ResponseBody ArrayList<HashMap<String, Object>> getCheckBoxData() {
		ArrayList<HashMap<String, Object>>  checkBoxData = statisService.checkBoxData(null);
		//System.out.println("param : " + param);		
		System.out.println("checkBoxData : " + checkBoxData);
		return checkBoxData;
	}
	
	@RequestMapping(value = "/get/chartData", method = RequestMethod.GET)
	public @ResponseBody ArrayList<HashMap<String, Object>> getChartData() {
		ArrayList<HashMap<String, Object>>  chartData = statisService.chartData(null);
		//System.out.println("param : " + param);		
		System.out.println("chartData : " + chartData);
		return chartData;
	}
	
	@RequestMapping(value = "/get/seriesData", method = RequestMethod.GET)
	public @ResponseBody ArrayList<HashMap<String, Object>> getSeriesData() {
		ArrayList<HashMap<String, Object>>  seriesData = statisService.seriesData(null);
		//System.out.println("param : " + param);		
		System.out.println("SeriesData : " + seriesData);
		return seriesData;
	}
	
	/*	@RequestMapping(value = "/get/one", method = RequestMethod.GET)
	public @ResponseBody List<StatisVo> getOne(StatisVo param) {
		List<StatisVo> statisOne = statisService.statisOne(param);
		return statisOne;
	}*/
}
