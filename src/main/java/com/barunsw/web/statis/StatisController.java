package com.barunsw.web.statis;

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
	public @ResponseBody List<StatisVo> get(StatisVo param) {
		List<StatisVo> statisList = statisService.statisList(new StatisVo());
		return statisList;
	}
	
	/*	@RequestMapping(value = "/get/one", method = RequestMethod.GET)
	public @ResponseBody List<StatisVo> getOne(StatisVo param) {
		List<StatisVo> statisOne = statisService.statisOne(param);
		return statisOne;
	}*/
}