$(document).ready(function () {
	initComponent();
	initData();
});

function initComponent() {
	
	var checkBoxData = goAjaxGet('/statis/get/checkBoxData');
	console.log('checkBoxData : ',checkBoxData)
	
	$('#checkBoxAll').jqxCheckBox({ width: 120, height: 25, theme: 'darkblue', checked: true }); 
	
/*	var items = [];
	var value = [];
	
	for(var i = 0; i < authData.length; i++) {
	   var item = {}
	   item.label = parseInt(authData2[i].value);
	   item.value = i;
	   items.push(item);
	   value.push(i);
	}
	console.log('items : ', items);
	console.log('value : ', value);*/
	
	$('#checkBoxGroup').jqxCheckBoxGroup({
		change: function(item) {
			if (item.checked) {
				$('#chartContainer').jqxChart('showSerie', item.value, 0, NaN);
			} else {
				$('#chartContainer').jqxChart('hideSerie', item.value, 0, NaN);
			}
			console.log('item : ', item);
			console.log('group length : ', $('#checkBoxGroup').val());
			if( $('#checkBoxGroup').val().length == checkBoxData.length ) {
				$('#checkBoxAll').jqxCheckBox('check');
			}
			else if ( $('#checkBoxGroup').val().length < checkBoxData.length ) {
				$('#checkBoxAll').jqxCheckBox('uncheck');
			} 
		},
		items	: checkBoxData,
		layout	: 'horizontal',
		theme	: 'darkblue',
	});
	
	$('#checkBoxAll').on('click', function() {
		if ($('#checkBoxAll').val() == true) {
			$('#checkBoxGroup').jqxCheckBoxGroup('checkAll');
		}
		else {
			$('#checkBoxGroup').jqxCheckBoxGroup('uncheckAll');
		}
	});  
}

function initData() {
	var allData = goAjaxGet('/statis/get');
	var chartData = goAjaxGet('/statis/get/chartData');
	console.log('allData : ', allData);
	console.log('chartData : ', chartData);

	var statisSeries = [];	
	for (var i = 0; i < allData.length; i++) {
		var group = {};
		var key = allData[i].authName;
		group.type = 'column';
		group.series = [{dataField : key, displayText: key}];
		statisSeries.push(group);
	}
	console.log('statisSeries : ',statisSeries);
	
	// prepare jqxChart settings
	var settings = {
    	title: null,
        description: null,
        enableAnimations: true,
        padding: { left: 20, top: 20, right: 20, bottom: 20 },
        source: chartData,
        xAxis:{
        	dataField: '권한 명',
            showGridLines: false
		},
		valueAxis: { 
			minValue	: 0,
			maxValue	: 20,
			unitInterval: 5,
			description	: '사용자 수'
		},
        colorScheme: 'scheme01',
        seriesGroups: statisSeries
	};
	// select the chartContainer DIV element and render the chart.
	$('#chartContainer').jqxChart(settings);
}