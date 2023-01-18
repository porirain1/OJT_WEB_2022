
let index = {
	init:function() {
		$('#btn-save').on('click', ()=> {
			this.save();
		});
	},

save:function() {
	let data = {
		userId		: $('#userId').val(),
		userPasswd: $('#userPasswd').val(),
		userName	: $('#userName').val(),
		userEmail	: $('#userEmail').val(),
		userAddress	: $('#userAddress').val(),
		}
		console.log(data);
		
		$.ajax({
            // 회원가입 수행 요청
        type: "POST",
        url: "/user/insert",
        data: JSON.stringify(data), // http body 데이터
        contentType: "application/json; charset=utf-8", // body 데이터가 어떤 타입인지 (MIME)
        dataType: "json" // 요청을 서버로 해서 응답이 왔을 때 기본적으로 모든 것이 String(문자열), 만약 생긴게 json이라면 javascript 오브젝트로 변경
        }).done(function (resp) {
            // 결과가 정상이면 done 실행
            alert("회원가입이 완료되었습니다.");
            console.log(resp);
            location.href = "/dashboard";
        }).fail(function (error) {
            // 실패하면 fail 실행
            alert("회원가입이 실패하였습니다.");
            alert(JSON.stringify(error));
        });
	}
}


index.init();