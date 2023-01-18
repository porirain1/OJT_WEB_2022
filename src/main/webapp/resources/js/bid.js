$(function() {
	initComponent();
	initData();
	
});

function initComponent() {
	$('#bidGrid').jqxGrid({
    	theme: 'darkblue'
        , source: []
        , columns: [
            {text: 	'업무', 			datafield: 'bidJob', 	width: '5%'}
            , {text:'공고번호-차수', 	datafield: 'bidNo', 	width: '10%'}
            , {text:'분류',			datafield: 'bidType', 	width: '10%'}
            , {text:'공고명', 		datafield: 'bidName', 	width: '10%'}
            , {text:'공고기관', 		datafield: 'bidOrg', 	width: '10%'}
            , {text:'수요기관', 		datafield: 'demandOrg', 	width: '10%'}
            , {text:'계약방법', 		datafield: 'contact', 	width: '10%'}
            , {text:'입력일시', 		datafield: 'regDate', 	width: '10%'}
            , {text:'입찰마감일시', 	datafield: 'bidEndDate', 	width: '10%'}
            , {datafield: 'crawlingDate', hidden: true}
        ]
        , width: '100%'
        , height: '100%'
    	, enabletooltips: true
    	, pageable: true
        , virtualmode: true
        , sortable: true
        , showsortmenuitems: false
        , pagermode: 'simple'
        , pagesize : 15
        , pagerbuttonscount: 10
        , rendergridrows: function(obj) {
        	return obj.data;     
		}
    });
    
	$('#bidGrid').on('sort', function () {
	    $("#bidGrid").jqxGrid('updatebounddata', 'sort');
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