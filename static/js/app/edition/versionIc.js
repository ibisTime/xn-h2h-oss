$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '规则名称'
	},{
		field : 'ckey',
		title : '参数',
		search: true
	},{
		field : 'cvalue',
		title : '数值'
	}];
	buildList({
		columns: columns,
		pageCode: '807715',
		searchParams: {
			type: 'ios_c',
			companyCode: OSS.company,
			orderColumn:'id',
			orderDir: 'asc'
		},
		beforeEdit: function(r) {
			location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
		}
	});
});
