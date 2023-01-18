$(document).ready(function () {
	$.get('/user/get', {}, function(response) {
   		console.log(response[0]);
			var source =
	        {
	        	dataType: 'json',
	        	localData: response,
	     		dataFields: [
	     			{ name: 'userNum', type: 'number'},
	     	        { name: 'userId', type: 'string'},
	     	        { name: 'userPasswd', type: 'string'},
	     	        { name: 'userName', type:'string'},
	     	        { name: 'userEmail', type: 'string'},
	     	        { name: 'userAddress', type:'string'}
		    	]
		    };
	        var dataAdapter = new $.jqx.dataAdapter(source);        
	        $('#dataTable').jqxDataTable(
		    {
		    	width: 550,
	 			height:400,
	 			pageable: true,
	 			pagerButtonsCount: 10,
	 			theme: 'darkblue',
	 			source: dataAdapter,
	 			columnsResize: true,
	 			columns: [
	 	              { text: '회원번호', dataField: 'userNum', width: 100 },
	 	              { text: 'ID', dataField: 'userId', width: 100 },
	 	              { text: '이름', dataField: 'userName', width: 100 },
	 	              { text: '이메일', dataField: 'userEmail', width: 150 },
	 	              { text: '주소', dataField: 'userAddress', width: 100 },
	 	        ]
		     }); 	

		$('#jqxbutton').jqxButton({
		    theme: 'darkblue',
		    width: 200,
		    height: 30
		});
		
		$('#dataTable').on('rowDoubleClick', function(event) {
        	var rows = event.args.row;
        	
        	$('#content').load('/user/detail', null, function() {
       			$('input[name=userNum]').val(rows.userNum);
       			$('input[name=userId]').val(rows.userId);
       			$('input[name=userPasswd]').val(rows.userPasswd);
       			$('input[name=userName]').val(rows.userName);
       			$('input[name=userEmail]').val(rows.userEmail);
       			$('input[name=userAddress]').val(rows.userAddress);
			    });
      		});
      });	
});
