<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/css/group.css" type="text/css"/>

<div id="groupList" style="display:none">
	<input type="submit" value="등록" id="jqxSubmitButton" />
	<div id="jqxGrid"></div>
	<div id="eventWindow">
		<div>알림창</div>
		<div>
			<div>Ok 선택 시 상세보기 화면으로 넘어갑니다</div>
			<div id="buttons">
				<input type="button" id="ok" value="OK" />
	            <input type="button" id="cancel" value="Cancel" />
			</div>
		</div>
	</div>
</div>
<div id="detailForm" class="forms"></div>   
<div id="insertForm" class="forms"></div>   

<script type="text/javascript" src="/resources/js/group.js"></script>