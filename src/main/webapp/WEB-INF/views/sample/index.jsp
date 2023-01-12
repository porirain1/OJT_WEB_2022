<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Sample Index Page</title>
<link rel="stylesheet" href="/resources/lib/jqwidgets/styles/jqx.base.css" type="text/css" />
<script type="text/javascript" src="/resources/lib/scripts/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="/resources/lib/jqwidgets/jqx-all.js"></script>
<script type="text/javascript">
    $(function () {
    	//jQuery.get(  url [, data] [, success(data, textStatus, jqXHR)] [, dataType] )
       	$.get('/sample/get', {name:'홍길동'}, function(response) {
       		console.log(response);
       	});
    	
    	//jQuery.ajax [(중요)[ POST 전송시 RequestBody 에 데이터를 보내야 함. ]]
       	$.ajax({ 
	    	url : '/sample/post'
	    	, type : 'POST'
	    	, data : JSON.stringify({name:'김영희'})
	    	, contentType : 'application/json; charset=utf-8'
	    	, dataType : 'json'
	    	, success : function(response) {
	    		console.log(response);
       	  	}
       	});
       	
       	// jQuery.load( url [, data] [, complete(responseText, textStatus, XMLHttpRequest)] )
       	$('#detail').load('/sample/detail', null, function(response) {
       		console.log(response);
       	});
    });
</script>
</head>
<body class="default">
    <div id="detail"></div>
</body>
</html>