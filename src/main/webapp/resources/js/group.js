$(document).ready(function () {
	initComponent();
	initData();
	initEvent();
});

function initComponent(){
	$('#insertPageButton').jqxButton({theme: 'darkblue', width: '100px', height:'30px'});	

	$('#jqxGrid').jqxGrid({
		theme: 'darkblue'
		, source: []
		, columns: [
			{
				text: '번호', sortable: false, filterable: false, editable: false,
				groupable: false, draggable: false, resizable: false,
				datafield: '', columntype: 'number', width: '30%',
				cellsrenderer: function (row, column, value) {
					return '<div>' + (value + 1) + '</div>';
				}
			}			
			, {text: '그룹ID', dataField: 'groupId', width: '30%'}
			, {text: '그룹명', dataField: 'groupName', width: '40%'}
		]
		, width: '100%'
		, height: '100%'
		, enabletooltips: true
		, pageable: true
        , virtualmode: true
        , sortable: true
        , showsortmenuitems: false
        , pagermode: 'simple'
        , pagesize : 10
        , pagerbuttonscount: 10
        , rendergridrows: function(obj) {
        	console.log(obj.data);
        	return obj.data;     
		}
    });
	$('#jqxGrid').on('sort', function () {
		$('#jqxGrid').jqxGrid('updatebounddata', 'sort');
	})     
 	 	
 	var insertTemplate = [
		{name: 'parentGroupId', bind: 'parentGroupId', type: 'text', label: '상위 그룹 ID', required: true, labelWidth: '100px', width: '250px'}
		, {name: 'groupName', bind: 'groupName', type: 'text', label: '그룹명', required: true, labelWidth: '100px', width: '250px'}	
		, {type: 'blank', rowHeight: '10px'}
		, {name: 'insertButton', type: 'button', text: '등록', width: '90px', height: '30px', align: 'right'}
	];
	$('#insertForm').jqxForm({theme: 'darkblue', template: insertTemplate, padding: {left: 20, top: 20, right: 20, bottom: 20}});        
	$('#insertForm').hide();
    
    var detailTemplate = [
		{name: 'groupId', bind: 'groupId', type: 'text', label: '그룹 ID', required: true, labelWidth: '100px', width: '250px'}
		, {name: 'parentGroupId', bind: 'parentGroupId', type: 'text', label: '상위 그룹 ID', required: true, labelWidth: '100px', width: '250px'}
		, {name: 'groupName', bind: 'groupName', type: 'text', label: '그룹명', required: true, labelWidth: '100px', width: '250px'}
		, {type: 'blank', rowHeight: '10px' }
		, {columns: [
			{name: 'listButton', type: 'button', text: '리스트 보기', width: '90px', height: '30px', rowHeight: '40px', columnWidth: '50%'}
			, {name: 'updateButton', type: 'button', text: '수정', width: '90px', height: '30px', rowHeight: '40px', columnWidth: '50%'}
			, {name: 'deleteButton', type: 'button', text: '삭제', width: '90px', height: '30px', rowHeight: '40px', columnWidth: '50%'}
			]
		}
	];
    $('#detailForm').jqxForm({theme: 'darkblue', template: detailTemplate, value: {}, padding: { left: 20, top: 20, right: 20, bottom: 20}});
	$('#detailForm').hide();    
}

function initData() {
	$('#jqxGrid').jqxGrid('gotopage', 0);
	var param = {};
	
	$('#jqxGrid').jqxGrid('source', getPagingDataAdapter(param, '/group/data', 'groupList'));
	$('#jqxGrid').jqxGrid('clearselection');
}

function initEvent() {
	$('#insertPageButton').on('click', function () {
		$('.group-container').hide();
		$('#insertForm').show();
	});
	
	$('#jqxGrid').on('rowdoubleclick', function (event) {
		$('.group-container').hide();
		
		var data = $('#jqxGrid').jqxGrid('getrowdata', event.args.rowindex); 
		$('#detailForm').val({'groupId': data['groupId'], 'parentGroupId': data['parentGroupId'], 'groupName': data['groupName']});
		$('#detailForm').show();
	});
	
	var insertButton = $('#insertForm').jqxForm('getComponentByName', 'insertButton');    
	var updateButton = $('#detailForm').jqxForm('getComponentByName', 'updateButton');
	var deleteButton = $('#detailForm').jqxForm('getComponentByName', 'deleteButton');
	var listButton   = $('#detailForm').jqxForm('getComponentByName', 'listButton');

    insertButton.on('click', function(){
		var data = goAjaxPostWithoutLoader('/group/insert', $('#insertForm').val());
		console.log(data);
		alert('그룹 정보에 등록 되었습니다');
		$('#insertForm').hide();
		$('.group-container').show();
		initData();
    });
    
	updateButton.on('click', function(){
		var data = goAjaxPostWithoutLoader('/group/update', $('#detailForm').val());
		console.log(data);
		alert('그룹 정보가 업데이트 되었습니다');
		$('#detailForm').hide();
		$('.group-container').show();
		initData();
	});
    
	deleteButton.on('click', function(){
		var data = goAjaxGetWithoutLoader('/group/delete', $('#detailForm').val());
		console.log(data);
		alert('그룹 정보가 삭제 되었습니다');
		$('#detailForm').hide();
		$('.group-container').show();
		initData();
	});
    
	listButton.on('click', function(){
		$('#detailForm').hide();
		$('.group-container').show();
		initData();
	});
}