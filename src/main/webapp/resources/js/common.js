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

