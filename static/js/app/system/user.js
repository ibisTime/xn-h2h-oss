$(function(){

	var router = '/user';
	
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	}, {
		field : 'loginName',
		title : '用户名',
		search: true
	}, {
		field: 'status',
		title: '状态',
		formatter : Dict.getNameForList('user_status'),
		type: 'select',
		key: 'user_status'
	}, {
		field: 'roleCode',
		title: '角色',
		type: 'select',
		listCode: '805021',
		keyName: 'code',
		valueName: 'name',
		search: true
	}, {
    	field: 'remark',
    	title: '备注'
    }];
	buildList({
		router: 'user',
		columns: columns,
		pageCode: '805120',
		searchParams: {
			kind: 'P',
			companyCode: OSS.company
		}
	});
	
	$('#assignBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			toastr.info("请选择记录");
			return;
		}
		window.location.href = "user_role.html?userId="+selRecords[0].userId+"&loginName="+encodeURI(encodeURI(selRecords[0].loginName))+"&kind="+selRecords[0].kind;
	});
	
	$('#resetBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			toastr.info("请选择记录");
			return;
		}
		location.href = "user_pwd_reset.html?userId=" + selRecords[0].userId + '&loginName=' + selRecords[0].loginName;
	});
	
	//激活
	$('#activeBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			toastr.info("请选择记录");
			return;
		}
		
		if(selRecords[0].status == 0){
			toastr.info("已激活");
			return;
		}
		
		
		confirm("确定激活？").then(function() {
	    	reqApi({
				code: '805091',
				json: {
					userId: selRecords[0].userId,
					toStatus: '0',
					remark: selRecords[0].remark
				}
			}).then(function() {
				sucList();
			});
		
		},function() {})
	});
	
	//注销
	$('#rockBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			toastr.info("请选择记录");
			return;
		}
		
		if(selRecords[0].status == 2){
			toastr.info("已注销");
			return;
		}
		
		confirm("确定注销？").then(function() {
			reqApi({
				code: '805091',
				json: {
					userId: selRecords[0].userId,
					toStatus: '2',
					remark: selRecords[0].remark
				}
			}).then(function() {
				sucList();
			});
		
		},function() {})
	});
	
});

