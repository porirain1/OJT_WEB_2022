$(document).ready(function () {
	initComponent();
	initData();
	initEvent();
});
function initData() {  
	// 왼쪽	
	var data = goAjaxGetWithoutLoader('/auth/get');
	console.log('authForm : ', data);
	var source =
		{
		  dataType: 'json'
		, localData : data
		, dataFields: [
			  { name: 'authId', type: 'number'}
			, { name: 'authName', type: 'string'}
		]
	};
	console.log("source", source);
	var dataAdapter = new $.jqx.dataAdapter(source); 
	$('#authList').jqxDataTable({
	   	width			: '100%',
		height			: 'calc(100% - 70px)',
		theme			: 'darkblue',
		source			: dataAdapter,
		columnsResize	: true,
		columns: [
			{ text: '권한ID', dataField: 'authId', width: '50%' },
	 	    { text: '권한명', dataField: 'authName', width: '50%' }
	 	]
	});
}

function initComponent() {
	// 오른쪽
	var template = [
		  { name: 'authId', bind: 'authId', type: 'text', label: '권한ID', labelWidth: '100px', width: '100%' }
		, { bind: 'authName', type: 'text', label: '권한명', labelWidth: '100px', width: '100%' }
		, { name: 'userAuthForm_btn', type: 'button', text: '저장', width : '90px', height : '30px', align : 'right' }
	];
		
	var $authUserForm = $('#authUserForm');
	$('#authUserForm').jqxForm({ template: template, theme: 'darkblue', padding: { left: 10, top: 10, right: 10, bottom: 10 } }); 
	$('#authUserList').jqxDataTable({
		width			: '100%',
	 	height			: 'calc(100% - 210px)',
	 	theme			: 'darkblue',
	 	columnsResize	: true,
	 	sortable		: true,
	 	columns: [
	 	      { text: '사용자명', dataField: 'userName', width: '50%' },
	 	      { text: '사용자ID', dataField: 'userId', width: '50%' }
	 	]
	});
	
		
	var input = $authUserForm.jqxForm('getComponentByName', 'authId');
	input.jqxInput({disabled : true});
			
	$('#insertAuthId_btn').jqxButton({ theme: 'darkblue', width: 160, height: 40 });
	$('#updateAuthId_btn').jqxButton({ theme: 'darkblue', width: 160, height: 40 });
	$('#deleteAuthId_btn').jqxButton({ theme: 'darkblue', width: 160, height: 40 });
	
	var userAuthForm_btn = $authUserForm.jqxForm('getComponentByName', 'userAuthForm_btn');
	userAuthForm_btn.off().on('click', function () {			
		goAjaxPostWithoutLoader('/auth/upsert', $('#authUserForm').val());
		alert('권한이 등록/수정 되었습니다.');
	   	$('#content').load('/auth/list');
	});
	
	$('#authUserList').on('rowDoubleClick', function (event) {
		var args 	= event.args;
		var row 	= args.row;
    	console.log(JSON.stringify(row));
	});
	
	$('#addAuthUser_btn').jqxButton({ theme: 'darkblue', width: 160, height: 40 });
	$('#deleteAuthUser_btn').jqxButton({ theme: 'darkblue', width: 160, height: 40 });
	
	$('#jqxwindow').jqxWindow({ 
		width		: 450, 
		height		: 430,
		theme		: 'darkblue',
        autoOpen	: false,
        isModal		: true, 
        modalOpacity: 0.3,
        showCloseButton:true,
        okButton	: $('#ok'),
        cancelButton: $('#cancel'),
    });
    
    $('#ok').jqxButton({ theme: 'darkblue', width: 90, height: 30 });
	$('#cancel').jqxButton({ theme: 'darkblue', width: 90, height: 30 });
    
    $('#windowTable').jqxDataTable({
		width			: '100%',
	 	height			: 300,
	 	theme			: 'darkblue',
	 	columnsResize	: true,
	 	columns: [
	 	      { text: '사용자명', dataField: 'userName', width: '50%' },
	 	      { text: '사용자ID', dataField: 'userId', width: '50%' }
	 	]
	});
}

function initEvent() {
	
	$('#authUserList').off().on('rowDoubleClick', function (event) {
		var args 	= event.args;
		var row 	= args.row;
    	console.log(JSON.stringify(row)); 
    			
	   	$('#authUserForm').val({
			'authId' 	: row.authId,
			'authName' 	: row.authName
		});
		
		// 사용자 권한 삭제
		$('#deleteAuthUser_btn').off().on('click', function () {
			$('#authUserList').jqxDataTable('deleteRow', row.uid)
			goAjaxPostWithoutLoader('/auth/delete/userAuth', row);
			alert('사용자 권한 삭제되었습니다.');
			$('#content').load('/auth/list');
		});	
	});
	
	$('#insertAuthId_btn').off().on('click', function () {
	 	$('#authUserForm').val({'authId' : '', 'authName' : ''});
	 	alert('추가 할 권한을 입력하세요');
	});
	
	// 권한 없는 사용자 SELECT
	$('#addAuthUser_btn').off().on('click', function () {
		var data = goAjaxGetWithoutLoader('/auth/get/noAuth', $('#authUserForm').val());
		console.log('data:', data)
		
		var source = {
			dataType	: 'json',
			localData	: data,
			dataFields: [
				{ name: 'userName', type: 'string'},
			    { name: 'userId', type: 'string'}
	   	    ]
		};
		
		var dataAdapter = new $.jqx.dataAdapter(source);   
		$('#windowTable').jqxDataTable({ source : dataAdapter });
		$('#jqxwindow').jqxWindow('open');
		$("#windowTable").jqxDataTable('render');
	});
	
	$('#windowTable').off().on('rowSelect', function (event) {
		var args 	= event.args;
		var row 	= args.row;
		var authInfo = $('#authUserForm').val();
		console.log('windowTable data : ', JSON.stringify(row));
		
		$('#ok').off().on('click', function () {
			var authData = {
				authId : authInfo.authId,
				userId : row.userId
			}
			console.log(authData);
			goAjaxPostWithoutLoader('/auth/insert/userAtuh', authData);
			alert('사용자 권한이 추가되었습니다.');
			$('#authUserList').jqxDataTable('addRow', row, {
				userName 	: row.userName,
				userId		: row.userId
			}, 'last');
			$('#jqxwindow').jqxWindow('close');
		});
	});	
		
	// 1. row 선택 
	// 2. 선택된 row의 authID에 소속된 user정보 select
	// 3. 화면에 뿌려준다
	$('#authList').off().on('rowDoubleClick', function (event) {
		var rows = event.args.row;
		var authData = JSON.parse(JSON.stringify(rows));
			
	   	$('#authUserForm').val(
		{
			'authId' 	: authData.authId,
			'authName'	: authData.authName
		});
	    
	    var data = goAjaxGetWithoutLoader('/auth/get/auth', authData);
	    
	    var source = {
			dataType: 'json',
			localData: data,
			dataFields: [
				{ name: 'authId', type: 'string' },
			    { name: 'authName', type: 'string' },
			    { name: 'userId', type: 'string' },
			    { name: 'userName', type: 'string' }
			]
		}; 
		
		var dataAdapter = new $.jqx.dataAdapter(source);   
		$('#authUserList').jqxDataTable({ source : dataAdapter });		
		
		// 권한 업데이트
    	$('#updateAuthId_btn').off().on('click', function () {
			var oneData = goAjaxGetWithoutLoader('/auth/get/one', authData);
	    	var setOneData = JSON.parse(JSON.stringify(oneData));
		    $('#authUserForm').val(
				{
					'authId' 	: setOneData[0].authId,
					'authName'	: setOneData[0].authName
			});
			alert('권한을 수정해 주세요.');
		});
		
		// 권한 삭제
		$('#deleteAuthId_btn').off().on('click', function () {
			console.log(JSON.stringify(authData));
			goAjaxPostWithoutLoader('/auth/delete', authData);
			alert('권한이 삭제 되었습니다.');
	    	$('#content').load('/auth/list'); 
    	});		
	});

}