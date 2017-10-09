$(function() {
	
	$("#mobile").val(getQueryString("mobile"));
	
	var userId = getQueryString("userId");
	
	//下拉菜单
	$.when(reqApi({ // 所有菜单
		code: '805207',
		json: {
			userId: userId
		}
	})).then(function(d) {
		
		var ligerTreeData = [];
		
		d.forEach(function(d, i){
			
			var tmpl = {
				userId:d.userId,
				userReferee: d.userReferee,
				name: d.realName ? d.mobile + " - " +d.realName : d.mobile
			}
			
			ligerTreeData.push(tmpl)
		})
		
		$("#treeMenu").ligerTree({
			nodeWidth:300,
			data:ligerTreeData,
			checkbox: false,
			isExpand: true,
			idFieldName: 'userId',
	        parentIDFieldName: 'userReferee',
	        textFieldName: 'name',
            parentIcon: 'user',
            childIcon: 'user' ,
		});
		
	});
	
	
	//返回
	$('#backBtn').click(function() {
		goBack();
	});
});

