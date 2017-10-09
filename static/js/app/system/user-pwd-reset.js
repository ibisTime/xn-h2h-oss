$(function() {
	var userId = getQueryString('userId');
	
	var fields = [{
		field: 'userId',
		type: 'hidden',
		value: userId
	}, {
		field: 'adminUserId',
		type: 'hidden',
		value: getUserId()
	}, {
		title: '用户名',
		field: 'loginName',
		required: true,
		readonly: true
	}, {
		title: '新密码',
		field: 'loginPwd',
		type: 'password',
		required: true,
	}, {
		title: '管理员密码',
		field: 'adminPwd',
		type: 'password',
		required: true,
	}];
	
	buildDetail({
		fields: fields,
		code: {userId:userId},
		detailCode: '805121',
		editCode: '805065'
	});
});