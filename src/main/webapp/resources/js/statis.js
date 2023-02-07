$(document).ready(function () {
	initComponent();
	initData();
	initEvent();
});

function initComponent() {
	
	var authData = goAjaxGet('/auth/get');
	
	
	for (var i = 0; i < authData.length; i++) {
		var createCheckBox = document.createElement('div');
		createCheckBox.id = 'jqxcheckbox' + i;
		createCheckBox.setAttribute('name', 'checkBox');
		createCheckBox.setAttribute('onclick', 'checkSelectAll()');
		createCheckBox.innerHTML = authData[i].authName;
		$('#checkBox').append(createCheckBox);
		console.log('forforfor : ', i);
	}
	$('#selectAll').jqxCheckBox({ width: 120, height: 25, theme: 'darkblue' }); 
	for (var i = 0; i < authData.length; i++) {
		$('#jqxcheckbox' + i).jqxCheckBox({ width: 120, height: 25, theme: 'darkblue' });
	}
}

function initData() {

	var allData = goAjaxGet('/statis/get');
	//var data2 = JSON.stringify(data)
	console.log('statis Data2 : ', allData);

	// prepare jqxChart settings
	var settings = {
    	title: null,
        description: null,
        padding: { left: 20, top: 20, right: 20, bottom: 20 },
        source: allData,
        categoryAxis:{
        	dataField: 'authName',
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
				{ dataField: 'count', displayText: '사용자 수' },
            ]
		}]
	};
            
	// select the chartContainer DIV element and render the chart.
	$('#chartContainer').jqxChart(settings);
}

function initEvent() {
	
}

function checkSelectAll()  {
  // 전체 체크박스
  const checkboxes 	= document.querySelectorAll('div[name="checkBox"]');
  // 선택된 체크박스
  const checked 	= document.querySelectorAll('div[name="checkBox"]:checked');
  // select all 체크박스
  const selectAll	= document.querySelector('div[name="selectAll"]');
  
  if(checkboxes.length === checked.length)  {
    selectAll.checked = true;
  }else {
    selectAll.checked = false;
  }
  console.log('4567');
}

function selectAll(selectAll)  {
  const checkboxes 
     = document.getElementsByName('checkBox');
  
  checkboxes.forEach((checkBox) => {
    checkBox.checked = selectAll.checked
  })
  console.log('1234');
}