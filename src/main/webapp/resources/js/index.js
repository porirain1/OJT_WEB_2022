$(document).ready(function () {
	var layout = new jqxSplitLayout("#mainLayout", {
		dataSource: [
			{
				orientation: "horizontal",
				items: [
					{
        				modifiers: []
        				, size: '15%'
        				, content: 
    					          `<div class="nav_bar">
    					                <div class="logo">바른개발 연구소</div>
                                            <div class="user_info">
                            		        <div class="user_name">홍길동님</div>
                                            <input type="submit" value="로그아웃" id='jqxLogoutButton'/>
                            	       	</div>
                                    </div>`
                       }
                       , {
						   orientation: "vertical",
						   items:[
							   {
								   modifiers: []
								   , size: '20%'
								   , content: `<div id="menu"></div>`
      	    					},
      	    					{
									modifiers: []
									, size: '80%'
									, content: `<div id="content"></div>`
      	    					}
      					]
      				}
				]
			}
		]
		, ready: function() {
			$("#jqxLogoutButton").jqxButton({ width: '20%', height: '50%' });
			
			var menuSource = [
				{id:'menu_user', label:'사용자 관리'}
            	, {id:'menu_group', label:'그룹 관리'}
           		, {id:'menu_manage', label:'메뉴 관리'}
            	, {id:'menu_authorization', label:'권한 관리'}
            	, {id:'menu_code', label:'코드 관리'}
            	, {id:'menu_history', label:'이력 조회'}
            	, {id:'menu_board', label:'통계 조회'}
            ];
        	$("#menu").jqxMenu({ width: '100%', height: '100%', mode: 'vertical', source:menuSource});
        	
        	$('#menu').on('itemclick', function(event) {
				console.log(event.target.id);
            });
         }
	})
});
		
