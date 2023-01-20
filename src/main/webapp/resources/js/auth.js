$(document).ready(function () {
	initAuthList();
	initAuthUserList();
	initComponent();
	initData();
});
function initData() {
	
}

function initComponent() {
	
}

function initEvent() {
	
}

function initAuthList() {
	
	$.get('/auth/get', {}, function(response) {
   		console.log(response);
   		
			var source =
	        {
	        	dataType: 'json',
	        	localData: response,
	     		dataFields: [
	     			{ name: 'authId', type: 'number'},
	     	        { name: 'authName', type: 'string'},
	     	        { name: 'userName', type: 'string'},
	     	        { name: 'userId', type: 'string'},
		    	]
		    };
	        var dataAdapter = new $.jqx.dataAdapter(source);
	        var editable = $('#authList').jqxDataTable('editable');        
	        $('#authList').jqxDataTable(
		    {
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
		     
		$('#insertAuthId_btn').jqxButton({ theme: 'darkblue', width: 97, height: 30 });
		$('#updateAuthId_btn').jqxButton({ theme: 'darkblue', width: 97, height: 30 });
		$('#deleteAuthId_btn').jqxButton({ theme: 'darkblue', width: 97, height: 30 });

		$('#insertAuthId_btn').on('click', function () {
			console.log('insert버튼 눌림');
			addAuthForm();
			$('#addAuthForm').show();
		});
		
		
		$('#updateAuthId_btn').on('click', function () {
			console.log('update버튼 눌림');

			console.log(data);
		});
		
		$('#deleteAuthId_btn').on('click', function () {
			console.log('delete버튼 눌림');
		});
			
	});

}

function initAuthUserList() {
	
	$.get('/auth/get/auth', {}, function(response) {		
		console.log(response);	
   		
		var source =
	    {
	       	dataType: 'json',
	       	localData: response,
	    	dataFields: [
	    		{ name: 'authId', type: 'number' },
	            { name: 'authName', type: 'string' },
	            { name: 'userId', type: 'string' },
	            { name: 'userName', type: 'string' }
		   	]
		};
		     
		var template = [
			  { bind: 'authId', type: 'text', label: '권한ID', required: true, labelWidth: '100px', width: '100%' }
			, { bind: 'authName', type: 'text', label: '권한명', required: true, labelWidth: '100px', width: '100%' }
			, { columns: [{
				type		: 'button',
				text		: '저장',
				width		: '90px',
				height		: '30px',
                rowHeight	: '40px',
                columnWidth	: '50%',
                align		: 'right'
			}]}
		] 	
		$('#authUserForm').jqxForm({ template: template, theme: 'darkblue', padding: { left: 10, top: 10, right: 10, bottom: 10 } });
		$('#authUserList').on('rowDoubleClick', function (event) {
			var args 	= event.args;
			var row 	= args.row;
    		console.log(JSON.stringify(row));
    	$('#authUserForm').val(
		{
			'authId' : row.authId,
			'authName' : row.authName
			})	
		});
		
		// 1. row 선택 
		// 2. 선택된 row의 authID에 소속된 user정보 select
		// 3. 화면에 뿌려준다
		$('#authList').on('rowDoubleClick', function (event) {
			var args 	= event.args;
			var row 	= args.row;
    		console.log(JSON.stringify(row));
    	$('#authUserForm').val(
		{
			'authId' : row.authId,
			'authName' : row.authName
			})
		$('#authUserList').val(
		{
			'userName' : row.userName,
			'userId' : row.userId
			})	
		});		
		
			
			
		var dataAdapter = new $.jqx.dataAdapter(source);   
		$('#authUserList').jqxDataTable(
		{
		   	width: '100%',
	 		height: 150,
	 		theme: 'darkblue',
	 		source: dataAdapter,
	 		columnsResize: true,
	 		columns: [
	 	          { text: '사용자명', dataField: 'userName', width: 150 },
	 	          { text: '사용자ID', dataField: 'userId', width: 170 }
	 	    ]
		});
		
		$('#addAuthUser_btn').jqxButton({ theme: 'darkblue', width: 166, height: 30 });
		$('#deleteAuthUser_btn').jqxButton({ theme: 'darkblue', width: 166, height: 30 });
		
		
		$('#addAuthUser_btn').on('click', function () {
			console.log('사용자 추가 버튼 눌림');
		});
		$('#deleteAuthUser_btn').on('click', function () {
			console.log('사용자 삭제 버튼 눌림');
		});
	});
	
}

function addAuthForm() {
    var template = [
			  { bind: 'authId', type: 'text', label: '권한ID', required: true, labelWidth: '50px', width: '100%' }
			, { bind: 'authName', type: 'text', label: '권한명', required: true, labelWidth: '50px', width: '100%' }
			, { columns: [{
				name		: 'insertButton',
				type		: 'button',
				text		: '저장',
				width		: '90px',
				height		: '30px',
                rowHeight	: '40px',
                columnWidth	: '50%',
                align		: 'right'
			}]}
		]
    
    var $insertForm = $('#addAuthForm');
    $insertForm.jqxForm({
        template: template,
    	theme: 'darkblue',
        padding: { left: 20, top: 20, right: 20, bottom: 20 }
    });
    
    var insertButton = $insertForm.jqxForm('getComponentByName', 'insertButton');    
    insertButton.on('click', function(){
    	$.ajax({
    		url : '/auth/insert'
    		, type : 'POST'
    		, data : JSON.stringify($insertForm.val())
    		, contentType : 'application/json; charset=utf-8'
    	    , dataType : 'json'
    	}).done(function (resp) {
            // 결과가 정상이면 done 실행
            alert("관리자 추가 완료되었습니다.");
            console.log(resp);
            location.href = "/dashboard";
        }).fail(function (error) {
            // 실패하면 fail 실행
            alert("관리자 추가 실패하였습니다.");
            alert(JSON.stringify(error));
        });
    	
    })
}