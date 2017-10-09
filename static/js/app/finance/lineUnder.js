$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'code',
		title : '编号',
	},{
		field : 'type',
		title : '角色类型',
		type: 'select',
		key: 'account_type',
		keyCode:'802006',
		formatter: Dict.getNameForList('account_type','802006'),
		search: true
	},{
		field : 'payCardInfo',
		title : '开户行',
	},{
		field : 'channelBank',
		title : '行号',
	},{
		field : 'payCardNo',
		title : '银行卡号',
	},{
		field : 'accountName',
		title : '户名',
		search: true
	},{
		field : 'amount',
		title : '取现金额',
		formatter: moneyFormat
	},{
		field : 'amount1',
		title : '实际打款金额',
		formatter: function(v, data){
			return moneyFormat(data.amount-data.refAmount1-data.refAmount2);
		}
	},{
		field : 'status',
		title : '状态',
		type: 'select',
		key: 'withdraw_status',
		keyCode:'802006',
		formatter: Dict.getNameForList('withdraw_status','802006'),
		search: true
	},{
		field : 'applyUser',
		title : '申请人',
		formatter:function(v, data){
			if(data.user.kind=='01'||data.user.kind=='11'){
				return data.user.loginName;
			}else{
				return data.user.mobile;
			}
		},
		
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
	},{
		field : 'approveDatetime',
		title : '审核时间',
		formatter: dateTimeFormat, 
		field1 : 'approveDateStart',
		title1 : '审核时间',
		type1:'datetime',
		field2 : 'approveDateEnd',
		type2:'datetime',
        twoDate: true,
		search: true,
	}, {
		field : 'payDatetime',
		title : '回录时间',
		formatter: dateTimeFormat, 
		field1 : 'payDateStart',
		title1 : '回录时间',
		type1:'datetime',
		field2 : 'payDateEnd',
		type2:'datetime',
        twoDate: true,
		search: true,
	}];
	buildList({
		columns: columns,
		pageCode: '802755',
		singleSelect:false,
		searchParams: {
			channelType: '90',
			companyCode: OSS.company
		}
	});
	
	$("#detail1Btn").click(function () {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if (selRecords.length <= 0) {
			toastr.info("请选择记录");
			return;
		}
		location.href = "lineUnder_check.html?code=" + selRecords[0].code + "&detail=1";
	});
	
	$("#huiluBtn").click(function () {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if (selRecords.length <= 0) {
			toastr.info("请选择记录");
			return;
		}
        if(selRecords.length==1 && selRecords[0].status == 3 ){
        	
        	window.location.href = "lineUnder_huilu.html?code=" + selRecords[0].code;
        }else{
        	
	        var dataCode=[]
	        
	        for (var i=0; i<selRecords.length; i++) {
	        	dataCode.push(selRecords[i].code)
	        	
	        	if (selRecords[i].status != 3) {
		            toastr.info(selRecords[i].code+"状态不能回录!");
		            return;
		        }
	        	
	        }
	        
	        var dw = dialog({
					content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
					'<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">批量回录</li></ul>'+
					'</form>'
				});
				
			dw.showModal();
			
			buildDetail({
				fields: [{
					field: 'payNote',
					title: '回录说明',
					required: true,
					maxlength: 250
				}],
				buttons: [{
					title: '通过',
					handler: function() {
						if($('#payNote').val()==""){
							toastr.error("回录说明不能为空");
						}else{
							var data = $('#popForm').serializeObject();
							data.codeList = dataCode;
				    		data.payResult = "1";
							data.payUser = getUserName();
							reqApi({
								code: '802753',
								json: data
							}).done(function(data) {
								toastr.info("操作成功");
								
								$('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
								dw.close().remove();
							});
						}
						
					}
				}, {
					title: '不通过',
					handler: function() {
						if($('#payNote').val()==""){
							toastr.error("回录说明不能为空");
						}else{
							var data = $('#popForm').serializeObject();
							data.codeList = dataCode;
				    		data.payResult = '0';
							data.payUser = getUserName();
							reqApi({
								code: '802753',
								json: data
							}).done(function(data) {
								toastr.info("操作成功");
								$('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
								dw.close().remove();
							});
						}
					}
				}, {
					title: '取消',
					handler: function() {
						dw.close().remove();
					}
				}]
			});
			
			dw.__center();
		}
		
	});
	
	//审核
    $('#examineBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if(selRecords.length==1 && selRecords[0].status == 1){
        	
        	window.location.href = "lineUnder_check.html?Code=" + selRecords[0].code;
        }else{
        	
	        var dataCode=[]
	        
	        for (var i=0; i<selRecords.length; i++) {
	        	dataCode.push(selRecords[i].code)
	        	
	        	if (selRecords[i].status != 1) {
		            toastr.info(selRecords[i].code+"状态不能审核!");
		            return;
		        }
	        	
	        }
	        
	        var dw = dialog({
					content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
					'<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">批量审核</li></ul>'+
					'</form>'
				});
				
			dw.showModal();
			
			buildDetail({
				fields: [{
					field: 'approveNote',
					title: '审核意见',
					required: true,
					maxlength: 250
				}],
				buttons: [{
					title: '通过',
					handler: function() {
						if($('#approveNote').val()==""){
							toastr.error("审核意见不能为空");
						}else{
							var data = $('#popForm').serializeObject();
							data.codeList = dataCode;
				    		data.approveResult = "1";
				    		data.approveUser = getUserName();
							reqApi({
								code: '802752',
								json: data
							}).done(function(data) {
								toastr.info("操作成功");
								
								$('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
								dw.close().remove();
							});
						}
					}
				}, {
					title: '不通过',
					handler: function() {
						if($('#approveNote').val()==""){
							toastr.error("审核意见不能为空");
						}else{
							var data = $('#popForm').serializeObject();
							data.codeList = dataCode;
				    		data.approveResult = "0";
				    		data.approveUser = getUserName();
							reqApi({
								code: '802752',
								json: data
							}).done(function(data) {
								toastr.info("操作成功");
								$('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
								dw.close().remove();
							});
						}
					}
				}, {
					title: '取消',
					handler: function() {
						dw.close().remove();
					}
				}]
			});
			
			dw.__center();
		}
		
	});
});

