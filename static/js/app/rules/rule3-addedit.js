$(function() {
	
	var code = getQueryString('code');
	var type = getQueryString('t');
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '1'
	},{
		title: '规则名称',
		field: 'remark',
        readonly: true,
		required: true,
		maxlength: 250
	},{
		title : '参数',
		field : 'ckey',
        readonly: true,
		required: true,
		maxlength: 20
	},{
        title: '数值',
        field: 'cvalue',
        required: true,
        maxlength: 255
	}];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '808916',
		editCode: '808910',
		beforeSubmit: function(data){
			data.remark = $('#remark').html();
			data.type = type;
			
			return data;
		}
	});
});