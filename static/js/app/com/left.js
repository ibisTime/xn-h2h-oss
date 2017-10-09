$(function() {
	function initMenu(parentCode){
		$('.left-top').removeClass('collapse');
		
		var firstClick = false;
		
		if (!parentCode) {
			window.parent.noRenderLeftMenu = true;
			return;
		}
		var data = {"parentCode":parentCode,"type":"1", 'roleCode': sessionStorage.getItem('roleCode')};
		
		// 一级菜单
		reqApi({
			code: '805026',
			json: data,
			sync: true 
		}, true).then(function(data) {
			data = data.sort(function(d, d1){
				return +d.orderNo - +d1.orderNo;
			})
			var html = '';
			$.each(data, function(i, item) {
				html += "<dd><div class=\"title\"><span><img src=\""+
					__uri('../images/leftico01.png')+"\" /></span>"+item.name+
				"</div></dd><ul style='display: none;' id=\""+item.code+"\" class=\"menuson\"></ul>";	
	        });
			$('.left-menu').eq(0).html(html);
			$('.left-menu .title').on('click', function(e) {
				var me = this;
				var $ul = $(me).parent().next();
				if (!$(me).attr('data-loaded')) {
					reqApi({
						code: '805026',
						json: {
							parentCode: $ul.attr('id'),
							type: '1',
							roleCode: sessionStorage.getItem('roleCode')
						}
					}, true).then(function(data) {
						// 二级菜单
						var html = '';
						$.each(data, function(i, nextItem) {
							var url = nextItem.url;
							if (url.indexOf('/') == 0) {
								url = url.replace('/', '');
							}
							if (url.lastIndexOf('l') !=0) {
								url = url + 'l';
							}
							html += "<li class='"+(url.indexOf('*') > -1 && 'disabled')+
								"' id=\""+nextItem.code+"\"><cite></cite><a id=\"child_menu_"+i+"\" href=\""
								+url + "\" target=\"rightFrame\">"+nextItem.name+"</a><i></i></li>"
				        });
						$(me).parent().next().html(html);
						$(me).attr('data-loaded', '1');
						//导航切换
						$("li", $ul).click(function(e){
							if ($(this).find('a').attr('href').indexOf('*') > -1) {
								e.preventDefault();
								return;
							}
							$(".menuson li.active").removeClass("active");
							$(this).addClass("active");
							
						});
						if (!firstClick) {
							$("#child_menu_0", $ul)[0] && $("#child_menu_0", $ul)[0].click();
							firstClick = true;
						}
						
					});
				} 
				if($ul.is(':visible')){
					$ul.slideUp();
				}else{
					$ul.slideDown();
				}
			});
			
			if (!firstClick) {
				$('.left-menu .title')[0].click();
			}
		});
	}
	window.initMenu = initMenu;
	initMenu($('.nav li a', window.parent.frames[0].document).attr('data-code'));
	$('.left-menu').slimscroll({
		height: $(document.body).height() - 40
	});
	var timer;
	$(window).on('resize', function() {
		clearTimeout(timer);
		timer = setTimeout(function() {
			$('.left-menu').slimscroll({
				height: $(document.body).height() - 40
			});
		}, 500);
	});
	$('.left-top').on('click', function() {
		if ($('.left-top').hasClass('collapse')) {
			$('.left-menu').find('ul').each(function(index, item) {
				$(item).slideDown();
			});
		} else {
			$('.left-menu').find('ul').each(function(index, item) {
				$(item).slideUp();
			});
		}
		$('.left-top').toggleClass('collapse');
	});
});