function getPagingDataAdapter(searchParams, url, dataKey) {
	var source 		= {};
	source.data 	= searchParams;
	source.datatype = 'json';
	source.url 		= url;
	source.root 	= dataKey;
	source.cache 	= false;
	source.beforeprocessing = function(data) {		
		source.totalrecords = data.totalCount;
	}
	return new $.jqx.dataAdapter(source);
}

var columnrenderer = function(value) {
    return '<div style="text-align: center; margin-top: 9px;">' + value + '</div>';
}

var checkcolumnrenderer = function(value) {
    return '<div style="text-align: center; margin-top: 9px;">' + value + '<div style="float:right" class="show-toggle"></div></div>';
}

var columnleftrenderer = function(value) {
    return '<div style="text-align: left; margin-top: 9px;">' + value + '</div>';
}

var columnrightrenderer = function(value) {
    return '<div style="text-align: right; margin-top: 9px;">' + value + '</div>';
}

var defaultCellsRenderer = function(row, column, value) {
	if ( value == null || value == '' ) {
		return '<div style="text-align: center;">-</div>';
	}
	else {
		return '<div style="text-align: center;">' + value + '</div>';
	}
}

var rightAlignCellsRenderer = function(row, column, value) {
	if ( value == null || value == '' ) {
		return '<div style="text-align: center;">-</div>';
	}
	else {
		return '<div style="text-align: right;width: 100%;margin-left: 10px;">' + value + '</div>';
	}
}

var leftAlignCellsRenderer = function(row, column, value) {
	if ( value == null || value == '' ) {
		return '<div style="text-align: center;">-</div>';
	}
	else {
		return '<div style="text-align: left;width: 100%;margin-left: 10px;">' + value + '</div>';
	}
}

var commaCellsRenderer = function(row, column, value) {
	if ( value == null || value == '' ) {
		return '<div style="text-align: center;">-</div>';
	}
	else {
		return '<div style="text-align: right;width: 100%;margin-right: 10px;">' + parseInt(value).toLocaleString('ko-KR') + '</div>';
	}
}

function goAjaxGetWithoutLoader(url, param, callback) {
	var data = goAjaxMethod('GET', url, param, callback != null, callback, false); //비동기 사용
	return data;
}

function goAjaxPostWithoutLoader(url, param, callback) {
	var data = goAjaxMethod('POST', url, param, callback != null, callback, false); //비동기 사용
	return data;
}

function goAjaxGet(url, param, callback) {
	var data = goAjaxMethod('GET', url, param, callback != null, callback, true); //비동기 사용
	return data;
}

function goAjaxPost(url, param, callback) {
	var data = goAjaxMethod('POST', url, param, callback != null, callback, true); //비동기 사용
	return data;
}

function goAjaxMethod(method, url, param, async, callback, useLoader) {
	var response 		= null;
	var ajaxOption 		= {};
	ajaxOption.url 		= url;
	ajaxOption.type 	= method;
	ajaxOption.dataType = 'json';
	ajaxOption.async 	= async;
	ajaxOption.beforeSend = function() {
		// start progress 
		if ( useLoader == true ) {
			$('#jqxLoader').jqxLoader('open');
		}
	} 
	ajaxOption.complete = function() {
		// end progress 
		if ( useLoader == true ) {
			$('#jqxLoader').jqxLoader('close');
		}
	}
	
	if ( method == 'GET' ) {
		if ( param != null ) {
			if ( param instanceof Object ) {
				param = objectToQueryString(param);
			}
			ajaxOption.data = param;	
		}
	}
	else {
		ajaxOption.contentType 	= 'application/json; charset=UTF-8';
		if ( param != null ) {
			ajaxOption.data = JSON.stringify(param);	
		}	
	}
	
	if (callback != null) {
		$.ajax(ajaxOption).done(callback).fail(function(data) {
			if ( data.responseText != null && data.responseText.indexOf('loginForm') > 0 ) {
				window.location.href = '/logout';
			}
		});
	}
	else {
		$.ajax(ajaxOption).done(function(data) {
			response = data;
		}).fail(function(data) {
			if ( data != null && xhr.data.indexOf('loginForm') > 0 ) {
				window.location.href = '/logout';
			}
		});	

		return response;
	}
}

function objectToQueryString(json) {
    return Object.keys(json).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    }).join('&');
}

