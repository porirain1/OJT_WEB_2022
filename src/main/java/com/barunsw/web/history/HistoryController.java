package com.barunsw.web.history;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/history")
public class HistoryController {
	
	@Autowired
	private HistoryService historyService;
		
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public String index() {
		return "/history/list";
	}
	
	@RequestMapping(value="/data", method = RequestMethod.GET)
	@ResponseBody
	public List<HistoryVo> data() {
		List<HistoryVo> historyList = historyService.selectHistoryList(new HistoryVo());		
		return historyList;
	}
	
	@RequestMapping(value="/menu", method = RequestMethod.GET)
	@ResponseBody
	public List<HistoryVo> menu() {
		List<HistoryVo> historyList = historyService.selectHistoryMenu(new HistoryVo());		
		return historyList;
	}
	
	@RequestMapping(value="/insert", method = RequestMethod.POST)
	public @ResponseBody HistoryVo insert(@RequestBody HistoryVo history) {
		historyService.insertHistory(history);
		return history;
	}
	
	@RequestMapping(value="/update", method = RequestMethod.POST)
	public @ResponseBody HistoryVo update(@RequestBody HistoryVo history) {
		historyService.updateHistory(history);
		return history;
	}
	
	@RequestMapping(value="/delete", method = RequestMethod.GET)
	@ResponseBody
	public HistoryVo delete(HistoryVo history) {
		historyService.deleteHistory(history);
		return history;
	}
	
}
