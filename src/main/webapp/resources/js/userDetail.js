$(document).ready(function () {	
	
	let index = {
		init:function() {
			$('#btn-save').on('click', ()=> {
				this.update();
			});
			$('#btn-delete').on('click', ()=> {
				this.delete();
			});
		},
	
	update:function() {
		let data = {
			userNum		: $('#userNum').val(),
			userId		: $('#userId').val(),
			userPasswd: $('#userPasswd').val(),
			userName	: $('#userName').val(),
			userEmail	: $('#userEmail').val(),
			userAddress	: $('#userAddress').val(),
			}
			console.log(data);
			
			$.ajax({
	            // 업데이트 수행 요청
	        type: "POST",
	        url: "/user/update",
	        data: JSON.stringify(data), // http body 데이터
	        contentType: "application/json; charset=utf-8", // body 데이터가 어떤 타입인지 (MIME)
	        dataType: "json" // 요청을 서버로 해서 응답이 왔을 때 기본적으로 모든 것이 String(문자열), 만약 생긴게 json이라면 javascript 오브젝트로 변경
	        }).done(function (resp) {
	            // 결과가 정상이면 done 실행
	            alert("정보수정이 완료되었습니다.");
	            console.log(resp);
	            location.href = "/user/list";
	        }).fail(function (error) {
	            // 실패하면 fail 실행
	            alert("정보수정에 실패하였습니다.");
	            alert(JSON.stringify(error));
	        });
		},
		
	delete:function() {
		let data = {
			userNum		: $('#userNum').val()
			}
			console.log(data);
			
			$.ajax({
	            // 삭제 수행 요청
	        type: "POST",
	        url: "/user/delete",
	        data: JSON.stringify(data), // http body 데이터
	        contentType: "application/json; charset=utf-8", // body 데이터가 어떤 타입인지 (MIME)
	        dataType: "json" // 요청을 서버로 해서 응답이 왔을 때 기본적으로 모든 것이 String(문자열), 만약 생긴게 json이라면 javascript 오브젝트로 변경
	        }).done(function (resp) {
	            // 결과가 정상이면 done 실행
	            alert("삭제가 완료되었습니다.");
	            console.log(resp);
	            location.href = "/dashboard";
	        }).fail(function (error) {
	            // 실패하면 fail 실행
	            alert("삭제에 실패하였습니다.");
	            alert(JSON.stringify(error));
	        });
		}
	}	
	index.init();
});