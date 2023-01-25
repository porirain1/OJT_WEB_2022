$(document).ready(function () {
	initComponent();
	initEvent();
});

function initComponent() {
	var layout = new jqxSplitLayout('#mainLayout', {  theme : 'darkblue',
		dataSource: [
			{
				orientation: 'horizontal',
				items: [
					{
        				modifiers: []
        				, size: '10%'
        				, content: 
    					          '<div class="nav_bar">'
    					                +'<div class="logo" style="color:white">바른개발 연구소</div>'
                                        +'<div class="user_info">'
                            		        +'<div class="user_name">홍길동님</div>'
                                            +'<input type="submit" value="로그아웃" id="jqxLogoutButton"/>'
                            	       	+'</div>'
                                    +'</div>'
                       }
                       , {
						   orientation: 'vertical',
						   items:[
							   {
								   modifiers: []
								   , size: '13%'
									
								   , content: '<div id="menu"></div>'
      	    					},
      	    					{
									modifiers: []
									, content: '<div id="content"></div>'
      	    					}
      					]
      				}
				]
			}
		]
		, ready: function() {
			$('#jqxLogoutButton').jqxButton({ theme : 'darkblue', width: '20%', height: '50%' });
			
			var menuSource = [
				{id:'menu_user', label:'사용자 관리', value:'/user/list'}
            	, {id:'menu_group', label:'그룹 관리', value:'/group/list'}
           		, {id:'menu_manage', label:'메뉴 관리', value:'/menu/list'}
            	, {id:'menu_authorization', label:'권한 관리', value:'/auth/list'}
            	, {id:'menu_code', label:'코드 관리', value:'/code/list'}
            	, {id:'menu_board', label:'이력 조회', value:''}
            	, {id:'menu_history', label:'통계 조회', value:'/history/list'}
				, {id:'menu_nara', label:'나라 시장', value:'/bid/index'}
            ];
        	$('#menu').jqxMenu({ theme : 'darkblue', width: '100%', height: '100%', mode: 'vertical', source:menuSource});
			$('#menu').on('itemclick', function(event) {
				var menuUrl = $(event.target).attr('item-value'); // menuSource 셋팅할때 value로 넣은 값은 item-value 속성으로 만들어짐.
				if ( menuUrl != '' ) {
					$('#content').load(menuUrl, null, function(response) {
						console.log(menuUrl[event.target.id]);	
					})
				}
				/*if(menuUrl[event.target.id] !== null) { 
					$('#content').load(menuUrl[event.target.id], null, function(response) {
						console.log(menuUrl[event.target.id]);	
					})
				}*/
			});
         }
	})	
}

function initEvent() {
	var menuUrl = {
		  menu_user: '/user/list'
		, menu_group: '/group/list'
		, menu_manage: '/menu/list'
		, menu_authorization: '/auth/list'
		, menu_code: null
		, menu_history: null
		, menu_board: null
	}
	
}