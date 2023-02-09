$(document).ready(function () {
	initComponent();
	initData();
});

function initComponent() {
	
	var authData = goAjaxGet('/auth/get');

/*	for (var i = 0; i < authData.length; i++) {
		var createCheckBox = document.createElement('div');
		createCheckBox.id = 'jqxcheckbox' + i;
		createCheckBox.setAttribute('name', 'checkBox');
		createCheckBox.innerHTML = authData[i].authName;
		$('#checkBox').append(createCheckBox);
		console.log('forforfor : ', i);
	}
	for (var i = 0; i < authData.length; i++) {
		$('#jqxcheckbox' + i).jqxCheckBox({ width: 120, height: 25, theme: 'darkblue' });
	} */
	$('#checkBoxAll').jqxCheckBox({ width: 120, height: 25, theme: 'darkblue', checked: true }); 
	
	var items = [];
	var value = [];
	for(let i = 0; i < authData.length; i++) {
	   var item = {}
	   item.label = authData[i].authName;
	   item.value = i;
	   items.push(item);
	   value.push(i);
	}
	console.log('items', items);
	console.log('value', value);
	
	$('#checkBoxGroup').jqxCheckBoxGroup({
		change: function(item) {
			console.log('12312',item.value);
			if (item.checked) {
				$('#chartContainer').jqxChart('showSerie', item.value, 0, NaN);
			} else {
				$('#chartContainer').jqxChart('hideSerie', item.value, 0, NaN);
			}
			console.log('item : ', item);
			console.log('group length : ', $('#checkBoxGroup').val());
			if( $('#checkBoxGroup').val().length == items.length ) {
				$('#checkBoxAll').jqxCheckBox('check');
			}
			else if ( $('#checkBoxGroup').val().length < items.length ) {
				$('#checkBoxAll').jqxCheckBox('uncheck');
			}
		},
		items	: items,
		layout	: 'horizontal',
		theme	: 'darkblue',
		value	: value
	});
	
	$('#checkBoxAll').on('change', function(event) {
		var checked = event.args.checked
		console.log('checkBoxAll event');
		if ( checked ) {
			var chkArr = value.filter(x => !$('#checkBoxGroup').val().includes(x));
			console.log('chkArr : ',chkArr);
			chkArr.forEach(function (item) {
				$('#checkBoxGroup').jqxCheckBoxGroup('checkValue', item);
			});
		} 
		else if ( $('#checkBoxGroup').val().length == items.length ) {
			$('#checkBoxGroup').jqxCheckBoxGroup('uncheckAll');  
		}
	});
}

function initData() {
	var allData = goAjaxGet('/statis/get');
	console.log('statis Data2 : ', allData);
	//var parse = JSON.stringify(allData).replace(/},{/gi, ',')
	
	var reParse =[]
	for(let i = 0; i<allData.length; i++){
		var item = {}
		item[allData[i].authName] = allData[i].count; 	
		item['권한 명'] = allData[i].authName;
		console.log('item :', item)
		reParse.push(item);
	}
	console.log('reparse',reParse); 
	
	var statisSeries = [];	
	for (let i = 0; i < allData.length; i++) {
		var group = {};
		var key = allData[i].authName;
		group.type = 'column';
		group.series = [{dataField : key, displayText: key}];
		statisSeries.push(group);
	}
	console.log('statis : ',statisSeries);
	
	// prepare jqxChart settings
	var settings = {
    	title: null,
        description: null,
        padding: { left: 20, top: 20, right: 20, bottom: 20 },
        source: reParse,
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