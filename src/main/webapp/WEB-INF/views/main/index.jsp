<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
	    <title id='Description'>dashboard</title>
	    <link rel="stylesheet" href="/resources/lib/jqwidgets/styles/jqx.base.css" type="text/css" />
		<script type="text/javascript" src="/resources/lib/scripts/jquery-1.12.4.min.js"></script>
		<script type="text/javascript" src="/resources/lib/jqwidgets/jqx-all.js"></script>
		<script type="text/javascript">
		    $(document).ready(function () {
		        $("#jqxMenu").jqxMenu({ width: '100%', height: '100%', mode: 'vertical'});
		    });
		</script>
	</head>
	<style>
		@charset "UTF-8";
		
		body {
		    margin: 0 auto;
		    width: 100vw;
		    height: 100vh;
		    display: flex;
		    flex-direction: column;
		}
		
		.nav_bar {
			width: 100%;
		    height: 20%;
			background: #7D5A50;
		    display: flex;
		    flex-direction: row;
		    align-items: center;
		    justify-content: space-between;
		}
		
		.logo {
		    margin-left: 50px;
		    font-size: 30px;
		    color: #FFFBE9;
		}
		
		.user_info {
			width: 20%;
		    height: 100%;
		    margin-right: 50px;
		    display: flex;
		    align-items: center;
		    justify-content: space-evenly;
		}
		
		.user_name {
		    color: #FFFBE9;
		    font-size: 20px;
		}
		
		.submit_btn {
		    height: 45%;
		    background: #FFFBE9;
		    border-radius: 10px;
		    font-size: 20px;
		    color: #7D5A50;
		    radius: 10px;
		}
		
		#contents {
		    width: 100%;
		    height: 80%;
		    display: flex;
		}
		
		#jqxWidget {
			width: 20%;
			height: 100%;
		}
		
		.jqx-menu-ul {
		    height: 100%;
		    display: flex;
		    flex-direction: column;
		    justify-content: space-evenly;
		    border: 0;
		}
		
		.jqx-item {
			height: 10%;
			display: flex;
		    align-items: center;
		    justify-content: center;
		}
		
		.jqx-menu-item-top {
			font-size: 20px;
		}
		
		.content {
			width: 80%;
			height: 100%;
			background: #FFFBE9;
		}
		
		.jqx-item:hover{
			background: #7D5A50;
			color: #FFFBE9;
		}
	</style>
	<body>
		<div class="nav_bar">
	        <div class="logo">바른개발 연구소</div>
	        <div class="user_info">
		        <div class="user_name">홍길동님</div>
		    	<button type="submit" class="submit_btn">로그아웃</button>
	       	</div>
	    </div>
	    <div id='contents'>
	        <div id='jqxWidget'>
	            <div id='jqxMenu' style="border:none">
	                <ul style="background-color: #CEAB93">
	                    <li><a href="#">사용자 관리</a></li>
	                    <li><a href="#">그룹 관리</a></li>
	                    <li><a href="#">메뉴 관리</a></li>
	                    <li><a href="#">권한 관리</a></li>
	                    <li><a href="#">코드 관리</a></li>
	                    <li><a href="#">이력 조회</a></li>
	                    <li><a href="#">통계 조회</a></li>
	                </ul>
	            </div>
	        </div>
	        <div class="content">
	        	
	        </div>
	    </div>
	</body>
</html>