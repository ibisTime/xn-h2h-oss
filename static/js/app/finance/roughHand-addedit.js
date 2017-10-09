$(function() {
	var code = getQueryString('code');
	var jourCode = getQueryString('jourCode');
	var view= getQueryString('v');
	
	var fields = [{
		field : 'code1',
		title : '编号',
		readonly: true,
		formatter: function(v, data){
			return data.code
		}
	},{
		field : 'accountName',
		title : '户名',
		readonly: true
	},{
		field: 'currency',
		title: '币种',
		type: 'select',
		key: 'currency',
		keyCode: "802006",
        formatter: Dict.getNameForList("currency",'802006'),
		readonly: true
	},{
		field: 'direction',
		title: '方向',
		type:'select',
		data:{
			'0': '红冲',
			'1': '蓝补'
		},
		readonly: true
	},{
		field: 'amount',
		title: '金额',
		formatter: moneyFormat,
		readonly: true
	},{
		field : 'status',
		title : '状态',
		type: 'select',
		key: 'hl_status',
		keyCode:'802006',
		formatter: Dict.getNameForList('hl_status','802006'),
		readonly: true
	}, {
		field : 'applyUser',
		title : '申请人',
		readonly: true
	}, {
		field : 'applyDatetime',
		title : '申请时间',
		formatter: dateTimeFormat,
		readonly: true
	}, {
		field: 'jourList',
        title: '流水明细:',
		readonly: true,
        type: 'o2m',
        columns:[{
			field : 'code',
			title : '流水号',
			formatter:function(v,data){
				return data.code
			}
		},{
			field : 'realName',
			title : '户名',
			formatter:function(v,data){
				return data.realName
			}
		},{
			field: 'currency',
			title: '币种',
			formatter:function(v,data){
				return Dict.getNameForList1("currency",'802006',data.currency)
			}
		},{
			field: 'channelType',
			title: '渠道',
			type: 'select',
			key: 'channel_type',
			keyCode:'802006',
			formatter:function(v,data){
				return Dict.getNameForList1("channel_type",'802006',data.channelType)
			}
		},{
			field : 'bizType',
			title : '业务类型',
			type: 'select',
			key: 'biz_type',
			keyCode:'802006',
			formatter:function(v,data){
				return Dict.getNameForList1("biz_type",'802006',data.bizType)
			}
		},{
	    	field : 'transAmount',
			title : '变动金额',
			formatter:function(v,data){
				return moneyFormat(data.transAmount)
			}
	    },{
	    	field: 'preAmount',
	    	title: '变动前金额',
			formatter:function(v,data){
				return moneyFormat(data.preAmount)
			}
	    },{
	    	field: 'postAmount',
	    	title: '变动后金额',
			formatter:function(v,data){
				return moneyFormat(data.postAmount)
			}
	    },{
			field : 'status',
			title : '状态',
			type: 'select',
			key: 'jour_status',
			keyCode:'802006',
			formatter:function(v,data){
				return Dict.getNameForList1("jour_status",'802006',data.status)
			}
		},{
			field : 'createDatetime',
			title : '创建时间',
			formatter:function(v,data){
				return dateTimeFormat(data.createDatetime)
			}
		}]
	},{
		field : 'approveUser',
		title : '审核人',
		readonly: true
	}, {
		field : 'approveDatetime',
		title : '审核时间',
		formatter: dateTimeFormat,
		readonly: true
	}, {
		title: '意见说明',
		field: 'approveNote',
		readonly: true
	}];
	
	var options = {
		fields: fields,
		code: code,
		detailCode: '802806',
		view:view
	};
	
	buildDetail(options);
});