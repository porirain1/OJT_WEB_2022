$(document).ready(function () {
   initComponent();
   initData();
   initEvent();
});
function initComponent(){

   var typeSource = ["일별","주별","월별"]
   $('#historyType').jqxComboBox({theme: 'darkblue',selectedIndex: 0, source: typeSource, width: '80px'});   
   
   $("#historyDate").jqxDateTimeInput({ width: 250, height: 25,  selectionMode: 'range', formatString: "yyyy/MM/dd"});
    
   $("#allMenuCheckBox").jqxCheckBox({theme: 'darkblue', width: 100, height: 25, checked: true});
	
	// var menuData = ['사용자 관리', '그룹 관리', '메뉴 관리', '권한 관리', '코드 관리', '통계 조회', '나라 시장']
	var   menuData = goAjaxGetWithoutLoader('/history/menu');
	var historySeries = [];
	for(let i=0; i<menuData.length; i++) {
		var menu = menuData[i].historyMenu;
		var group = {};
		group.type = 'line';
		group.source = goAjaxGetWithoutLoader('/history/data', {historyMenu : menu, mode : 'yyyy/MM/dd'});
		group.series = [{dataField: 'historyCount', displayText: menu}];
		historySeries.push(group);
	}
	console.log('historySeries');
	console.log(historySeries);
	   
	var param = {fromDate: '2023/01/01', toDate: '2023/01/30', mode:'yyyy/MM/dd'};
	var source = goAjaxGetWithoutLoader('/history/data', param);
	
	var settings = {
		title: '통계'
	   	, description: '메뉴 조회별 통계'
	   	, enableAnimations: true
	   	, showLegend: true
	   	, padding: {left: 5, top: 5, right: 15, bottom: 5}
	   	, titlePadding: {left: 90, top: 0, right: 0, bottom: 10}
	   	, source: source
	   	, xAxis: {
			dataField: 'historyNow'
			, formatFunction: function (value) {
				return value.getFullYear()+'/'+(value.getMonth()+1)+'/'+value.getDate();
	      	}
	      	, type: 'date'
	      	, baseUnit: 'day'
	      	, minValue: '01-01-2023'
	      	, maxValue: '01-02-2023'
	      	, valuesOnTicks: true
	      	, unitInterval: 1
	      	, gridLines: {visible: true, interval: 1, color: '#BCBCBC'}
	      	, labels: {angle: -45, rotationPoint: 'topright', offset: {x: 0, y: -25}}
		}
	    , valueAxis: { 
			visible:true
			, labels: {horizontalAlignment: 'right'}
			, title: { text: 'Visits<br>' }
		}
		, colorScheme: 'scheme01'
		, seriesGroups: historySeries
	};
	$('#jqxChart').jqxChart(settings);   
	
	var items = [];
	var value = [];
	for(let i = 0; i < menuData.length; i++) {
	   var item = {}
	   item.label = menuData[i].historyMenu;
	   item.value = i;
	   items.push(item);
	   value.push(i);
	}
	console.log('items');
	console.log(items);
	
	console.log('value');
	console.log(value);
	
	$("#menuCheckBoxGroup").jqxCheckBoxGroup({
		change: function (item) {
			console.log('length  -> ' + $("#menuCheckBoxGroup").val().length); 
			if (item.checked) {
				$('#jqxChart').jqxChart('showSerie', item.value, 0, NaN);
			} else {
				$('#jqxChart').jqxChart('hideSerie', item.value, 0, NaN);
			}
			
			if ($("#menuCheckBoxGroup").val().length == items.length) {
	        	// $("#allMenuCheckBox").jqxCheckBox('check')
				if ($("#allMenuCheckBox").val()!= true) {
					console.log('$("#menuCheckBoxGroup").val().length == items.length');
	            	$("#allMenuCheckBox").jqxCheckBox('check');
	            	//$("#allMenuCheckBox").val(true);               
	         	}
			} else if ($("#menuCheckBoxGroup").val().length > 0) {
				// $("#allMenuCheckBox").jqxCheckBox('uncheck')
	         	console.log('$("#menuCheckBoxGroup").val().length > 0');
	         	if($("#allMenuCheckBox").val() != false) {
					console.log('$("#allMenuCheckBox").val()!= false');
					$("#allMenuCheckBox").jqxCheckBox('uncheck');               
	         	}
			}
		},
		items: items,
		layout: "horizontal",
		theme: 'darkblue',
		value: value
	});   
	
	$("#allMenuCheckBox").on('change', function (event) {
		console.log('checkbox changed');
		if (event.args.checked) {
			console.log('$("#allMenuCheckBox") checked');
			let chkArr = value.filter(x => !$("#menuCheckBoxGroup").val().includes(x));
			chkArr.forEach(function(item){
				$("#menuCheckBoxGroup").jqxCheckBoxGroup('checkValue', item);
			})         
		} else {   
			console.log('$("#allMenuCheckBox") unchecked');
			if($("#menuCheckBoxGroup").val().length == items.length){
				console.log('$("#menuCheckBoxGroup").val().length == items.length');
				$("#menuCheckBoxGroup").jqxCheckBoxGroup('uncheckAll');         
			}
		}
	});
}

function initData() {
	//var data = goAjaxGet('/test', {}, function() {}) // 비동기로 동작 하기때문에 data = null
	//var data = goAjaxGet('/test', {}) // 동기로 동작 하기때문에 data 에 값이 담긴다.
}

function initEvent() {
	var $chart = $('#jqxChart').jqxChart('getInstance');
	
	$('#historyType').on('select', function (event) {
		var args = event.args;
		if (args != undefined) {
			var item = event.args.item;
			if (item != null) {
				console.log(item.label);
			}
			
			if (item.label == "일별" || item.label == "주별") {
            	$("#historyDate").jqxDateTimeInput({formatString: "yyyy/MM/dd"});
			}
			else if (item.label == "월별") {
				$("#historyDate").jqxDateTimeInput({formatString: "yyyy/MM"});
			}
		}
	});

	$("#historyDate").on('change', function (event) {      
		var selection = $("#historyDate").jqxDateTimeInput('getRange');
		if (selection.from != null) {
			console.log(selection);
			console.log("From: " + selection.from.toLocaleDateString("en-US") + " To: " + selection.to.toLocaleDateString("en-US"));
		}
	});
   
	$('#jqxbutton').click(function () {
		var selection = $("#historyDate").jqxDateTimeInput('getRange');
		var fDate = selection.from;
		var tDate = selection.to;
		var item = $('#historyType').jqxComboBox('getSelectedItem');      
		var checkMode = {'일별': 'YYYY/MM/DD', '주별': 'YYYY/MM/W', '월별': 'YYYY/MM'};      
		var menuData = ['사용자 관리', '그룹 관리', '메뉴 관리', '권한 관리', '코드 관리', '통계 조회', '나라 시장']
		
		var updateSeries = [];
		if (item.label === '일별') {
			$chart.description = '일별 조회 통계'
			$chart.xAxis.baseUnit = 'day';   
			$chart.xAxis.minValue = selection.from.toLocaleDateString().replace(/\./g, '').replace(/\s/g, '/');
			$chart.xAxis.maxValue = selection.to.toLocaleDateString().replace(/\./g, '').replace(/\s/g, '/');   
			$chart.xAxis.formatFunction = function (value) {
			   return value.getFullYear()+'/'+(value.getMonth()+1)+'/'+value.getDate();
			};
			
			for(let i=0; i<menuData.length; i++) {
			   var menu = menuData[i];
			   var param = {
			         historyMenu: menu
			         , fromDate: fDate.getFullYear()+'/'+(fDate.getMonth()+1)+'/'+fDate.getDate()
			         , toDate: tDate.getFullYear()+'/'+(tDate.getMonth()+1)+'/'+tDate.getDate()
			         , mode: checkMode[item.label]
			      }
			   var group = {};
			   group.type = 'line';
			   group.source = goAjaxGetWithoutLoader('/history/data', param);
			   group.series = [{dataField: 'historyCount', displayText: menu}];
			   updateSeries.push(group);
			}   
		}
		else if (item.label === '주별') {

		}
		else if (item.label === '월별') {
			$chart.description = '월별 조회 통계'
			$chart.xAxis.baseUnit = 'month';      
			$chart.xAxis.minValue = fDate.getFullYear()+'/'+(fDate.getMonth()+1);
			$chart.xAxis.maxValue = tDate.getFullYear()+'/'+(tDate.getMonth()+1);      
			$chart.xAxis.formatFunction = function (value) {
			   return  value.getFullYear() + '/' + (value.getMonth()+1);
			};
			
			for(let i=0; i<menuData.length; i++) {
			   var menu = menuData[i];
			   var param = {
			         historyMenu: menu
			         , fromDate: fDate.getFullYear()+'/'+(fDate.getMonth()+1)
			         , toDate: tDate.getFullYear()+'/'+(tDate.getMonth()+1)
			         , mode: checkMode[item.label]
			      }
			   var group = {};
			   group.type = 'line';
			   group.source = goAjaxGetWithoutLoader('/history/data', param);
			   group.series = [{dataField: 'historyCount', displayText: menu}];
			   updateSeries.push(group);
			}   
		}
		
		$chart.seriesGroups = updateSeries;
		$chart.update();
	});
}