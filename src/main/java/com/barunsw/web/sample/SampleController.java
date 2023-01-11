package com.barunsw.web.sample;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/sample")
public class SampleController {
	
	@RequestMapping(value="/index", method = RequestMethod.GET)
	public String main() {
		return "/sample/index";
	}
}
