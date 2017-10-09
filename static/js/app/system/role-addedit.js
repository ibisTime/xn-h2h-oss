$(function() {
	
	var code = getQueryString('code');
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '1'
	}, {
		field: 'updater',
		type: 'hidden',
		value: getUserName()
	}, {
		title: '角色名称',
		field: 'name',
		required: true,
		maxlength: 30
	}, {
		title: '角色等级',
		field: 'level',
		required: true,
		type: 'select',
		key: 'role_level'
	}, {
		title: '备注',
		field: 'remark',
		maxlength: 250
	}];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '805022',
		addCode: '805023',
		editCode: '805025'
	});
	
});