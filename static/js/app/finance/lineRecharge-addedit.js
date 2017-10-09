$(function() {
	var view= !!getQueryString('v');
	var userId= getQueryString('userId') || '';
	
	var bizTypeData = {}
	
	reqApi({
		code:'802006',
		json:{
			'parentKey':'biz_type'
		}
	}).done(function(d){
		    		
		d.forEach(function(v,i){
			if(v.dkey !== '-11' && v.dkey !== '200' ){
				bizTypeData[v.dkey] = v.dvalue
			}
		})
	
		var fields = [{
			field: 'accountNumber',
			title: '用户账户',
			required: true,
			type: 'select',
			pageCode: userId ? '802503' : '802500',
			keyCode1:'802006',
			dict: [['currency', 'currency'], ['type', 'account_type']],
			params: {
				currency: '',
				userId: userId
			},
			keyName: 'accountNumber',
			valueName: '{{realName.DATA}} - {{currencyName.DATA}} - {{typeName.DATA}}',
			searchName: 'realName',
			help: '支持户名查询'
		},{
			field : 'amount',
			title : '充值金额',
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
		}, {
	        field: 'bizType',
	        title: '业务类型',
	        type: 'select',
	        data: bizTypeData,
	        readonly: view,
	        required: true
	    },{
			field : 'applyNote',
			title : '充值说明',
			maxlength: 255
		}];
		
		var options = {
			fields: fields,
			addCode: '802700',
			view: view,
			beforeSubmit:function(data){
				data.applyUser = getUserId();
				return data;
			}
		};
		
		buildDetail(options);
	
	})
});