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
