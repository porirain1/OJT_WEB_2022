<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript" src="/resources/js/common.js"></script>
<script type="text/javascript" src="/resources/js/bid.js"></script>

<div style="width:100%; height:100%;">
	<div class="bid-search" style="width:100%; height:50px;">
		<p class="mt16 ml20">분류 : </p>
		<div id="bidType" class="search-combo"></div>
		<p class="mt16 ml20">공고기관 : </p>
		<input id="bidOrg" class="search-input"/>		
		<p class="mt16 ml20">수요기관 : </p>
		<input id="demandOrg" class="search-input"/>
		<p class="mt16 ml20">사업금액 : </p>
		<input id="startAmount" type="number" class="search-input" value="0"/>
		<p class="mt16" style="margin-left:13px"> ~ </p>
		<input id="endAmount" type="number" class="search-input" value="300000000"/>
		<p class="mt16 ml20">공고명 : </p>
		<input id="bidName" class="search-input"/>
		<input type="button" value="Search" id="search-btn" style="float: right; margin-left:20px; margin-top:10px"/>
	</div>
	<div style="width:100%; height:calc(100% - 50px)">
		<div id="bidGrid"></div>
	</div>
</div>

