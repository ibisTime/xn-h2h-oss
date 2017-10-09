$(function() {
	var code = getQueryString('code');
	var view= !!getQueryString('v');
	var userId= getQueryString('userId') || '';
	
	var fields = [{
		field: 'bizType',
		type: 'hidden',
		value: '-11'
	},{
		field: 'accountNumber',
		title: '用户账户',
		required: true,
		type: 'select',
		pageCode: '802500',
		keyCode1:'802006',
		dict: [['currency', 'currency'], ['type', 'account_type']],
		params: {
			currency: 'FRB',
			userId: userId
		},
		keyName: 'accountNumber',
		valueName: '{{realName.DATA}} - {{currencyName.DATA}} - {{typeName.DATA}}',
		searchName: 'realName',
		help: '支持户名查询'
	},{
		field : 'amount',
		title : '取现金额',
		required: true,
		amount: true,
		formatter: moneyFormat
	},{
		field : 'payCardInfo',
		title : '开户行',
		required: true,
	},{
		field : 'payCardNo',
		title : '银行卡号',
        number: true,
        minlength: 15,
		required: true,
	},{
		field : 'applyNote',
		title : '申请说明',
		maxlength: 255
	}];
	
	var options = {
		fields: fields,
		code: code,
		addCode: '802751',
		detailCode: '802756',
		view: view,
		beforeSubmit: function(data){
			data.applyUser = getUserId();
			return data;
		}
	};
	
	buildDetail(options);

});