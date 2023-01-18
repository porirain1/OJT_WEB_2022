package com.barunsw.web.bid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BidService {
	
	@Autowired
	private BidDao bidDao;
	
	public long getBidListCount(BidVo param) {
		return bidDao.getBidListCount(param);
	}
	
	public BidVo getBidOne(BidVo bidVo) {
		return bidDao.getBidOne(bidVo);
	}
	
	public List<BidVo> getBidList(BidVo bidVo) {
		return bidDao.getBidList(bidVo);
	}
	
	public int insertBidList(List<BidVo> list) {
		return bidDao.insertBidList(list);
	}
	
	public int insertBidDetailList(List<BidDetailVo> list) {
		return bidDao.insertBidDetailList(list);
	}

	public BidDetailVo getBidDetailOne(BidDetailVo bidDetailVo) {
		return bidDao.getBidDetailOne(bidDetailVo);
	}
}
