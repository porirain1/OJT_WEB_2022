<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/css/history.css" type="text/css"/>    
<script type="text/javascript" src="/resources/js/common.js"></script>
<script type="text/javascript" src="/resources/js/history.js"></script>

<div style="width:100%; height:100%;">
   <div class="history-search" style="width:100%; height:100px; padding-left:50px">
      <div class="history-container">
         <p>통계 구분 : </p>
         <div id="historyType"></div>
         <p>기간 : </p>
         <div id="historyDate"></div>
         <input type="button" style="margin: 50px;" id="jqxbutton" value="Refresh" />      
      </div>
      <div class="history-container">
         <p>메뉴명 : </p>
         <div id="allMenuCheckBox">전체</div>
         <div id="menuCheckBoxGroup"></div>
       </div>       
   </div>

   <div style="width:100%; height:calc(100% - 100px);">
      <div id="jqxChart" style="width:100%; height:100%;"></div>
   </div>   
</div>