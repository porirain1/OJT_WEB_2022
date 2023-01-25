<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/css/history.css" type="text/css"/>    
<script type="text/javascript" src="/resources/js/common.js"></script>

<div style="width:100%; height:100%;">
	<div class="history-search" style="width:100%; height:100px; padding-left:50px">
		<div class="history-container">
			<p>통계 구분 : </p>
			<div id="historyType"></div>
			<p>기간 : </p>
			<div id="historyDate"></div>		
		</div>
		<div class="history-container">
			<div id="menuCheckBoxGroup"></div>
		</div>
	</div>

	<div style="width:100%; height:calc(100% - 100px) display: none;">
		<div id="jqxChart" style="width:90%; height:100%;"></div>
	</div>	
</div>