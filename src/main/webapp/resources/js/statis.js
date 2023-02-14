$(document).ready(function () {
	initComponent();
	initData();
});

function initComponent() {
	
	var checkBoxData = goAjaxGet('/statis/get/checkBoxData');
	console.log('checkBoxData : ',checkBoxData);
	
	$('#checkBoxAll').jqxCheckBox({ width: 120, height: 25, theme: 'darkblue', checked: true }); 
	
	$('#checkBoxGroup').jqxCheckBoxGroup({
		change: function(item) {
			console.log("$('#checkBoxGroup').val()",$('#checkBoxGroup').val());
			if (item.checked) {
				$('#chartContainer').jqxChart('showSerie', item.value - 1, 0, NaN);
			} else {
				$('#chartContainer').jqxChart('hideSerie', item.value - 1, 0, NaN);
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
		theme	: 'darkblue'
	});
	
	$('#checkBoxGroup').jqxCheckBoxGroup('checkAll');
	
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
		
	var seriesData = goAjaxGet('/statis/get/seriesData');
	console.log('seriesData : ', seriesData);
	
	var chartData =	goAjaxGet('/statis/get/chartData');
	console.log('chartData : ', chartData);
	
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
        seriesGroups: seriesData
	};
	// select the chartContainer DIV element and render the chart.
	$('#chartContainer').jqxChart(settings);
}