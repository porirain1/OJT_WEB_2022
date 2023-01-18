<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>   
<style>
.regdiv {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<form class="sampleForm"></form>
<div class="regdiv">
    <div class="container">
        <h2>
            회원 상세 정보
        </h2>
        <form>
        	<h3>회원번호</h3>
            <div class="form-group">
                <input id="userNum" name="userNum" type="text" class="form-control" maxlength="20" value="" />
            </div>
            <h3>아이디</h3>
            <div class="form-group">
                <input id="userId" name="userId" type="text" class="form-control" maxlength="20" value=""/>
            </div>
            <h3>비밀번호</h3>
            <div class="form-group">
                <input id="userPasswd" name="userPasswd" type="password" class="form-control"  maxlength="20" value=""/>
            </div>
            <h3>이름</h3>
            <div class="form-group">
                <input  id="userName" name="userName" type="text" class="form-control" maxlength="20" value=""/>
            </div>
            <h3>이메일</h3>
            <div class="form-group">
                <input id="userEmail" name="userEmail" type="text" class="form-control" value=""/>
            </div>
            <h3>주소</h3>
            <div class="form-group">
                <input id="userAddress" name="userAddress" type="text" class="form-control" value=""/>
            </div>
        </form>
            <button style="margin: 10px" id="btn-save" class="jqxbutton">수정</button>
            <button style="margin: 10px" id="btn-delete" class="jqxbutton">삭제</button>            
    </div>
</div>
<script type="text/javascript" src="/resources/js/userDetail.js"></script>