package com.barunsw.web.statis;

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
		return statisList;
	}
	
	@RequestMapping(value = "/get/checkBoxData", method = RequestMethod.GET)
	public @ResponseBody List<StatisVo> getCheckBoxData() {
		return statisService.checkBoxData();
	}
	
	@RequestMapping(value = "/get/chartData", method = RequestMethod.GET)
	public @ResponseBody List<HashMap<String, Object>> getChartData() {
//		List<HashMap<String, Object>>  chartData = statisService.chartData(new StatisVo());
//		System.out.println("chartData : " + chartData);
		return statisService.chartData(new StatisVo());
	}
	
	@RequestMapping(value = "/get/seriesData", method = RequestMethod.GET)
	public @ResponseBody List<HashMap<String, Object>> getSeriesData() { 
		//System.out.println("SeriesData : " + seriesData);
		return statisService.seriesData(new StatisVo());
	}
	
	/*	@RequestMapping(value = "/get/one", method = RequestMethod.GET)
	public @ResponseBody List<StatisVo> getOne(StatisVo param) {
		List<StatisVo> statisOne = statisService.statisOne(param);
		return statisOne;
	}*/
}
