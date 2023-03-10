$(document).ready(function () {
	initComponent();
	initData();
});

function initComponent() {
	$('#dataGrid').jqxGrid({
		theme: 'darkblue',
		source: [],
		columns: [
	 		{ text: '회원번호', dataField: 'userNum', width: '20%' },
	 		{ text: 'ID', dataField: 'userId', width: '20%' },
	 		{ text: '이름', dataField: 'userName', width: '20%' },
	 	    { text: '이메일', dataField: 'userEmail', width: '20%' },
	 	    { text: '주소', dataField: 'userAddress', width: '20%' },
	 	],
	 	width			: '100%',
		height			: 'calc(100% - 70px)',
		enabletooltips: true
		, pageable: true
        , virtualmode: true
        , sortable: true
        , showsortmenuitems: false
        , pagermode: 'simple'
        , pagesize : 10
        , pagerbuttonscount: 10
        , rendergridrows: function(obj) {
        	console.log('obj : ',obj);
        	return obj.data;     
		}
	});
	
	$('#dataGrid').on('sort', function () {
		$('#dataGrid').jqxGrid('updatebounddata', 'sort');
	});
	
	$('#jqxLoader').jqxLoader({ width: 100, height: 60, imagePosition: 'top' });
	$('#jqxSubmitButton').jqxButton({ theme: 'darkblue', width: 150, height: 40	});
	$('#jqxSubmitButton').on('click', function() {
		$('#userList').hide();
		$('#registForm').show();
	});
	
	$('#dataGrid').on('rowdoubleclick', function(event) {
    	var args 	= event.args;
		var row 	= args.row;
		console.log(row.bounddata.userId);
    	$('#userList').hide();
		$('#detailForm').show();
		$('#detailForm').val({
			'userNum' : row.bounddata.userNum,
			'userId' : row.bounddata.userId,
			'userPasswd' : row.bounddata.userPasswd,
			'userName' : row.bounddata.userName,
			'userEmail' : row.bounddata.userEmail,
			'userAddress' : row.bounddata.userAddress
		}); 
  	}); 
  	$('#userList').show();
	createDetailForm();
  	createRegistForm();
}

function initData() {
	$('#dataGrid').jqxGrid('gotopage', 0);
	var param = {};
	$('#dataGrid').jqxGrid('source', getPagingDataAdapter(param, '/user/get', 'userList'));
	$('#dataGrid').jqxGrid('clearselection');
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
			{ name: 'userUpdate_btn', type: 'button', text: '수정', width: '200px', height: '40px', rowHeight: '40px', columnWidth: '50%', align: 'right' }
		  , { name: 'userDelete_btn', type: 'button', text: '삭제', width: '200px', height: '40px', rowHeight: '40px', columnWidth: '50%', align: 'right' }
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
    userUpdate_btn.on('click', function() {
		goAjaxPost('/user/update', $('#detailForm').val());
		alert('사용자 정보가 업데이트 되었습니다.');
		$('#content').load('/user/list');
    });
    
    var userDelete_btn = $detailForm.jqxForm('getComponentByName', 'userDelete_btn');    
    userDelete_btn.on('click', function(){
		goAjaxPost('/user/delete', $('#detailForm').val());
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
			width		: '200px',
			height		: '40px',
        	rowHeight	: '40px',
        	columnWidth	: '100%',
        	align		: 'right'
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
		goAjaxPost('/user/insert', $('#registForm').val());
		alert('사용자 정보가 등록 되었습니다.');
		$('#content').load('/user/list');
    });	
}		