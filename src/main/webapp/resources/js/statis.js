$(document).ready(function () {
	initComponent();
	initData();
	initEvent();
});

function initComponent() {
	$('#jqxcheckbox1').jqxCheckBox({ width: 120, height: 25 });
	$('#jqxcheckbox').bind('change', function (event) {
		var checked = event.args.checked;
		console.log('ㅇㅇㅇ',checked)
	});
	$('#jqxcheckbox2').jqxCheckBox({ width: 120, height: 25 });
	$('#jqxcheckbox3').jqxCheckBox({ width: 120, height: 25 });
	$('#jqxcheckbox4').jqxCheckBox({ width: 120, height: 25 });
	$('#jqxcheckbox5').jqxCheckBox({ width: 120, height: 25 });
	$('#jqxcheckbox6').jqxCheckBox({ width: 120, height: 25 });
	$('#jqxcheckbox7').jqxCheckBox({ width: 120, height: 25 });
	$('#jqxcheckbox8').jqxCheckBox({ width: 120, height: 25 });
	$('#jqxcheckbox9').jqxCheckBox({ width: 120, height: 25 });
	$('#jqxcheckbox10').jqxCheckBox({ width: 120, height: 25 });
	
}

function initData() {
	var allData = goAjaxGet('/statis/get');
	//var data2 = JSON.stringify(data)
	console.log('statis Data2 : ', allData);
	
	var dataAdapter = new $.jqx.dataAdapter(allData);
	
	// prepare jqxChart settings
	var settings = {
    	title: null,
        description: null,
        padding: { left: 5, top: 5, right: 5, bottom: 5 },
        source: dataAdapter,
        categoryAxis:{
        	dataField: 'abcd',
            showGridLines: false
		},
        colorScheme: 'scheme01',
        seriesGroups:
        [{
			type: 'column',
            columnsGapPercent: 30,
            seriesGapPercent: 0,
            valueAxis:
            {
				minValue: 0,
            	maxValue: 20,
                unitInterval: 5,
                description: '사용자 수'
			},
            series:[
				{ dataField: 'count', displayText: 'count'}
            ]
		}]
	};
            
	// select the chartContainer DIV element and render the chart.
	$('#chartContainer').jqxChart(settings);
}

function initEvent() {
	
}