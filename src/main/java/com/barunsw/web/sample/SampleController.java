package com.barunsw.web.sample;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/sample")
public class SampleController {
	
	@Autowired
	private SampleService sampleService;
	
	@RequestMapping(value="/index", method = RequestMethod.GET)
	public String main(Model model) {
		System.out.println(sampleService.getSamleList(new SampleVo()));
		return "/sample/index";
	}
}
