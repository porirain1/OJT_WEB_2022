package com.barunsw.web.bid;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.barunsw.web.base.PageVo;

public class BidVo extends PageVo {
	private String bidJob; // 업무
	private String bidNo;  // 공고번호-차수
	private String bidType; // 분류
	private String bidName; // 공고명
	private String bidOrg;  // 공고기관
	private String demandOrg; // 수요기관
	private String contact;  // 계약방법
	private String regDate;  // 입력일시
	private String bidEndDate; // 입찰마감일시
	private String crawlingDate;
	
	private String detailUrl; // 상세페이지
	
	public BidVo() {}
	
	public BidVo(String bidJob, String bidNo, String bidType, String bidName, String bidOrg, String demandOrg,
			String contact, String regDate, String bidEndDate, String detailUrl) {
		super();
		this.bidJob = bidJob;
		this.bidNo = bidNo;
		this.bidType = bidType;
		this.bidName = bidName;
		this.bidOrg = bidOrg;
		this.demandOrg = demandOrg;
		this.contact = contact;
		this.regDate = regDate;
		this.bidEndDate = bidEndDate;
		this.detailUrl = detailUrl;
	}
	
	public BidVo(String bidJob, String bidNo, String bidType, String bidName, String bidOrg, String demandOrg,
			String contact, String regDate, String bidEndDate, String crawlingDate, String detailUrl) {
		super();
		this.bidJob = bidJob;
		this.bidNo = bidNo;
		this.bidType = bidType;
		this.bidName = bidName;
		this.bidOrg = bidOrg;
		this.demandOrg = demandOrg;
		this.contact = contact;
		this.regDate = regDate;
		this.bidEndDate = bidEndDate;
		this.crawlingDate = crawlingDate;
		this.detailUrl = detailUrl;
	}
	public String getBidJob() {
		return bidJob;
	}
	public void setBidJob(String bidJob) {
		this.bidJob = bidJob;
	}
	public String getBidNo() {
		return bidNo;
	}
	public void setBidNo(String bidNo) {
		this.bidNo = bidNo;
	}
	public String getBidType() {
		return bidType;
	}
	public void setBidType(String bidType) {
		this.bidType = bidType;
	}
	public String getBidName() {
		return bidName;
	}
	public void setBidName(String bidName) {
		this.bidName = bidName;
	}
	public String getBidOrg() {
		return bidOrg;
	}
	public void setBidOrg(String bidOrg) {
		this.bidOrg = bidOrg;
	}
	public String getDemandOrg() {
		return demandOrg;
	}
	public void setDemandOrg(String demandOrg) {
		this.demandOrg = demandOrg;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getBidEndDate() {
		return bidEndDate;
	}
	public void setBidEndDate(String bidEndDate) {
		this.bidEndDate = bidEndDate;
	}
	public String getDetailUrl() {
		return detailUrl;
	}
	public void setDetailUrl(String detailUrl) {
		this.detailUrl = detailUrl;
	}
	
	public String getCrawlingDate() {
		return crawlingDate;
	}
	public void setCrawlingDate(String crawlingDate) {
		this.crawlingDate = crawlingDate;
	}
	
	@Override
	public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
    }   
}
