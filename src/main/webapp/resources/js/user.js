$(document).ready(function () {
	initComponent();
	initData();
});

function initData() {
	var data = goAjaxGetWithoutLoader('/user/get');
	$('#dataTable').jqxDataTable(data, 'userList');
	var source =
		{
			dataType: 'json',
	        localData: data,
	     	dataFields: [
	     		{ name: 'userNum', type: 'number'},
	     	    { name: 'userId', type: 'string'},
	     	    { name: 'userPasswd', type: 'string'},
	     	    { name: 'userName', type:'string'},
	     	    { name: 'userEmail', type: 'string'},
	     	    { name: 'userAddress', type:'string'}
		    ]
		};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$('#dataTable').jqxDataTable({
		width				: 550,
	 	height				: 400,
	 	pageable			: true,
	 	pagerButtonsCount	: 10,
	 	theme				: 'darkblue',
	 	source				: dataAdapter,
	 	columnsResize		: true,
	 	sortable			: true,
	 	columns: [
	 		{ text: '회원번호', dataField: 'userNum', width: 100 },
	 		{ text: 'ID', dataField: 'userId', width: 100 },
	 		{ text: '이름', dataField: 'userName', width: 100 },
	 	    { text: '이메일', dataField: 'userEmail', width: 150 },
	 	    { text: '주소', dataField: 'userAddress', width: 100 },
	 	]
	}); 	
}
function initComponent() {
	
	$('#jqxSubmitButton').jqxButton({ theme: 'darkblue', width: 200, height: 30	});
	$('#jqxSubmitButton').off().on('click', function() {
		$('#userList').hide();
		$('#registForm').show();
	});
	$('#dataTable').on('rowDoubleClick', function(event) {
    	var args 	= event.args;
		var row 	= args.row;
    	$('#userList').hide();
		$('#detailForm').show();
		$('#detailForm').val({
			'userNum' : row.userNum,
			'userId' : row.userId,
			'userPasswd' : row.userPasswd,
			'userName' : row.userName,
			'userEmail' : row.userEmail,
			'userAddress' : row.userAddress
		});
  	});
  	$('#userList').show();
	createDetailForm();
  	createRegistForm();
}

function createDetailForm() {
	
	var template = [
		{ name: 'userNum', bind: 'userNum', type: 'text', label: '회원번호', labelWidth: '100px', width: '100%'}
		, { bind: 'userId', type: 'text', label: '아이디', labelWidth: '100px', width: '100%' }
		, { bind: 'userPasswd', type: 'password', label: '비밀번호', labelWidth: '100px', width: '100%' }
		, { bind: 'userName', type: 'text', label: '이름', labelWidth: '100px', width: '100%' }
        , { bind: 'userEmail', type: 'text', label: '이메일', labelWidth: '100px', width: '100%'}
        , { bind: 'userAddress', type: 'text', label: '주소', labelWidth: '100px', width: '100%' }
        , { columns: [
			{ name : 'userUpdate_btn', type : 'button', text : '수정', width : '200px', height : '30px', rowHeight : '40px', columnWidth: '50%' }
			, { name : 'userDelete_btn', type : 'button', text : '삭제', width : '200px',height : '30px', rowHeight : '40px', columnWidth: '50%' }
		]}
	]
	
	var $detailForm = $('#detailForm');
		$detailForm.jqxForm({ 
			template: template, 
			theme: 'darkblue',
			padding: { left: 10, top: 50, right: 10, bottom: 50 },
		});
		
	var input = $detailForm.jqxForm('getComponentByName', 'userNum');
	input.jqxInput({disabled : true});
	
	var userUpdate_btn = $detailForm.jqxForm('getComponentByName', 'userUpdate_btn');    
    userUpdate_btn.off().on('click', function() {
		goAjaxPostWithoutLoader('/user/update', $('#detailForm').val());
		alert('사용자 정보가 업데이트 되었습니다.');
		$('#content').load('/user/list');
    });
    
    var userDelete_btn = $detailForm.jqxForm('getComponentByName', 'userDelete_btn');    
    userDelete_btn.off().on('click', function(){
		goAjaxPostWithoutLoader('/user/delete', $('#detailForm').val());
		alert('사용자 정보가 삭제 되었습니다.');
		$('#content').load('/user/list');
    });	
}

function createRegistForm() {
	
	var template = [
		  { bind: 'userId', type: 'text', label: '아이디', required: true, labelWidth: '100px', width: '100%' }
		, { bind: 'userPasswd', type: 'password', label: '비밀번호', required: true, labelWidth: '100px', width: '100%' }
		, { bind: 'userName', type: 'text', label: '이름', labelWidth: '100px', width: '100%' }
        , { bind: 'userEmail', type: 'text', label: '이메일', labelWidth: '100px', width: '100%'}
        , { bind: 'userAddress', type: 'text', label: '주소', labelWidth: '100px', width: '100%' }
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
    addUser_btn.off().on('click', function(){
		goAjaxPostWithoutLoader('/user/insert', $('#registForm').val());
		alert('사용자 정보가 등록 되었습니다.');
		$('#content').load('/user/list');
    });	
}		