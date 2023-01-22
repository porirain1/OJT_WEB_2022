$(document).ready(function () {
	initComponent();
	initData();
});

function initData() {
	$.ajax({
		url: '/user/get'
      , data: null
      , method: 'GET'
      , dataType: 'json'
	})
	.done(function (data) {
		console.log('data', data);
		var source =
		{
			  dataType: 'json',
	        	localData: data,
	     		dataFields: [
					{ name: 'authNum', type: 'number'},
	     			{ name: 'userNum', type: 'number'},
	     	        { name: 'userId', type: 'string'},
	     	        { name: 'userPasswd', type: 'string'},
	     	        { name: 'userName', type:'string'},
	     	        { name: 'userEmail', type: 'string'},
	     	        { name: 'userAddress', type:'string'}
		    	]
		};
		var dataAdapter = new $.jqx.dataAdapter(source);
		$('#dataTable').jqxDataTable(
		    {
		    	width: 550,
	 			height:400,
	 			pageable: true,
	 			pagerButtonsCount: 10,
	 			theme: 'darkblue',
	 			source: dataAdapter,
	 			columnsResize: true,
	 			columns: [
	 	              { text: '회원번호', dataField: 'userNum', width: 100 },
	 	              { text: 'ID', dataField: 'userId', width: 100 },
	 	              { text: '이름', dataField: 'userName', width: 100 },
	 	              { text: '이메일', dataField: 'userEmail', width: 150 },
	 	              { text: '주소', dataField: 'userAddress', width: 100 },
	 	        ]
		     }); 	
		});
}
function initComponent() {
	
		$('#jqxSubmitButton').jqxButton({ theme: 'darkblue', width: 200, height: 30	});
		$('#jqxSubmitButton').on('click', function() {
			$('#userList').hide();
			console.log("container Hhhhiiiiddeeeee");
			$('#registForm').show();
			console.log("registFrom Shooooowwwww");
		});
		
		$('#dataTable').on('rowDoubleClick', function(event) {
        	var rows = event.args.row;
        	$('#userList').hide();
			console.log("container Hhhhiiiiddeeeee");
			$('#detailForm').show();
			console.log("detailForm sssshhhhooowww");
			console.log(rows.userNum);	

  	});
  	$('#userList').show();
  	createRegistForm();
  	createDetailForm();
}

function createDetailForm() {
	
	var template = [
			{ bind: 'userNum', type: 'text', label: '회원번호', labelWidth: '100px', width: '100%' }
			, { bind: 'userId', type: 'text', label: '아이디', labelWidth: '100px', width: '100%' }
			, { bind: 'userPasswd', type: 'password', label: '비밀번호', labelWidth: '100px', width: '100%' }
			, { bind: 'userName', type: 'text', label: '이름', labelWidth: '100px', width: '100%' }
            , { bind: 'userEmail', type: 'text', label: '이메일', labelWidth: '100px', width: '100%'}
            , { bind: 'userAddress', type: 'text', label: '주소', labelWidth: '100px', width: '100%' }
            , { name		: 'userUpdate_btn',
				type		: 'button',
				text		: '수정',
				width		: '90px',
				height		: '30px',
                rowHeight	: '40px',
                columnWidth	: '50%'
			}
			, { name		: 'userDelete_btn',
				type		: 'button',
				text		: '삭제',
				width		: '90px',
				height		: '30px',
                rowHeight	: '40px',
                columnWidth	: '50%'
			}
        ]
        
	var $detailFrom = $('#detailFrom');
		$detailFrom.jqxForm({ 
			template: template, 
			theme: 'darkblue', 
			padding: { left: 10, top: 50, right: 10, bottom: 50 } 
	});
	
	var userUpdate_btn = $detailFrom.jqxForm('getComponentByName', 'userUpdate_btn');    
    userUpdate_btn.on('click', function(){	
    	$.ajax({
    		url : '/user/update'
    		, type : 'POST'
    		, data : JSON.stringify($registForm.val())
    		, contentType : 'application/json; charset=utf-8'
    	    , dataType : 'json'
    	}).done(function (resp) {
            // 결과가 정상이면 done 실행
            alert("사용자 등록이 완료되었습니다.");
            console.log(resp);
            location.href = "/dashboard";
        }).fail(function (error) {
            // 실패하면 fail 실행
            alert("사용자 등록에  실패하였습니다.");
            alert(JSON.stringify(error));
        });
    })	
}


function createRegistForm() {
	
	var template = [
			  { bind: 'userId', type: 'text', label: '아이디', required: true, labelWidth: '100px', width: '100%' }
			, { bind: 'userPasswd', type: 'password', label: '비밀번호', required: true, labelWidth: '100px', width: '100%' }
			, { bind: 'userName', type: 'text', label: '이름', required: true, labelWidth: '100px', width: '100%' }
            , { bind: 'userEmail', type: 'text', label: '이메일', required: true, labelWidth: '100px', width: '100%'}
            , { bind: 'userAddress', type: 'text', label: '주소', required: true, labelWidth: '100px', width: '100%' }
            , { name		: 'addUser_btn',
				type		: 'button',
				text		: '사용자 등록',
				width		: '90px',
				height		: '30px',
                rowHeight	: '40px',
                columnWidth	: '50%'
			}
        ]
        
	var $registForm = $('#registForm');
		$registForm.jqxForm({ 
			template: template, 
			theme: 'darkblue', 
			padding: { left: 10, top: 50, right: 10, bottom: 50 } 
	});
	
	var addUser_btn = $registForm.jqxForm('getComponentByName', 'addUser_btn');    
    addUser_btn.on('click', function(){	
    	$.ajax({
    		url : '/user/insert'
    		, type : 'POST'
    		, data : JSON.stringify($registForm.val())
    		, contentType : 'application/json; charset=utf-8'
    	    , dataType : 'json'
    	}).done(function (resp) {
            // 결과가 정상이면 done 실행
            alert("사용자 등록이 완료되었습니다.");
            console.log(resp);
            location.href = "/dashboard";
        }).fail(function (error) {
            // 실패하면 fail 실행
            alert("사용자 등록에  실패하였습니다.");
            alert(JSON.stringify(error));
        });
    })	
}		