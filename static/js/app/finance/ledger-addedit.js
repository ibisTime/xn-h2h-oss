$(function() {
	var code = getQueryString('code');
	var view= getQueryString('v');
	
	var fields = [{
		title: '流水编号',
		field: 'code1',
		'[value]': 'code',
		readonly: view
	},{
		title: '户名',
		field: 'realName',
		required: true,
		maxlength: 32,
		readonly: view
	}, {
		title: '账号',
		field: 'accountNumber',
		required: true,
		readonly: view
	}, {
		field: 'currency',
		title: '币种',
		type: 'select',
		key: 'currency',
		keyCode: "802006",
        formatter: Dict.getNameForList("currency",'802006'),
		readonly: view
	}, {
		field : 'channelType',
		title : '渠道类型',
		type: 'select',
		key: 'channel_type',
		keyCode:'802006',
		formatter: Dict.getNameForList('channel_type','802006'),
		readonly: view
	}, {
		field: 'channelOrder',
		title: '渠道单号',
		readonly: view
	}, {
		field : 'bizType',
		title : '业务类型',
		type: 'select',
		key: 'biz_type',
		keyCode:'802006',
		formatter: Dict.getNameForList('biz_type','802006'),
		readonly: view
	}, {
		field: 'bizNote',
		title: '业务说明'
	}, {
		field: 'transAmount',
		title: '变动金额',
		formatter: moneyFormat,
		readonly: view
	}, {
		field: 'preAmount',
		title: '变动前金额',
		formatter: moneyFormat,
		readonly: view
	}, {
		field: 'postAmount',
		title: '变动后金额',
		formatter: moneyFormat,
		readonly: view
	}, {
		field: 'createDatetime',
		title: '金额変动时间',
		formatter: dateTimeFormat,
		readonly: view
	}, {
		field : 'status',
		title : '状态',
		type: 'select',
		key: 'jour_status',
		keyCode:'802006',
		formatter: Dict.getNameForList('jour_status','802006'),
		readonly: view
	}, {
		field: 'workDate',
		title: '拟对账时间',
		readonly: view
	}, {
		field: 'checkUser',
		title: '对账人',
		readonly: view
	}, {
		field: 'checkDatetime',
		title: '对账时间',
		formatter: dateTimeFormat,
		readonly: view
	}, {
		field: 'adjustUser',
		title: '调账人',
		readonly: view
	}, {
		field: 'adjustDatetime',
		title: '调账时间',
		formatter: dateTimeFormat,
		readonly: view
	}, {
		title: '备注',
		field: 'remark',
		maxlength: 250,
		readonly: view
	}];
	
	var options = {
		fields: fields,
		code: code,
		detailCode: '802522',
		view: view
	};
	
	buildDetail(options);
});