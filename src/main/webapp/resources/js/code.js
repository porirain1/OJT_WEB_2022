$(document).ready(function () {
	initComponent();
	initData();
	initEvent();
});

function initComponent() {
	var codeTemplate = [
			  {name: 'codeId', bind: 'codeId', type: 'text', label: '코드 ID', required: true, labelWidth: '100px', width: '100%'}
			, {bind: 'parentCodeId', type: 'text', label: '상위 코드 Id', required: true, labelWidth: '100px', width: '100%'}
			, {bind: 'codeName', type: 'text', label: '코드 이름', required: true, labelWidth: '100px', width: '100%'}
            , {bind: 'codeInfo', type: 'text', label: '코드 설명', required: true, labelWidth: '100px', width: '100%'}
            , {bind: 'useYn', type: 'option', label: '사용여부', required: true, labelWidth: '100px', width: '100%', component: 'jqxDropDownList', options: [{value: 'Y'},{value: 'N'}]}
        ];
        
	$('#codeForm').jqxForm({template: codeTemplate, theme: 'darkblue', padding: {left: 10, top: 10, right: 10, bottom: 10}});
	$('#jqxTree').jqxTree({width: '100%', height: '80%', theme:'darkblue'});		
	$('#detail').jqxPanel({width: '100%', height: '80%', theme:'darkblue'});
	
	$('#jqxInsertButton').jqxButton({theme: 'darkblue', width: 120, height: 40});
	$('#jqxUpdateButton').jqxButton({theme: 'darkblue', width: 120, height: 40});
	$('#jqxDeleteButton').jqxButton({theme: 'darkblue', width: 120, height: 40});
	
	$('#jqxInsertButton').data('mode', 'update');
}

function initData() {
	var data = goAjaxGetWithoutLoader('/code/data');
	$('#jqxTree').jqxTree('source', getTreeRecodes(data, 'codeId', 'parentCodeId', 'codeName', 'codeId'));   	
}

function initEvent() {
	$('#jqxTree').on('select', function (event) {
		var item = $('#jqxTree').jqxTree('getItem', event.args.element);
		$('#jqxTree').data('hasItems', item.hasItems);
		
		var data = goAjaxGetWithoutLoader('/code/detail', {codeId : item.value});
	    $('#codeForm').val(data);
	    
		$('#jqxDeleteButton').jqxButton({disabled: false});
		$('#jqxUpdateButton').jqxButton({disabled: false});
	});
   
	$('#jqxInsertButton').on('click', function () {
		$('#jqxDeleteButton').jqxButton({disabled: true});
		$('#jqxInsertButton').data('mode', 'insert');
	});
      
	$('#jqxUpdateButton').on('click', function () {	
		goAjaxPostWithoutLoader('/code/'+$('#jqxInsertButton').data('mode'), $('#codeForm').val());
		$('#jqxDeleteButton').jqxButton({disabled: false});
		$('#jqxInsertButton').data('mode', 'update');
		initData();
	});
      
	$('#jqxDeleteButton').on('click', function () {
		if (!$('#jqxTree').data('hasItems')) {
			var codeId = $('#codeForm').jqxForm('getComponentByName', 'codeId');
			goAjaxGetWithoutLoader('/code/delete', {codeId : codeId[0].value});			
			$('#codeForm').val('');
			initData();
		} 
		else {
			alert('하위 코드가 있는 경우 삭제할 수 없습니다.');
		}
	});
}