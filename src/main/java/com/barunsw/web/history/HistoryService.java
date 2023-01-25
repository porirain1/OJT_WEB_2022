package com.barunsw.web.history;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HistoryService {
	
	@Autowired
	private HistoryDao historyDao;
	
	public List<HistoryVo> selectHistoryList(HistoryVo historyVo) {
		return historyDao.selectHistoryList(historyVo);
	}	
	
	public List<HistoryVo> selectHistoryMenu(HistoryVo historyVo) {
		return historyDao.selectHistoryMenu(historyVo);
	}

	public int insertHistory(HistoryVo historyVo) {
		return historyDao.insertHistory(historyVo);
	}
	
	public int updateHistory(HistoryVo historyVo) {
		return historyDao.updateHistory(historyVo);
	}
	
	public int deleteHistory(HistoryVo historyVo) {
		return historyDao.deleteHistory(historyVo);		
	}
	
}