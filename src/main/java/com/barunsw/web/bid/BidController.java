package com.barunsw.web.bid;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.barunsw.web.base.ResultVo;

@Controller
@RequestMapping("/bid")
public class BidController {
	
	private static final Logger logger = LogManager.getLogger(BidController.class);
	
	@Autowired
	private BidService bidService;
	
	@RequestMapping(value="/index", method = RequestMethod.GET)
	public String index(Model model) {
		//System.out.println(sampleService.getSamleList(new BidVo()));
		return "/bid/index";
	}
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public @ResponseBody ResultVo list(BidVo param) {
		logger.info("param: {}", param);
		ResultVo result = new ResultVo();
		
		long totalCount		= bidService.getBidListCount(param);
		List<BidVo> bidList = bidService.getBidList(param);
		
		result.put("bidList", bidList);
		result.put("totalCount", totalCount);
		
		return result;
	}
	
	@RequestMapping(value="/get", method = RequestMethod.GET)
	public @ResponseBody BidVo get(BidVo param) {
		return param;
	}
	
	@RequestMapping(value="/post", method = RequestMethod.POST)
	public @ResponseBody BidVo post(@RequestBody BidVo param) {
		return param;
	}
}
