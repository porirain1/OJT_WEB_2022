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
	   	width			: 300,
		height			: 150,
		theme			: 'darkblue',
		source			: dataAdapter,
		columnsResize	: true,
		columns: [
			{ text: '권한ID', dataField: 'authId', width: 150 },
	 	    { text: '권한명', dataField: 'authName', width: 150 }
	 	]
	});
}

function initComponent() {
	// 오른쪽
	var template = [
		  { bind: 'authId', type: 'text', label: '권한ID', required: true, labelWidth: '100px', width: '100%' }
		, { bind: 'authName', type: 'text', label: '권한명', required: true, labelWidth: '100px', width: '100%' }
		,	{ columns: [
				{ name			: 'userAuthForm_btn',
				  type			: 'button',
				  text			: '저장',
				  width			: '90px',
				  height		: '30px',
	              rowHeight		: '40px',
	              columnWidth	: '50%',
	              align			: 'right'
				}
			]}
		]; 	
		
	var $authUserForm = $('#authUserForm');
	$('#authUserForm').jqxForm({ template: template, theme: 'darkblue', padding: { left: 10, top: 10, right: 10, bottom: 10 } }); 
	$('#authUserList').jqxDataTable({
		width			: '100%',
	 	height			: 150,
	 	theme			: 'darkblue',
	 	columnsResize	: true,
	 	sortable		: true,
	 	columns: [
	 	      { text: '사용자명', dataField: 'userName', width: 150 },
	 	      { text: '사용자ID', dataField: 'userId', width: 170 }
	 	]
	});
			
	$('#insertAuthId_btn').jqxButton({ theme: 'darkblue', width: 97, height: 30 });
	$('#updateAuthId_btn').jqxButton({ theme: 'darkblue', width: 97, height: 30 });
	$('#deleteAuthId_btn').jqxButton({ theme: 'darkblue', width: 97, height: 30 });
	
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
	
	$('#addAuthUser_btn').jqxButton({ theme: 'darkblue', width: 166, height: 30 });
	$('#deleteAuthUser_btn').jqxButton({ theme: 'darkblue', width: 166, height: 30 });
	
	$("#jqxwindow").jqxWindow({ 
		width		: 312, 
		height		: 400,
		theme		: 'darkblue',
        autoOpen	: false,
        okButton	: $('#ok'), 
        cancelButton: $('#cancel'),
        initContent: function () {
            $('#ok').jqxButton({ theme: 'darkblue', width: 100 });
            $('#cancel').jqxButton({ theme: 'darkblue', width: 100 });
        }
    });
    
    $('#windowTable').jqxDataTable({
		width			: '100%',
	 	height			: 300,
	 	theme			: 'darkblue',
	 	columnsResize	: true,
	 	columns: [
	 	      { text: '사용자명', dataField: 'userName', width: 150 },
	 	      { text: '사용자ID', dataField: 'userId', width: 150 }
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
	$('#addAuthUser_btn').on('click', function () {
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
		$('#jqxwindow').show();
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
			$('#jqxwindow').hide();
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
				{ name: 'authId', type: 'number' },
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