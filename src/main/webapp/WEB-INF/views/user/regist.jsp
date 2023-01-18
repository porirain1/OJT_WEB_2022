<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>   
<!DOCTYPE html>
<html>
<head>
<title id="Description">회원 등록 페이지</title>
<link rel="stylesheet" href="/resources/css/index.css?after" type="text/css"/>
<link rel="stylesheet" href="/resources/lib/jqwidgets/styles/jqx.base.css" type="text/css" />
<script type="text/javascript" src="/resources/lib/scripts/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="/resources/lib/jqwidgets/jqx-all.js"></script>
</head>
<style>
.regdiv {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
<div class="regdiv">
    <div class="container">
        <h2>
            회원 정보 수정/등록
        </h2>
        <form>
            <h3>아이디</h3>
            <div class="form-group">
                <input id="userId" name="userId" type="text" class="form-control" maxlength="20"/>
            </div>
            <h3>비밀번호</h3>
            <div class="form-group">
                <input id="userPasswd" name="userPasswd" type="password" class="form-control"  maxlength="20"/>
            </div>
            <h3>이름</h3>
            <div class="form-group">
                <input  id="userName" name="userName" type="text" class="form-control" maxlength="20"/>
            </div>
            <h3>이메일</h3>
            <div class="form-group">
                <input id="userEmail" name="userEmail" type="text" class="form-control"/>
            </div>
            <h3>주소</h3>
            <div class="form-group">
                <input id="userAddress" name="userAddress" type="text" class="form-control"/>
            </div>
        </form>
            <button style="margin: 10px" id="btn-save" class="jqxbutton">등록</button>
    </div>
</div>
<script type="text/javascript" src="/resources/js/userRegist.js"></script>
</html>