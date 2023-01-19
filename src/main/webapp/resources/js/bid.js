$(function() {
	initComponent();
	initData();
	
});

function initComponent() {
	$('.search-input').jqxInput({theme: 'darkblue', width: '150px', height: '25px'}); 
	
	$('.search-combo').jqxComboBox({theme: 'darkblue', source: ['일반','긴급','취소','변경','재입찰'], width: '80px', height: '25px',});
	$('.search-combo').find('input').attr('readonly', 'readonly');
	
	$('#search-btn').jqxButton({theme: 'darkblue', width: '100', height: '30'});
	$('#search-btn').on('click', function() {
		initData();
	});
	$('#bidGrid').jqxGrid({
    	theme: 'darkblue'
        , source: []
        , columns: [
            {text: '업무', 			datafield: 'bidJob', 			width: '50',	renderer:columnrenderer, cellsalign: 'center'}
            , {text:'공고번호-차수', 	datafield: 'bidNo', 			width: '150',	renderer:columnrenderer, cellsalign: 'left'}
            , {text:'분류',			datafield: 'bidType', 			width: '50',	renderer:columnrenderer, cellsalign: 'center'}
            , {text:'공고명', 		datafield: 'bidName', 			width: '300',	renderer:columnrenderer, cellsalign: 'left'}
            , {text:'공고기관', 		datafield: 'bidOrg', 			width: '150',	renderer:columnrenderer, cellsalign: 'left'}
            , {text:'수요기관', 		datafield: 'demandOrg', 		width: '150',	renderer:columnrenderer, cellsalign: 'left'}
            , {text:'계약방법', 		datafield: 'contact', 			width: '150',	renderer:columnrenderer, cellsalign: 'left'}
            , {text:'입력일시', 		datafield: 'regDate', 			width: '160',	renderer:columnrenderer, cellsalign: 'center'}
            , {text:'입찰마감일시', 	datafield: 'bidEndDate', 		width: '160',	renderer:columnrenderer, cellsalign: 'center'}
			, {text:'예가방법', 		datafield: 'eMethod', 			width: '300',	renderer:columnrenderer, cellsalign: 'center'}
			, {text:'공개여부', 		datafield: 'openYn', 			width: '100',	renderer:columnrenderer, cellsalign: 'center'}
			, {text:'사업금액', 		datafield: 'amount', 			width: '120',	renderer:columnrenderer, cellsrenderer: commaCellsRenderer}
			, {text:'추정가격', 		datafield: 'presumedValue', 	width: '120',	renderer:columnrenderer, cellsrenderer: commaCellsRenderer}
			, {text:'예산', 			datafield: 'budget', 			width: '120',	renderer:columnrenderer, cellsrenderer: commaCellsRenderer}
			, {text:'지역제한', 		datafield: 'limitedRegion', 	width: '10%',	renderer:columnrenderer, cellsalign: 'center'}
			, {text:'참가가능', 		datafield: 'possibleRegion', 	width: '10%',	renderer:columnrenderer, cellsalign: 'center'}
			, {text:'지사투찰허용여부', 	datafield: 'biddingStrategyYn', width: '10%',	renderer:columnrenderer, cellsalign: 'center'}
            , {datafield: 'crawlingDate', hidden: true}
			, {datafield: 'detailUrl', hidden: true}
        ]
        , width: '100%'
        , height: '100%'
		, columnsresize: true
    	, enabletooltips: true
    	, pageable: true
        , virtualmode: true
        , sortable: true
        , showsortmenuitems: false
        , pagermode: 'simple'
        , pagesize : 30
        , pagerbuttonscount: 10
        , rendergridrows: function(obj) {
        	return obj.data;     
		}
    });
	$('#bidGrid').on('sort', function () {
	    $('#bidGrid').jqxGrid('updatebounddata', 'sort');
	});   
	console.log('test');
	$('#bidGrid').on('rowdoubleclick', function (event) {
		var data = $('#bidGrid').jqxGrid('getrowdata', event.args.rowindex); 
	  	window.open(data.detailUrl, '_brank');
	});
}

function initData() {
	$('#bidGrid').jqxGrid('gotopage', 0);
	var param = {
		bidType : $('#bidType').jqxComboBox('getSelectedItem') == null ? null : $('#bidType').jqxComboBox('getSelectedItem').value
		, bidOrg : $('#bidOrg').val()
		, demandOrg : $('#demandOrg').val()
	};
	/*var inputCondition 	= $('#inputCondition').val();
	var inputText 		= $('#inputText').val().trim();
	
	var param = {
		'inputCondition': inputCondition
		, 'inputText': inputText
	}
	*/
	$('#bidGrid').jqxGrid('source', getPagingDataAdapter(param, '/bid/list', 'bidList'));
	$('#bidGrid').jqxGrid('clearselection');
}