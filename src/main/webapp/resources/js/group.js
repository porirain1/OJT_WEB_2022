$(document).ready(function () {
	initComponent();
	initData();
	initEvent();
});

function initComponent(){
	var self = this;
	var theme = 'darkblue';
	var pagerrenderer = function () {
		var element = $("<div style='margin-left: 10px; margin-top: 11px; width: 100%; height: 100%;'></div>");
	    var datainfo = $("#jqxGrid").jqxGrid('getdatainformation');
	    var paginginfo = datainfo.paginginformation;
	    
	    var leftButton = $("<div style='padding: 0px; float: left;'><div style='margin-left: 9px; width: 16px; height: 16px;'></div></div>");
	    leftButton.find('div').addClass('jqx-icon-arrow-left');
	    leftButton.width(36);
	    leftButton.jqxButton({ theme: theme });
	    
	    var rightButton = $("<div style='padding: 0px; margin: 0px 3px; float: left;'><div style='margin-left: 9px; width: 16px; height: 16px;'></div></div>");
	    rightButton.find('div').addClass('jqx-icon-arrow-right');
	    rightButton.width(36);
	    rightButton.jqxButton({ theme: theme });
	    
	    leftButton.appendTo(element);
	    rightButton.appendTo(element);
	    
	    var label = $("<div style='font-size: 11px; margin: 2px 3px; margin-top:-5px; font-weight: bold; float: left;'></div>");
	    label.text("1-" + paginginfo.pagesize + ' of ' + datainfo.rowscount);
	    label.appendTo(element);
	    self.label = label;
	    // update buttons states.
	    var handleStates = function (event, button, className, add) {
	        button.on(event, function () {
	            if (add == true) {
	                button.find('div').addClass(className);
	            }
	            else button.find('div').removeClass(className);
	        });
	    }
	    
	    if (theme != '') {
	        handleStates('mousedown', rightButton, 'jqx-icon-arrow-right-selected-' + theme, true);
	        handleStates('mouseup', rightButton, 'jqx-icon-arrow-right-selected-' + theme, false);
	        handleStates('mousedown', leftButton, 'jqx-icon-arrow-left-selected-' + theme, true);
	        handleStates('mouseup', leftButton, 'jqx-icon-arrow-left-selected-' + theme, false);
	        handleStates('mouseenter', rightButton, 'jqx-icon-arrow-right-hover-' + theme, true);
	        handleStates('mouseleave', rightButton, 'jqx-icon-arrow-right-hover-' + theme, false);
	        handleStates('mouseenter', leftButton, 'jqx-icon-arrow-left-hover-' + theme, true);
	        handleStates('mouseleave', leftButton, 'jqx-icon-arrow-left-hover-' + theme, false);
	    }
	    
	    rightButton.click(function () {
	        $("#jqxGrid").jqxGrid('gotonextpage');
	    });
	    
	    leftButton.click(function () {
	        $("#jqxGrid").jqxGrid('gotoprevpage');
	    });
	    
	    console.log("element");
	    console.log(element);
	    return element;
	}
            
	$("#jqxGrid").on('pagechanged', function () {
		var datainfo = $("#jqxGrid").jqxGrid('getdatainformation');
		var paginginfo = datainfo.paginginformation;
		self.label.text(1 + paginginfo.pagenum * paginginfo.pagesize + "-" + Math.min(datainfo.rowscount, (paginginfo.pagenum + 1) * paginginfo.pagesize) + ' of ' + datainfo.rowscount);
	});	
	
    $('#jqxGrid').jqxGrid(
	{
		theme: 'darkblue',
		width: 700,
		height: 400,
		pageable: true,
		pagerrenderer: pagerrenderer,
		columns: [
			{
				text: '번호', sortable: false, filterable: false, editable: false,
				groupable: false, draggable: false, resizable: false,
				datafield: '', columntype: 'number', width: '30%',
				cellsrenderer: function (row, column, value) {
					return '<div>' + (value + 1) + '</div>';
				}
			}
			, { text: '그룹ID', dataField: 'groupId', width: '30%' }
			, { text: '그룹명', dataField: 'groupName', width: '40%' }
		]
     }); 
    
    $('#eventWindow').jqxWindow({
        height: 100,
        width: 300,
        theme: 'darkblue',
        autoOpen: false,
        okButton: $('#ok'), cancelButton: $('#cancel'),
        initContent: function () {
            $('#ok').jqxButton({ theme: 'darkblue', width: '65px' });
            $('#cancel').jqxButton({ theme: 'darkblue', width: '65px' });
        }
    });
    
    $('#jqxSubmitButton').jqxButton({ theme: 'darkblue', width: 120, height: 40 });
    
	$('#groupList').show();
	
	createInsertForm();
}

function initData() {
	$.ajax({
		url: '/group/data'
      , data: null
      , method: 'GET'
      , dataType: 'json'
	})
	.done(function (data) {
		console.log('data', data);
		var source =
		{
			  dataType: 'json'
			, localData : data
			, dataFields: [
				  { name: 'groupId', type: 'number'}
				, { name: 'groupName', type: 'string'}
			]
		};
		var dataAdapter = new $.jqx.dataAdapter(source); 
		$('#jqxGrid').jqxGrid('source', dataAdapter);    
	})
}

function initEvent() {
	$('#jqxSubmitButton').on('click', function () {
		$('#groupList').hide();
		$('#insertForm').show();
	});
	
	$('#jqxGrid').on('rowselect', function(event) {
		var rows = event.args.row;
		var selectData = JSON.parse(JSON.stringify(rows, ['groupId']));
       	$('#eventWindow').jqxWindow('open');
	   	$('#eventWindow').on('close', function(event) {
			if (event.type === 'close') {
				if (event.args.dialogResult.OK) {
                    $.ajax({
						url: '/group/detail'
						, data: selectData
					    , method: 'GET'
					    , dataType: 'json'
					})
					.done(function (data) {
						$('#groupList').hide();
						$('#detailForm').show();
						createDetailForm(data);	
					})
      			}
      		}
	    });
	});	
}

function createDetailForm(data){
	console.log('createDetailForm');
    var template = [
		  { name: 'groupId', bind: 'groupId', type: 'text', label: '그룹 ID', required: true, labelWidth: '100px', width: '250px' }
		, { name: 'parentGroupId', bind: 'parentGroupId', type: 'text', label: '상위 그룹 ID', required: true, labelWidth: '100px', width: '250px' }
		, { name: 'groupName', bind: 'groupName', type: 'text', label: '그룹명', required: true, labelWidth: '100px', width: '250px' }
		, { type: 'blank', rowHeight: '10px' }
		, { columns: [
					  { name: 'listButton', type: 'button', text: '리스트 보기', width: '90px', height: '30px', rowHeight: '40px', columnWidth: '50%' }
					, {	name: 'updateButton', type: 'button', text: '수정', width: '90px', height: '30px', rowHeight: '40px', columnWidth: '50%'}
					, { name: 'deleteButton', type: 'button', text: '삭제', width: '90px', height: '30px', rowHeight: '40px', columnWidth: '50%'}
			]
		}
	];
    
    var detailValue = {
		  groupId: data[0]['groupId']
		, parentGroupId: data[0]['parentGroupId']
		, groupName : data[0]['groupName'] 
    };
    
    var $detailForm = $('#detailForm');
    $detailForm.jqxForm(
		{ theme: 'darkblue', template: template, value: detailValue, padding: { left: 20, top: 20, right: 20, bottom: 20 }}
    );
    
    var listButton = detailForm.jqxForm('getComponentByName', 'listButton');
    var updateButton = detailForm.jqxForm('getComponentByName', 'updateButton');
    var deleteButton = detailForm.jqxForm('getComponentByName', 'deleteButton');

	listButton.on('click', function(){
		$('#detailForm').hide();
		$('#default').show();
		$('#content').load('/group/list');
	})
    
    updateButton.on('click', function(){
    	$.ajax({
    		url : '/group/update'
    		, type : 'POST'
    		, data : JSON.stringify($detailForm.val())
    		, contentType : 'application/json; charset=utf-8'
    	    , dataType : 'json'
    		, success : function(response) {
				console.log('update success');
    			console.log(response);
    	    }
    	})
    })
    
	var groupId = detailForm.jqxForm('getComponentByName', 'groupId');
	deleteButton.on('click', function(){
		var deleteData = {groupId:groupId[0].value};
       	$.ajax({
			url: '/group/delete'
			, data: deleteData
		    , method: 'GET'
		    , dataType: 'json'
		    , success : function(response) {
				console.log('delete success');
    			console.log(response);
    	    }
		})
    });
}

function createInsertForm() {
    var template = [{
        	name: 'parentGroupId',
            bind: 'parentGroupId',
            type: 'text',
            label: '상위 그룹 ID',
            required: true,
            labelWidth: '100px',
            width: '250px',
        }, {
        	name: 'groupName',
            bind: 'groupName',
            type: 'text',
            label: '그룹명',
            required: true,
            labelWidth: '100px',
            width: '250px'
        }, {
            type: 'blank',
            rowHeight: '10px'
        }, {
        	name: 'insertButton',
            type: 'button',
            text: '등록',
            width: '90px',
            height: '30px',
            align: 'right',
        }
    ];
    
    var $insertForm = $('#insertForm');
    $insertForm.jqxForm({
        template: template,
    	theme: 'darkblue',
        padding: { left: 20, top: 20, right: 20, bottom: 20 }
    });
    
    var insertButton = $insertForm.jqxForm('getComponentByName', 'insertButton');    
    insertButton.on('click', function(){
    	$.ajax({
    		url : '/group/insert'
    		, type : 'POST'
    		, data : JSON.stringify($insertForm.val())
    		, contentType : 'application/json; charset=utf-8'
    	    , dataType : 'json'
    		, success : function(response) {
    			console.log(response);
    	    }
    	})
    })
}