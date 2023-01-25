$(document).ready(function () {
	initComponent();
	initData();
	initEvent();
});

function initComponent() {
	var menuTemplate = [
			  {name: 'menuId', bind: 'menuId', type: 'text', label: 'Menu ID', required: true, labelWidth: '100px', width: '100%'}
			, {bind: 'parentMenuId', type: 'text', label: '부모 Menu Id', required: true, labelWidth: '100px', width: '100%'}
			, {bind: 'menuName', type: 'text', label: 'Menu Name', required: true, labelWidth: '100px', width: '100%'}
            , {name: 'menuUrl', bind: 'menuUrl', type: 'text', label: 'Menu Url', required: true, labelWidth: '100px', width: '100%'}
            , {bind: 'useYn', type: 'option', label: '사용여부', required: true, labelWidth: '100px', width: '100%', component: 'jqxDropDownList', options: [{ value: 'Y'},{ value: 'N'}]}
        ];

	//$('#menuId').jqxInput({disabled:true});
	$('#menuForm').jqxForm({template: menuTemplate, theme: 'darkblue', padding: {left: 10, top: 10, right: 10, bottom: 10}});
	$('#jqxTree').jqxTree({width: '100%', height: '80%', theme:'darkblue'});		
	$('#detail').jqxPanel({width: '100%', height: '80%', theme:'darkblue'});
	
	$('#jqxInsertButton').jqxButton({theme: 'darkblue', width: 120, height: 40});
	$('#jqxUpdateButton').jqxButton({theme: 'darkblue', width: 120, height: 40});
	$('#jqxDeleteButton').jqxButton({theme: 'darkblue', width: 120, height: 40});

	$('#jqxInsertButton').data('mode', 'update');
}

function initData() {
	var data = goAjaxGetWithoutLoader('/menu/data');
	$('#jqxTree').jqxTree('source', getTreeRecodes(data, 'menuId', 'parentMenuId', 'menuName', 'menuId'));   	
}

function initEvent() {
	$('#jqxTree').on('select', function (event) {
		var item = $('#jqxTree').jqxTree('getItem', event.args.element);
		$('#jqxTree').data('hasItems', item.hasItems);
		
		var data = goAjaxGetWithoutLoader('/menu/detail', {menuId : item.value});
	    $('#menuForm').val(data);
	    
		$('#jqxDeleteButton').jqxButton({disabled: false});
		$('#jqxUpdateButton').jqxButton({disabled: false});
	});
		
	$('#jqxInsertButton').on('click', function () {
		$('#jqxDeleteButton').jqxButton({disabled: true});
		$('#jqxInsertButton').data('mode', 'insert');
	});
		
	$('#jqxUpdateButton').on('click', function () {	
		var menuUrl = $('#menuForm').jqxForm('getComponentByName', 'menuUrl');
		console.log(menuUrl[0].value);
		var expUrl = '\/[a-zA-Z0-9-_/]*';
		
				
		goAjaxPostWithoutLoader('/menu/'+$('#jqxInsertButton').data('mode'), $('#menuForm').val());
		$('#jqxDeleteButton').jqxButton({disabled: false});
		$('#jqxInsertButton').data('mode', 'update');
		initData();
	});
		
	$('#jqxDeleteButton').on('click', function () {		
		if (!$('#jqxTree').data('hasItems')) {			
			var menuId = $('#menuForm').jqxForm('getComponentByName', 'menuId');
			goAjaxGetWithoutLoader('/menu/delete', {menuId : menuId[0].value});
			$('#menuForm').val('');
			initData();
		} 
		else {
			alert('하위 메뉴가 있는 경우 삭제할 수 없습니다.');
		}
	});
}