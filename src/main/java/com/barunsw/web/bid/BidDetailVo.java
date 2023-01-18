package com.barunsw.web.bid;

public class BidDetailVo {
	private String bidNo;  // 공고번호-차수
	private String eMethod; // 예가방법
	private String openYn; // 추첨번호공개여부
	private String amount; // 사업금액
	private String presumedValue; // 추정가격
	private String budget; // 예산
	private String limitedRegion; // 지역제한
	private String possibleRegion; // 참가가능 지역
	private String biddingStrategyYn;// 지사투찰허용여부
	
	private String crawlingDate;
	
	public BidDetailVo() {}

	public BidDetailVo(String bidNo, String eMethod, String openYn, String amount, String presumedValue, String budget) {
		this.bidNo = bidNo;
		this.eMethod = eMethod;
		this.openYn = openYn;
		this.amount = amount;
		this.presumedValue = presumedValue;
		this.budget = budget;
	}

	public BidDetailVo(String bidNo, String eMethod, String openYn, String amount, String presumedValue, String budget,
			String limitedRegion, String possibleRegion, String biddingStrategyYn, String crawlingDate) {
		this.bidNo = bidNo;
		this.eMethod = eMethod;
		this.openYn = openYn;
		this.amount = amount;
		this.presumedValue = presumedValue;
		this.budget = budget;
		this.limitedRegion = limitedRegion;
		this.possibleRegion = possibleRegion;
		this.biddingStrategyYn = biddingStrategyYn;
		this.crawlingDate = crawlingDate;
	}

	public String getBidNo() {
		return bidNo;
	}

	public void setBidNo(String bidNo) {
		this.bidNo = bidNo;
	}

	public String geteMethod() {
		return eMethod;
	}

	public void seteMethod(String eMethod) {
		this.eMethod = eMethod;
	}

	public String getOpenYn() {
		return openYn;
	}

	public void setOpenYn(String openYn) {
		this.openYn = openYn;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getPresumedValue() {
		return presumedValue;
	}

	public void setPresumedValue(String presumedValue) {
		this.presumedValue = presumedValue;
	}

	public String getBudget() {
		return budget;
	}

	public void setBudget(String budget) {
		this.budget = budget;
	}

	public String getLimitedRegion() {
		return limitedRegion;
	}

	public void setLimitedRegion(String limitedRegion) {
		this.limitedRegion = limitedRegion;
	}

	public String getPossibleRegion() {
		return possibleRegion;
	}

	public void setPossibleRegion(String possibleRegion) {
		this.possibleRegion = possibleRegion;
	}

	public String getBiddingStrategyYn() {
		return biddingStrategyYn;
	}

	public void setBiddingStrategyYn(String biddingStrategyYn) {
		this.biddingStrategyYn = biddingStrategyYn;
	}

	@Override
	public String toString() {
		return "BidDetailVo [bidNo=" + bidNo + ", eMethod=" + eMethod + ", openYn=" + openYn + ", amount=" + amount
				+ ", presumedValue=" + presumedValue + ", budget=" + budget + ", limitedRegion=" + limitedRegion
				+ ", possibleRegion=" + possibleRegion + ", biddingStrategyYn=" + biddingStrategyYn + "]";
	}

	public String getCrawlingDate() {
		return crawlingDate;
	}

	public void setCrawlingDate(String crawlingDate) {
		this.crawlingDate = crawlingDate;
	}
	
}
