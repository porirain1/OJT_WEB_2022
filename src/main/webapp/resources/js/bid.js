$(function() {
	initComponent();
	initData();
	
});

function initComponent() {
	$('#bidGrid').jqxGrid({
    	theme: 'darkblue'
        , source: []
        , columns: [
            {text: 	'업무', 			datafield: 'bidJob', 			width: '50',	renderer:columnrenderer}
            , {text:'공고번호-차수', 	datafield: 'bidNo', 			width: '150',	renderer:columnrenderer, cellsrenderer: leftAlignCellsRenderer}
            , {text:'분류',			datafield: 'bidType', 			width: '50',	renderer:columnrenderer}
            , {text:'공고명', 		datafield: 'bidName', 			width: '300',	renderer:columnrenderer, cellsrenderer: leftAlignCellsRenderer}
            , {text:'공고기관', 		datafield: 'bidOrg', 			width: '150',	renderer:columnrenderer}
            , {text:'수요기관', 		datafield: 'demandOrg', 		width: '150',	renderer:columnrenderer}
            , {text:'계약방법', 		datafield: 'contact', 			width: '150',	renderer:columnrenderer, cellsalign: 'right'}
            , {text:'입력일시', 		datafield: 'regDate', 			width: '160',	renderer:columnrenderer, cellsalign: 'right', hidden:true}
            , {text:'입찰마감일시', 	datafield: 'bidEndDate', 		width: '160',	renderer:columnrenderer, cellsalign: 'right'}
			, {text:'예가방법', 		datafield: 'eMethod', 			width: '300',	renderer:columnrenderer, cellsalign: 'right'}
			, {text:'공개여부', 		datafield: 'openYn', 			width: '100',	renderer:columnrenderer, cellsalign: 'right'}
			, {text:'사업금액', 		datafield: 'amount', 			width: '120',	renderer:columnrenderer, cellsrenderer: commaCellsRenderer}
			, {text:'추정가격', 		datafield: 'presumedValue', 	width: '120',	renderer:columnrenderer, cellsrenderer: commaCellsRenderer}
			, {text:'예산', 			datafield: 'budget', 			width: '120',	renderer:columnrenderer, cellsrenderer: commaCellsRenderer}
			, {text:'지역제한', 		datafield: 'limitedRegion', 	width: '10%',	renderer:columnrenderer, cellsalign: 'right'}
			, {text:'참가가능', 		datafield: 'possibleRegion', 	width: '10%',	renderer:columnrenderer, cellsalign: 'right'}
			, {text:'지사투찰허용여부', 	datafield: 'biddingStrategyYn', width: '10%',	renderer:columnrenderer, cellsalign: 'right'}
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
	    $("#bidGrid").jqxGrid('updatebounddata', 'sort');
	});   
	console.log('test');
	$('#bidGrid').on('rowdoubleclick', function (event) {
		var data = $('#bidGrid').jqxGrid('getrowdata', event.args.rowindex); 
	  	window.open(data.detailUrl, '_brank');
	});
}

function initData() {
	$('#bidGrid').jqxGrid('gotopage', 0);
	var param = {};
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