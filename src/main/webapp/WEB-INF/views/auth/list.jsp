<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/css/auth.css" type="text/css"/>

<div id="authBox">
	<div class="auth-container">
		<div id="authList"></div>
		<div id="authList_btn">
			<input id="insertAuthId_btn" type="submit" value="등록" />
			<input id="updateAuthId_btn" type="submit" value="수정" />
			<input id="deleteAuthId_btn" type="submit" value="삭제" />
		</div>
	</div>
	<div class="auth-container ml-50">
		<div id="authUserForm"></div>
		<div id="authUserList"></div>
		<div id="authUserForm_btn">
			<input id="addAuthUser_btn" type="submit" style="margin-right: 5px" value="사용자 추가" />
			<input id="deleteAuthUser_btn" type="submit" value="사용자 삭제" />
		</div>
	</div>
	<div id="jqxwindow">
		<div>사용자 리스트</div>
		<div>
			<div id="windowTable"></div>
			<div id="buttons">
				<input id="ok" type="submit" value="권한 등록" />
				<input id="cancel" type="submit" value="닫기" />
			</div>    
		</div>
	</div>
</div>


<script type="text/javascript" src="/resources/js/auth.js?version=2023"></script>
<script type="text/javascript" src="/resources/js/common.js"></script>