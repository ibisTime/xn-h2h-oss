$(function() {
	
	var fields = [{
		field: 'userId',
		type: 'hidden'
	}, {
		title: '旧登录密码',
		field: 'oldLoginPwd',
		required: true,
		type: 'password',
		maxlength: 30
	}, {
		title: '新登录密码',
		field: 'newLoginPwd',
		required: true,
		type: 'password',
		maxlength: 30
	}];
	
	buildDetail({
		fields: fields,
		code: {
			userId: getUserId()
		},
		detailCode: '805121'
	});
	
	$('#subBtn').off('click').click(function() {
		
        if ($('#jsForm').valid()) {
            var data = $('#jsForm').serializeObject();
            reqApi({
	            code: '805064',
	            json: data
	        }).done(function(data) {
	        	
			    toastr.success('操作成功');
			    
		        ajaxGet(OSS.mainUrl + '/logOut', {
		            token: window.sessionStorage.getItem('token')
		        }).then(function(res) {
		            if (res.errorCode == '0') {
		            	
		        		sleep(1000).then(function() {
			                window.sessionStorage.setItem('token', '');
			                window.sessionStorage.setItem('userId', '');
			                window.sessionStorage.setItem('userName', '');
			                window.sessionStorage.setItem('roleCode', '');
			                location.href = '../signin.html?kind=' + (sessionStorage.getItem('loginKind') || 'P')
			            
			        	});
			        }
			    });
	        	
	        });
            
        }
		
	})
});