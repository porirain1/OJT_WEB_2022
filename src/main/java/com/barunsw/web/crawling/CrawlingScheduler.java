package com.barunsw.web.crawling;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.barunsw.web.bid.BidService;
import com.barunsw.web.crawling.parser.BidParser;

@Component
public class CrawlingScheduler {
	
	private static final Logger logger = LogManager.getLogger(CrawlingScheduler.class);
	
	@Value("${crawling.nara}")
	private boolean isStart;
	
	@Value("${crawling.startPage}")
	private int startPage;
	
	@Autowired
	private BidService bidService;
	
	@Scheduled(fixedDelay = 24 * 60 * 60 * 1000)
	public void naraCrawling() throws Exception {
		logger.info("[Scheduler][naraCrawling] - isStart : {}", isStart);
		logger.info("[Scheduler][naraCrawling] - startPage : {}", startPage);
		if ( isStart ) {
			logger.info("[Scheduler][naraCrawling] - start");
		    BidParser parser = new BidParser(bidService);
		    parser.run(startPage);
		    logger.info("[Scheduler][naraCrawling] - end");	
		}
	}	
}
