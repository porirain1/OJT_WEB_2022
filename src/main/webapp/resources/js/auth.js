$(document).ready(function () {
	initComponent();
	initData();
	initEvent();
});
function initData() {  
	// 왼쪽	
	var data = goAjaxGetWithoutLoader('/auth/get');
	$('#authList').jqxDataTable(data, 'authList');
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
		editable		: true,
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
					{
					name		: 'userAuthForm_btn',
					type		: 'button',
					text		: '저장',
					width		: '90px',
					height		: '30px',
	                rowHeight	: '40px',
	                columnWidth	: '50%',
	                align		: 'right'
					}
				]}
			] 	
		
		var $authUserForm = $('#authUserForm');
		$('#authUserForm').jqxForm({ template: template, theme: 'darkblue', padding: { left: 10, top: 10, right: 10, bottom: 10 } }); 
		$('#authUserList').jqxDataTable(
		{
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
			$('#authUserList').on('rowDoubleClick', function (event) {
			var args 	= event.args;
			var row 	= args.row;
    		var auth	= $('#authUserForm').val();
    		console.log(JSON.stringify(row));
    		console.log('authauthauth', auth.authId);
				userAuthForm_btn.on('click', function () {
					$.ajax({
			    		url : '/auth/insert/userAtuh'
			    		, type : 'POST'
			    		, data : JSON.stringify(row)
			    		, contentType : 'application/json; charset=utf-8'
			    	    , dataType : 'json'
			    	}).done(function (resp) {
			            // 결과가 정상이면 done 실행
			            alert("권한 추가 완료되었습니다.");
			            console.log(resp);
			        }).fail(function (error) {
			            // 실패하면 fail 실행
			            alert("권한 추가에 실패하였습니다.");
			            alert(JSON.stringify(error));
			        });
					$('#content').load('/auth/list');	
			});
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
	 	          { text: '권한ID', dataField: 'authId', width: 80 },
	 	          { text: '사용자명', dataField: 'userName', width: 120 },
	 	          { text: '사용자ID', dataField: 'userId', width: 120 }
	 	    ]
		});
}

function initEvent() {
			
		$('#insertAuthId_btn').on('click', function () {
			addAuthForm();
			$('#addAuthForm').show();
		});
		
		$('#authUserList').on('rowDoubleClick', function (event) {
			var args 	= event.args;
			var row 	= args.row;
    		console.log(JSON.stringify(row)); 
    			
	    	$('#authUserForm').val({
				'authId' 	: row.authId,
				'authName' 	: row.authName
			})
			// 사용자 삭제
			$('#deleteAuthUser_btn').on('click', function () {
				$('#authUserList').jqxDataTable('deleteRow', row.uid)
				$.ajax({
		    	url 			: '/auth/delete/userAuth'
		    	, type 			: 'POST'
		    	, data 			: JSON.stringify(row)
		    	, contentType 	: 'application/json; charset=utf-8'
		    	, dataType 		: 'json'
			    }).done(function (resp) {
			        // 결과가 정상이면 done 실행
			        alert("권한 삭제 완료되었습니다.");
			        console.log(resp);
			    }).fail(function (error) {
			        // 실패하면 fail 실행
			        alert("권한 삭제 실패하였습니다.");
			        alert(JSON.stringify(error));
			    });
			});	
		});
		// 권한 없는 사용자 SELECT
		$('#addAuthUser_btn').on('click', function () {
			var data = goAjaxGetWithoutLoader('/auth/get/noAuth');
			console.log('data:', data)
			$('#windowTable').jqxDataTable(data , 'userNoAuthList');
				var source = {
					dataType	: 'json',
					localData	: data,
					dataFields: [
						{ name: 'authId' , type: 'number'},
						{ name: 'userName', type: 'string'},
				        { name: 'userId', type: 'string'}
	     	    	]
				};
				var dataAdapter = new $.jqx.dataAdapter(source);   
				$('#windowTable').jqxDataTable({ source : dataAdapter });
		/*	$.ajax({
			url: '/auth/get/noAuth'
			     , data: null
			     , method: 'GET'
			     , dataType: 'json'
			})
			.done(function (data){
				
			}); */
			//$('#jqxwindow').show();
		});
		// 
		$('#windowTable').on('rowDoubleClick', function (event) {
			var args 	= event.args;
			var row 	= args.row;
			console.log('windowTable data : ', row);
			$('#ok').on('click', function () {
							
				$('#authUserList').jqxDataTable('addRow', row, {
					userName 	: row.userName,
					userId		: row.userId
				}, 'last');
			});
		});	
		
		// 1. row 선택 
		// 2. 선택된 row의 authID에 소속된 user정보 select
		// 3. 화면에 뿌려준다
		$('#authList').on('rowDoubleClick', function (event) {
			var rows = event.args.row;
			var authData = JSON.parse(JSON.stringify(rows));
	    	
	    	$('#authUserForm').val(
			{
				'authId' 	: authData.authId,
				'authName'	: authData.authName
			});
	    	
			$.ajax({
				url				: '/auth/get/auth'
				, data 			: authData
				, method 		: 'GET'
				, contentType 	: 'application/json; charset=utf-8'
				, dataType 		: 'json'
			})
			.done(function (data){
				console.log('select Data : ', data);
			
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
			});						
			// 권한 삭제
			$('#deleteAuthId_btn').on('click', function () {
				console.log(JSON.stringify(authData));
				$.ajax({
	    		url 			: '/auth/delete'
	    		, type 			: 'POST'
	    		, data 			: JSON.stringify(authData)
	    		, contentType 	: 'application/json; charset=utf-8'
	    	    , dataType 		: 'json'
	    	}).done(function (resp) {
	            // 결과가 정상이면 done 실행
	            alert("권한 삭제 완료되었습니다.");
	            console.log(resp);
	        }).fail(function (error) {
	            // 실패하면 fail 실행
	            alert("권한 삭제 실패하였습니다.");
	            alert(JSON.stringify(error));
	        });
	        $('#content').load('/auth/list'); 
    	});		
	});
	
	// 권한 업데이트
	$('#authList').on('cellValueChanged', function (event) {
	    var args = event.args;
	    var row = args.row;
    	
    	$('#updateAuthId_btn').on('click', function () {
			$.ajax({
	    	url 			: '/auth/update'
	    	, type 			: 'POST'
	    	, data 			: JSON.stringify(row)
	    	, contentType 	: 'application/json; charset=utf-8'
	    	, dataType 		: 'json'
		    }).done(function (resp) {
		        // 결과가 정상이면 done 실행
		        alert("권한 업데이트 완료되었습니다.");
		        console.log(resp);
		    }).fail(function (error) {
		        // 실패하면 fail 실행
		        alert("권한 업데이트 실패하였습니다.");
		        alert(JSON.stringify(error));
		    });
		    $('#content').load('/auth/list'); 
		});
	});	
}


function addAuthForm() {
    var template = [
			  { bind: 'authId', type: 'text', label: '권한ID', required: true, labelWidth: '50px', width: '100%' }
			, { bind: 'authName', type: 'text', label: '권한명', required: true, labelWidth: '50px', width: '100%' }
			, { name		: 'addAuth_btn',
				type		: 'button',
				text		: '저장',
				width		: '90px',
				height		: '30px',
                rowHeight	: '40px',
                columnWidth	: '50%'
			}
		]
    
    var $insertForm = $('#addAuthForm');
   	 	$insertForm.jqxForm({
        template: template,
    	theme: 'darkblue',
        padding: { left: 20, top: 20, right: 20, bottom: 20 }
    });
    
    var addAuth_btn = $insertForm.jqxForm('getComponentByName', 'addAuth_btn');    
    addAuth_btn.on('click', function(){
    	$.ajax({
    		url : '/auth/insert'
    		, type : 'POST'
    		, data : JSON.stringify($insertForm.val())
    		, contentType : 'application/json; charset=utf-8'
    	    , dataType : 'json'
    	    , 
    	}).done(function (resp) {
            // 결과가 정상이면 done 실행
            alert("권한 추가 완료되었습니다.");
            console.log(resp);
            $('#content').load('/auth/list');
        }).fail(function (error) {
            // 실패하면 fail 실행
            alert("권한 추가에 실패하였습니다.");
            alert(JSON.stringify(error));
        });
    });
}