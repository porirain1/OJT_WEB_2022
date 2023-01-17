$(document).ready(function () {
	initComponent();
	initData();
});

function initComponent() {
	var template = [
			  { name: 'menuId', bind: 'menuId', type: 'text', label: 'Menu ID', required: true, labelWidth: '100px', width: '100%' }
			, { bind: 'parentMenuId', type: 'text', label: '부모 Menu Id', required: true, labelWidth: '100px', width: '100%' }
			, { bind: 'menuName', type: 'text', label: 'Menu Name', required: true, labelWidth: '100px', width: '100%' }
            , { bind: 'menuUrl', type: 'text', label: 'Menu Url', required: true, labelWidth: '100px', width: '100%'}
            , { bind: 'useYn', type: 'option', label: '사용여부', required: true, labelWidth: '100px', width: '100%', component: 'jqxDropDownList', options: [{ value: 'Y'},{ value: 'N'}] }
        ];
        
	$('#menuForm').jqxForm({ template: template, theme: 'darkblue', padding: { left: 10, top: 10, right: 10, bottom: 10 } });
	$('#jqxTree').jqxTree({width: '100%', height: '80%', theme:'darkblue'});		
	$('#detail').jqxPanel({ width: '100%', height: '80%', theme:'darkblue'});
	
	$('#jqxInsertButton').jqxButton({ theme: 'darkblue', width: 120, height: 40 });
	$('#jqxUpdateButton').jqxButton({ theme: 'darkblue', width: 120, height: 40 });
	$('#jqxDeleteButton').jqxButton({ theme: 'darkblue', width: 120, height: 40 });
}

function initData() {
	$.ajax({
		url: '/menu/data'
      , data: null
      , method: 'GET'
      , dataType: 'json'
	})
	.done(function (data) {
		console.log('실행')
		console.log(data)
		var source =
		{
			datatype: 'json',
			datafields: [
				{ name: 'menuId' },
				{ name: 'parentMenuId' },
				{ name: 'menuName' },
				{ name: 'menuUrl'},
				{ name: 'useYn'}
			],
			id: 'menuId',
			localData: data
		};
		
		var dataAdapter = new $.jqx.dataAdapter(source);
		dataAdapter.dataBind();
		var records = dataAdapter.getRecordsHierarchy('menuId', 'parentMenuId', 'items', [{ name: 'menuName', map:'label'}]);
		$('#jqxTree').jqxTree('source', records);   
		
		initEvent(data); 
	})
}

function initEvent(data) {
	$('#jqxTree').on('select', function (event) {
		var args = event.args;
		var item = $('#jqxTree').jqxTree('getItem', args.element);
		
		var d = data.filter(function (e){
			return e.menuName === item.label;
		})
		
		$('#menuForm').val(
	    {
	    	'menuId': d[0].menuId, 
	    	'parentMenuId': d[0].parentMenuId,
	    	'menuName': d[0].menuName,
	    	'menuUrl': d[0].menuUrl,
	    	'useYn': d[0].useYn
	    });
		$('#jqxDeleteButton').jqxButton({disabled: false});
		$('#jqxUpdateButton').jqxButton({disabled: false});
	});
	
	var urlCheck = 'update';
	
	$('#jqxInsertButton').on('click', function () {
		$('#jqxDeleteButton').jqxButton({disabled: true});
		//$('#menuForm').val('')
		urlCheck = 'insert';
	});
		
	$('#jqxUpdateButton').on('click', function () {	
		console.log('update btn clicked')
		console.log(urlCheck);
		$.ajax({
			  url : '/menu/'+urlCheck
			, type : 'POST'
			, data : JSON.stringify($('#menuForm').val())
			, contentType : 'application/json; charset=utf-8'
		    , dataType : 'json'
			, success : function(response) {
				console.log('success');
				console.log(response);
				$('#content').load('/menu/list');
		    }
		})
		$('#jqxDeleteButton').jqxButton({disabled: false});
		urlCheck = 'update';
	});
		
	var menuId = $('#menuForm').jqxForm('getComponentByName', 'menuId');
	$('#jqxDeleteButton').on('click', function () {
		var deleteData = { menuId : menuId[0].value }
		
		$.ajax({
			url: '/menu/delete'
			, data: deleteData
		    , method: 'GET'
		    , dataType: 'json'
	    	, success : function(response) {
				console.log('delete');
	    		console.log(response);
	    		$('#content').load('/menu/list');
		    }
		})
	});
}