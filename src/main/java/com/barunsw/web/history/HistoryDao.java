package com.barunsw.web.history;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface HistoryDao {
	public List<HistoryVo> selectHistoryMenu(HistoryVo historyVo);
	public List<HistoryVo> selectHistoryList(HistoryVo historyVo);
	public int insertHistory(HistoryVo historyVo);
	public int updateHistory(HistoryVo historyVo);
	public int deleteHistory(HistoryVo historyVo);
}