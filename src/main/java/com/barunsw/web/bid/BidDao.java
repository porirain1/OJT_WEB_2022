package com.barunsw.web.bid;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BidDao {
	public long getBidListCount(BidVo param);
	public List<BidVo> getBidList(BidVo param);
	public int insertBidList(List<BidVo> list);
	public int insertBidDetailList(List<BidDetailVo> list);
	public BidVo getBidOne(BidVo bidVo);
	public BidDetailVo getBidDetailOne(BidDetailVo bidDetailVo);
}
