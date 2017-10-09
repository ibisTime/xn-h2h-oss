$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'code',
		title : '编号',
	},{
		field : 'accountName',
		title : '户名',
		search: true
	},{
		field: 'currency',
		title: '币种',
		type: 'select',
		key: 'currency',
		keyCode: "802006",
        formatter: Dict.getNameForList("currency",'802006'),
		search: true
	},{
		field: 'direction',
		title: '方向',
		type:'select',
		data:{
			'0': '红冲',
			'1': '蓝补'
		},
		search: true
	},{
		field: 'amount',
		title: '金额',
		formatter: moneyFormat
	}, {
		field : 'applyUser',
		title : '申请人'
	}, {
		field : 'applyDatetime',
		title : '申请时间',
		formatter: dateTimeFormat,
		field1 : 'applyDateStart',
		title1 : '申请时间',
		type1:'datetime',
		field2 : 'applyDateEnd',
		type2:'datetime',
        twoDate: true,
		search: true
	}, {
		field : 'approveUser',
		title : '审核人'
	}, {
		field : 'approveDatetime',
		title : '审核时间',
		formatter: dateTimeFormat,
		field1 : 'approveDateStart',
		title1 : '审核时间',
		type1:'datetime',
		field2 : 'approveDateEnd',
		type2:'datetime',
        twoDate: true,
		search: true
	},{
		field : 'status',
		title : '状态',
		type: 'select',
		key: 'hl_status',
		keyCode:'802006',
		formatter: Dict.getNameForList('hl_status','802006'),
		search: true
	},{
		field : 'jourCode',
		title : '流水编号',
		search: true
	}];
	
	buildList({
		columns: columns,
		pageCode: '802805',
		searchParams: {
			'channelType': '0',
			companyCode: OSS.company
		}
	});
	
	$("#examineBtn").click(function(){
		var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if(selRecords[0].status != 1 ){
        	toastr.info("不是可审批的状态");
            return;
        }
        
        window.location.href = "inRoughHand_check.html?Code=" + selRecords[0].code;
	})
});

