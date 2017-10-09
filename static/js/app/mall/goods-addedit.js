$(function() {
	
	var code = getQueryString('code');
	var type = getQueryString('type')
	var view = getQueryString('v');
	var pcode;
	var codeInd=0;
	var paramIndex=0;
	
	var provinceData={};
	var typeData={};
	var productSpecsFields = [];
	var fields = [];
	
	$.get(__uri('../../lib/province_data.xml'),function(xml){
		
		var docXml = xml;
		var $provinceXml = $(docXml).find("province")
		
		$provinceXml.each(function(i,d){
			provinceData[$(d).attr("name")]=$(d).attr("name");
	    });
		
	});
	
	//商品类别
	//积分商品修改
	if(type==OSS.JFProductType){
		typeData[OSS.JFProductType]='积分商品';
		
		setFields();
	}else{
		reqApi({
			code:'808007',
			json:{
				type:1,
				status:'1',
				parentCode: 0,
			},
			sync: true
		}).done(function(data){
			data.forEach(function(d, i){
				if(code){
					//修改页类别
					if(d.code!=OSS.JFProductType){
						typeData[d.code]=d.name
					}
				}else{
					typeData[d.code]=d.name
				}
			})
			
			setFields();
		})
	}
	
	
	function setFields(){
		//规格
		productSpecsFields = [{
	        field: 'name',
	        title: '规格名称',
			required: true,
	    }, {
	        field: 'originalPrice',
	        title: '原价/市场价',
	        required: true,
	        amount: true,
	        formatter: moneyFormat,
	    }, type==OSS.JFProductType ?{
	        field: 'price2',
	        title: '价格',
	        amount: true,
	        formatter: moneyFormat,
	        required: true,
	    }:{
	        field: 'price1',
	        title: '价格',
	        amount: true,
	        formatter: moneyFormat,
	        required: true,
	    }, {
			field: 'quantity',
			title: '库存',
			required: true,
			number: true
		}, {
			field: 'province',
			title: '发货地',
			type:'select',
			onlyProvince: true,
			data:provinceData,
			required: true,
		}, {
			field: 'weight',
			title: '重量（kg）',
			required: true,
			number: true
		}, {
			field: 'orderNo',
			title: '序号',
			required: true,
			number: true
		}]
		
		
		//详情
		fields = [{
			field: 'kind',
			type: 'hidden',
			value: '1'
		}, {
	        field: 'type',
	        title: '类别',
			type: 'select',
			data: typeData,
	        required: true,
	    }, {
	        field: 'name',
	        title: '商品名称',
	        required: true,
	        maxlength: 50
	    }, {
	        field: 'slogan',
	        title: '广告语',
	        required: true,
	        maxlength: 250,
	    }, {
	        field: 'advPic',
	        title: '广告图',
	        type : 'img',
	        single: true,
			required: true
	    }, {
	        field: 'pic',
	        title: '展示图',
	        type : 'img',
			required: true
	    }, {
	        title: '商品详述',
	        field: 'description',
	        type: 'textarea',
	        required: true,
	    },{
	        field: 'remark',
	        title: '备注',
	    }];
		
		buildDetail({
			fields: fields,
			code: code,
			detailCode: '808026',
			addCode: '808010',
			editCode: '808012',
			buttons: {},
		});
		
		$('#tableList').bootstrapTable({
		    columns: [{
				field : '',
				title : '',
				checkbox: true
			},{  
		        field: 'name',
		        title: '规格名称',
		    }, {
		        field: 'originalPrice',
		        title: '原价/市场价',
		        amount: true,
		        formatter: moneyFormat,
		    }, type==OSS.JFProductType?{
		        field: 'price2',
		        title: '价格',
		        formatter: moneyFormat,
		    }:{
		        field: 'price1',
		        title: '价格',
		        formatter: moneyFormat,
		    }, {
				field: 'quantity',
				title: '库存',
			}, {
				field: 'province',
				title: '发货地',
			}, {
				field: 'weight',
				title: '重量（kg）',
			}, {
				field: 'orderNo',
				title: '序号',
			}],
			singleSelect: true,//禁止多选
			clickToSelect: true,//自动选中
			uniqueId: 'id',
			onClickRow : function(row, $element) {
			    paramIndex = $element.data('index')
			}
		});
	}
	
	if(code){
		reqApi({code:'808026',json:{code:code}}).done(function(d){
			pcode = d.code
			$('#tableList').bootstrapTable('prepend', d.productSpecsList)
		})
		
	}
	
	//添加
	$("#addBtn").click(function(){
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		var dw = dialog({
			content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
			'<ul class="form-info" id="formContainer"></ul>'+
			'</form>'
		});
		
		dw.showModal();
		buildDetail({
			fields: productSpecsFields,
			container: $('#formContainer'),
			buttons: [{
				title: '保存',
				handler: function() {
					
					if ($('#popForm').valid()) {
						var data = $('#popForm').serializeObject();
				        data.code = codeInd++;
				        
				        $('#tableList').bootstrapTable('insertRow',{
				        	index:data.code,
				        	row:data
				  		});
				        toastr.info("添加成功");
						dw.close().remove();
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
	})
	
	//删除
	$("#deleteBtn").click(function(){
        
        var selRecords=$('#tableList').bootstrapTable('getSelections');
        
        if (selRecords.length != 1 ) {
            toastr.info("请选择记录");
            return;
        }
        $('#tableList').bootstrapTable('remove', {
        	field:"code",
        	values:[selRecords[0].code]
        });
        toastr.info("删除成功");
	})
	
	//修改
	$("#edit2Btn").click(function(){
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		
		 if (selRecords.length != 1 ) {
            toastr.info("请选择记录");
            return;
        }
		
		var dw = dialog({
			content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
			'<ul class="form-info" id="formContainer"></ul>'+
			'</form>'
		});
		
		buildDetail({
			fields: productSpecsFields,
			container: $('#formContainer'),
			buttons: [{
				title: '保存',
				handler: function() {
					
					if ($('#popForm').valid()) {
						var data = $('#popForm').serializeObject();
						
				        	$('#tableList').bootstrapTable('updateRow', {
					        	index:paramIndex,
					        	row:data
					        })
			        		toastr.info("修改成功");
			        		$('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
				        
						dw.close().remove();
					}
				}
			}, {
				title: '取消',
				handler: function() {
					dw.close().remove();
				}
			}]
		});
		
		$('#popForm #name').val(selRecords[0].name)
		$('#popForm #originalPrice').val(moneyFormat(selRecords[0].originalPrice))
		$('#popForm #price1').val(moneyFormat(selRecords[0].price1))
		$('#popForm #price2').val(moneyFormat(selRecords[0].price2))
		$('#popForm #quantity').val(selRecords[0].quantity)
		$('#popForm #province').val(selRecords[0].province)
		$('#popForm #weight').val(selRecords[0].weight)
		$('#popForm #orderNo').val(selRecords[0].orderNo)
		
		dw.showModal();
		dw.__center();
	})
	

	$('#sub1Btn').off("click").click(function() {
		
		if ($('#jsForm').valid()) {
			var data = $('#jsForm').serializeObject();
			$('#jsForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
				var values = [];
				var imgs = $(el).find('.img-ctn');
				imgs.each(function(index, img) {
					values.push($(img).attr('data-src') || $(img).find('img').attr('data-src'));
				});
				data[el.id] = values.join('||');
			});
			for (var i = 0, len = fields.length; i < len; i++) {
				var item = fields[i];
				if (item.equal && (!$('#' + item.field).is(':hidden') || !$('#' + item.field + 'Img').is(':hidden'))) {
					data[item.equal] = $('#' + item.field).val() || $('#' + item.field).attr('src');
				} else if (item.emptyValue && !data[item.field]) {
					data[item.field] = item.emptyValue;
				} else if (item.readonly && item.pass) {
					data[item.field] = $('#' + item.field).attr('data-value') || $('#' + item.field).html();
				}
				if (item.type == 'select' && item.passValue) {
					data[item.field] = $('#' + item.field).find('option:selected').html();
				}
			}
			data['id'] = data['code'];
			data.productSpecsList = $('#tableList').bootstrapTable("getData",{useCurrentPage:true});
			
			if(!code&&data.type == 'J01'){
				data.productSpecsList.each(function(v, i){
					data.productSpecsList[i].price2 = data.productSpecsList[i].price1;
					data.productSpecsList[i].price1= 0;
				})
			}
			
			reqApi({
				code: code?'808012':'808010',
				json: data
			}).done(function(data) {
				sucDetail();
			});

		}
	});

	$('#back1Btn').off("click").click(function() {
		goBack();
	});
	
});