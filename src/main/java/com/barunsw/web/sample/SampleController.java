package com.barunsw.web.sample;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/sample")
public class SampleController {
	
	@Autowired
	private SampleService sampleService;
	
	@RequestMapping(value="/index", method = RequestMethod.GET)
	public String main(Model model) {
		//System.out.println(sampleService.getSamleList(new SampleVo()));
		return "/sample/index";
	}
	
	@RequestMapping(value="/detail", method = RequestMethod.GET)
	public String detail(Model model) {
		
		return "/sample/detail";
	}
	
	@RequestMapping(value="/get", method = RequestMethod.GET)
	public @ResponseBody SampleVo get(SampleVo param) {
		System.out.println(param.getName());
		param.setAge("30");
		return param;
	}
	
	@RequestMapping(value="/post", method = RequestMethod.POST)
	public @ResponseBody SampleVo post(@RequestBody SampleVo param) {
		System.out.println(param.getName());
		param.setAge("30");
		return param;
	}
}
