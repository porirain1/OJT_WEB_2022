package com.barunsw.web.main;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
	
	@GetMapping("/")
	public String index() {
		return "/index";
	}
	
	@GetMapping("/dashboard")
	public String dashboard() {
		return "/main/index";
	}
}
