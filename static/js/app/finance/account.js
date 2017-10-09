$(function() {
	
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'realName',
		title : '户名',
		search: true
	},{
		field: 'accountNumber',
		title: '账号'
	},{
		field: 'type',
		title: '类型',
		type: 'select',
		key: 'account_type',
		keyCode:'802006',
		formatter: Dict.getNameForList('account_type','802006'),
		search: true
	},{
		field : 'status',
		title : '状态',
		type: 'select',
		key: 'account_status',
		keyCode:'802006',
		formatter: Dict.getNameForList('account_status','802006'),
		search: true
	},{
    	field : 'amount',
		title : '余额',
		formatter: moneyFormat
    },{
    	field: 'frozenAmount',
    	title: '冻结金额',
    	formatter: moneyFormat
    },{
    	field: 'currency',
    	title: '币种',
    	type: 'select',
		key: 'currency',
		keyCode: "802006",
        formatter: Dict.getNameForList("currency",'802006'),
		search: true
    },{
		field : 'createDatetime',
		title : '创建时间',
		formatter: dateTimeFormat,
		field1 : 'dateStart',
		title1 : '创建时间',
		type1:'datetime',
		field2 : 'dateEnd',
		type2:'datetime',
        twoDate: true,
		search: true,
	}];
	buildList({
		router: 'account',
		columns: columns,
		pageCode: '802500',
		searchParams: {
			type: 'NOT_P',
			companyCode: OSS.company
		}
	});
	
	$('#flowBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			toastr.info("请选择记录");
			return;
		}
		window.location.href = "ledger.html?a=1&accountCode="+selRecords[0].accountNumber;
	});
	
});

