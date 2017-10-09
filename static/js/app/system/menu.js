$(function() {
	
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	}, {
		field : 'name',
		title : '菜单名称',
		search: true
	}, {
		field : 'url',
		title : '菜单url'
	}, {
		field : 'parentCode',
		title : '父菜单编号',
		type : 'select',
		listCode: '805001',
		params: {
			type: '1'
		},
		keyName: 'code',
		valueName: '{{code.DATA}} {{name.DATA}}',
		search: true
	}, {
		field : 'type',
		title : '类型',
		type : 'select',
		data: {'1': '菜单', '2': '按钮'},
		search: true
	}, {
		field : 'orderNo',
		title : '菜单顺序'
	}, {
		field : 'remark',
		title : '备注'
	}];

	buildList({
		router: 'menu',
		columns: columns,
		pageCode: '805000',
		deleteCode: '805004'
	});
});