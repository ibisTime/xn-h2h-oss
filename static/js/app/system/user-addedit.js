$(function() {
	
	var code = getQueryString('code');
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: 'P'
	}, {
		title: '用户名',
		field: 'loginName',
		required: true,
		maxlength: 30
	}, {
		title: '角色',
		field: 'roleCode',
		required: true,
		type: 'select',
		listCode: '805021',
		keyName: 'code',
		valueName: 'name'
	}, {
		title: '备注',
		field: 'remark',
		maxlength: 250
	}];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '805121',
		addCode: '805042'
	});
	
});