package com.barunsw.web.constants;

public class BidConstants {
	public static final int BID_HEADER_SIZE	= 8;
	
	public static final int CRAWLING_TD_BID_JOB 		= 0;
	public static final int CRAWLING_TD_BID_NO 			= 1;
	public static final int CRAWLING_TD_BID_TYPE 		= 2;
	public static final int CRAWLING_TD_BID_NAME 		= 3;
	public static final int CRAWLING_TD_BID_ORG 		= 4;
	public static final int CRAWLING_TD_DEMAND_ORG 		= 5;
	public static final int CRAWLING_TD_CONTACT 		= 6;
	public static final int CRAWLING_TD_REG_DATE 		= 7;
	public static final int CRAWLING_TD_BID_END_DATE 	= 7;
	
	//{추첨번호공개여부=비공개, 예가방법=복수예가 : 4 (추첨예가) / 15 (총예가), 사업금액 (추정가격 + 부가세)=50,000,000원, 추정가격=45,454,545원, 배정예산=50,000,000원}
	public static final String CRAWLING_DETAIL_TD_E_METHOD 			= "예가방법";
	public static final String CRAWLING_DETAIL_TD_OPEN_YN 			= "추첨번호공개여부";
	public static final String CRAWLING_DETAIL_TD_AMOUNT 			= "사업금액 (추정가격 + 부가세)"; 
	public static final String CRAWLING_DETAIL_TD_PRESUMED_VALUE 	= "추정가격";
	public static final String CRAWLING_DETAIL_TD_BUDGET			= "배정예산";
	
	// {업종제한=공고서 참조, 지사투찰허용여부=지사투찰불허, 과업설명 제한여부=참가제한안함, 공동수급체 구성원 지역제한적용여부=공고서에 의함, 지역제한=투찰제한, 참가가능지역=[경상남도 양산시]}
	public static final String CRAWLING_DETAIL_TD_LIMITED_REGION		= "지역제한"; 
	public static final String CRAWLING_DETAIL_TD_POSSIBLE_REGION		= "참가가능지역"; 
	public static final String CRAWLING_DETAIL_TD_BIDDING_STRATEGY_YN	= "지사투찰허용여부";
	
}
