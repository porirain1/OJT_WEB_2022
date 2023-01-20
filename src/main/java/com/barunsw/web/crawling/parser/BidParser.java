package com.barunsw.web.crawling.parser;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.barunsw.web.bid.BidDetailVo;
import com.barunsw.web.bid.BidService;
import com.barunsw.web.bid.BidVo;
import com.barunsw.web.constants.BidConstants;

public class BidParser {
	private static final Logger logger = LogManager.getLogger(BidParser.class);
	private Random random = new Random();
	private final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy/MM/dd");
	private final SimpleDateFormat CHECK_DATE_FORMAT = new SimpleDateFormat("yyyyMMdd030000");
	
	private final String CURRENT_CRAWLING_DATE = CHECK_DATE_FORMAT.format(new Date());
	
	private final int MAX_LOOP_COUNT = 10000;
	
	private Pattern pattern = Pattern.compile("(.+)\\s\\((.+)\\)");
	
	private BidService bidService;
	
	public BidParser() {}
	
	public BidParser(BidService bidService) {
		this.bidService = bidService;
	}
	
	public void run(int currentPage) {
		
		Date toDate 		= Calendar.getInstance().getTime();
	    String toDateStr 	= DATE_FORMAT.format(toDate);
	    //Date fromDate 		= DateUtils.addMonths(toDate, -1); // 1개월
	    Date fromDate 		= DateUtils.addWeeks(toDate, -1);
	    String fromDateStr 	= DATE_FORMAT.format(fromDate);
	    /*  [taskClCds]
	    "":전체 , 1:물품 , 3:공사 , 5:용역 , 6:리스 , 2:외자 , 11:비축 , 4:기타 , 20:민간  
	    */
	    String taskClCds = "5";
	    
	    boolean isContinueCrawling = true;
	    
	    for ( int i = currentPage; i < MAX_LOOP_COUNT; i ++ ) {
	    	Set<String> checkBidNoList = new LinkedHashSet<String>();
	    	if ( !isContinueCrawling ) {
	    		logger.info("[Scheduler][naraCrawling] - Not Found NewData.");
	    		break;
	    	}
	    	
	    	
	    	logger.info("[Scheduler][naraCrawling] - {} page start!!!", currentPage);
	    	// https://www.g2b.go.kr:8101/ep/tbid/tbidList.do?area=&bidNm=&bidSearchType=1&currentPageNo=480&fromBidDt=2023%2F01%2F10&fromOpenBidDt=&instNm=&maxPageViewNoByWshan=999999&radOrgan=1&regYn=Y&searchDtType=1&searchType=1&taskClCds=5&toBidDt=2023%2F01%2F17&toOpenBidDt=&
		    String url = String.format("https://www.g2b.go.kr:8101/ep/tbid/tbidList.do?taskClCds=%s&bidNm=&searchDtType=1&fromBidDt=%s&toBidDt=%s&fromOpenBidDt=&toOpenBidDt=&radOrgan=1&instNm=&area=&regYn=Y&bidSearchType=1&searchType=1&maxPageViewNoByWshan=%s&currentPageNo=%s", taskClCds, fromDateStr, toDateStr, currentPage, currentPage);
			
			Document responseDocument = null;
			
			try {
				responseDocument = Jsoup.connect(url).get();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			if ( responseDocument == null ) {
				break;
			}
			
			if ( responseDocument.toString().contains("검색된 데이터가 없습니다.") ) {
				break;
			}

			List<BidVo> resultList = new ArrayList<BidVo>();
			List<BidDetailVo> resultDetailList = new ArrayList<BidDetailVo>();
			
			Elements targetRows = responseDocument.select(".results table tbody tr");
			for ( Element oneRow : targetRows ) {
				BidVo bidVo = parseListPage(oneRow);
				if ( bidVo != null ) {
					BidVo checkBidVo = bidService.getBidOne(bidVo);
					if ( checkBidVo != null ) { // 이전 페이지 수집때 저장 되었다가 다음 페이지로 밀리는 케이스
						checkBidNoList.add(checkBidVo.getBidNo());
						if ( checkBidVo.getCrawlingDate().compareTo(CURRENT_CRAWLING_DATE) < 0 ) {
							isContinueCrawling = false;
						}
					}
					else {
						resultList.add(bidVo);
					}
				}
			}
			
			for ( BidVo oneInfo : resultList ) {
				if ( checkBidNoList.contains(oneInfo.getBidNo())) { continue; }
				
				BidDetailVo bidDetailVo = parseDetailPage(oneInfo);
				if ( bidDetailVo != null ) {
					BidDetailVo checkBidVo = bidService.getBidDetailOne(bidDetailVo);
					if ( checkBidVo != null ) { // 기존에 저장되어있으면 스킵 (상세정보)
						continue;
					}

					resultDetailList.add(bidDetailVo);
				}
			}
			
			if ( !resultList.isEmpty() ) {
				try {
					bidService.insertBidList(resultList);
					logger.info("[Scheduler][naraCrawling] - List Insert Count : {}", resultList.size());
				}
				catch (Exception e) {
					logger.error(e.getMessage(), e);
					logger.info("Error List : {}", resultList);
				}
			}
			
			if ( !resultDetailList.isEmpty() ) {
				try {
					bidService.insertBidDetailList(resultDetailList);
					logger.info("[Scheduler][naraCrawling] - Detail Insert Count : {}", resultDetailList.size());
				}
				catch (Exception e) {
					logger.error(e.getMessage(), e);
					logger.info("Error List : {}", resultDetailList);
				}
			}
			
			int sleepSec = random.nextInt(10) + 1;
			
			logger.info("[Scheduler][naraCrawling] - {} page end!!!", currentPage);
			try {
				currentPage = currentPage + 1;
				Thread.sleep(sleepSec * 1000);
			} catch (InterruptedException e) {
				logger.info("InterruptedException Call. Crawling Stop!!!");
				break;
			}
			
	    }
	}
	
	private BidVo parseListPage(Element oneRow) {
	    Elements tdList = oneRow.select("td div");
	    
	    if ( tdList.size() >= BidConstants.BID_HEADER_SIZE ) {
	    	Matcher matcher = pattern.matcher(tdList.get(BidConstants.CRAWLING_TD_REG_DATE).text().trim());
	    	String regDate = "";
	    	String bidEndDate = "";
	    	
	    	if (matcher.find()) {
	    		regDate 	= matcher.group(1);
	    		bidEndDate 	= matcher.group(2);
	    	}
	    	
	    	BidVo bidVo = new BidVo(
		    	tdList.get(BidConstants.CRAWLING_TD_BID_JOB).html().trim()
		    	, tdList.get(BidConstants.CRAWLING_TD_BID_NO).select("a").text().trim()
		    	, tdList.get(BidConstants.CRAWLING_TD_BID_TYPE).text().trim()
		    	, tdList.get(BidConstants.CRAWLING_TD_BID_NAME).select("a").text().trim()
		    	, tdList.get(BidConstants.CRAWLING_TD_BID_ORG).text().trim()
		    	, tdList.get(BidConstants.CRAWLING_TD_DEMAND_ORG).text().trim()
		    	, tdList.get(BidConstants.CRAWLING_TD_CONTACT).text().trim()
		    	, regDate.replaceAll("[\\s|\\W]", "")
		    	, bidEndDate.replaceAll("[\\s|\\W]", "")
		    	, tdList.get(BidConstants.CRAWLING_TD_BID_NO).select("a").attr("href")
	    	);
	    	
	    	return bidVo;
	    }
	    return null;
	}
	
	private BidDetailVo parseDetailPage(BidVo bidVo) {
		if ( StringUtils.isNotBlank(bidVo.getDetailUrl()) ) {
			Document responseDocument = null;
			
			try {
				responseDocument = Jsoup.connect(bidVo.getDetailUrl()).get();
			} catch (IOException e) {
				e.printStackTrace();
			} 
			
			if ( responseDocument != null ) {
				Elements firstThList = responseDocument.select("table[summary=\"예정가격 결정 및 입찰금액 정보\"] tr > th");
				Elements firstTdList = responseDocument.select("table[summary=\"예정가격 결정 및 입찰금액 정보\"] tr > td > div");
				Elements secondThList = responseDocument.select("table[summary=\"투찰제한 - 일반\"] tr > th");
				Elements secondTdList = responseDocument.select("table[summary=\"투찰제한 - 일반\"] tr > td > div");
				BidDetailVo bidDetailVo = new BidDetailVo();
				
				Map<String, String> convertFirstMapData = convertMap(firstThList, firstTdList);
				Map<String, String> convertSecondMapData = convertMap(secondThList, secondTdList);
				// 없는 것도 있어서 체크함
				if ( !firstTdList.isEmpty() ) {
					bidDetailVo = new BidDetailVo(
						bidVo.getBidNo()
						, convertFirstMapData.get(BidConstants.CRAWLING_DETAIL_TD_E_METHOD)
						, convertFirstMapData.get(BidConstants.CRAWLING_DETAIL_TD_OPEN_YN)
						, convertFirstMapData.get(BidConstants.CRAWLING_DETAIL_TD_AMOUNT) == null ? 0 : Long.parseLong(convertFirstMapData.get(BidConstants.CRAWLING_DETAIL_TD_AMOUNT).replaceAll("[\\s|\\D]", "")) 
						, convertFirstMapData.get(BidConstants.CRAWLING_DETAIL_TD_PRESUMED_VALUE) == null ? 0 : Long.parseLong(convertFirstMapData.get(BidConstants.CRAWLING_DETAIL_TD_PRESUMED_VALUE).replaceAll("[\\s|\\D]", ""))
						, convertFirstMapData.get(BidConstants.CRAWLING_DETAIL_TD_BUDGET) == null ? 0 : Long.parseLong(convertFirstMapData.get(BidConstants.CRAWLING_DETAIL_TD_BUDGET).replaceAll("[\\s|\\D]", ""))
					);
				}
				
				if ( !secondTdList.isEmpty() ) {
					bidDetailVo.setLimitedRegion(convertSecondMapData.get(BidConstants.CRAWLING_DETAIL_TD_LIMITED_REGION));
					bidDetailVo.setPossibleRegion(convertSecondMapData.get(BidConstants.CRAWLING_DETAIL_TD_POSSIBLE_REGION));
					bidDetailVo.setBiddingStrategyYn(convertSecondMapData.get(BidConstants.CRAWLING_DETAIL_TD_BIDDING_STRATEGY_YN));
				}
				
				if ( firstTdList.isEmpty() && secondTdList.isEmpty() ) {
					return null; // DB에 저장할 데이터가 아예 없음.
				}
				
				return bidDetailVo;
			}
		}
		
		return null;
	}
	
	private Map<String, String> convertMap(Elements thList, Elements tdList) {
		Map<String, String> result = new HashMap<String, String>();
		
		for ( int i = 0; i < thList.size(); i ++ ) {
			try {
				result.put(thList.get(i).text().trim(), tdList.get(i).text().trim());
			}
			catch(IndexOutOfBoundsException ie) {
				continue;
			}
		}
		return result;
	}
	
	public static void main(String[] args) {
		String a = "202301301020";
		String b = "202301301010";
		System.out.println(a.compareTo(b));
	}
	
}
