$('title').html(OSS.systemName);
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return '';
}
sessionStorage.setItem('loginKind', getQueryString('kind') || 'P');
sessionStorage.setItem('listSearchs', '');
$(function() {
	$('#hello-text').html(OSS.systemName);
	$('#footer-system').html(OSS.companyName);
    window.sessionStorage.setItem('systemCode', OSS.system);
    // frameset框架嵌套，跳转到最外层
    if (top.location != self.location) {
        top.location = self.location;
    }

    function login() {
        if (!$('#loginName').val()) {
            toastr.info('请输入用户名');
            $('#loginName')[0].focus();
        } else if (!$('#loginPwd').val()) {
            toastr.info('请输入密码');
            $('#loginPwd')[0].focus();
        } else {
            var data = {};
            var t = $('#loginForm').serializeArray();
            var kind = 'kind';
            var reg = new RegExp('(^|&)' + kind + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                data.kind = decodeURIComponent(r[2]);
            } else {
                data.kind = 'P';
            }

            $.each(t, function() {
                data[this.name] = this.value;
            });
			
			//获取七牛地址
			reqApi({
	            code: '805917',
	            json: {
	            	ckey:'qiniu_domain'
	            },
				sync: true
	        }).then(function(data) {
	            window.sessionStorage.setItem('qiniuUrl', 'http://'+data.cvalue);
	        });
			
			//获取用户详情
            reqApi({
                code: '805050',
                json: data,
				sync: true
            }).then(function(data) {
                location.href = "main.html";
                window.sessionStorage.setItem('token', data.token || data.userId);
                window.sessionStorage.setItem('userId', data.userId);
            });
        }
    }
    
    // 登录
    $('#loginBtn').click(function() {
        login();
    });

    $(document).on('keyup', function(e) {
        if (e.keyCode == '13') {
            login();
        }
    });

    // swiper
    var mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 0,
        //effect : 'flip',
        observer: true,
        observeParents: true,
        threshold: 30,
        pagination: '.tabs',
        paginationClickable: true,
        bulletClass: 'tab',
        onlyExternal: true,
        bulletActiveClass: 'active',
        //        //loop: true,
        paginationBulletRender: function(index, className) {
            var html = '';
            switch (index) {
                case 0:
                    html = '<a class="' + className + '" style="margin-right: 200px;">用户登录</a>';
                    break;
                case 1:
                    html = '<a class="' + className + '">忘记密码？</a>';
                    break;
                default:
                    html = '';
            }
            return html;
        }
    });

    function count(el, second) {
        el.prop('disabled', true);
        var timer = setInterval(function() {
            second--;
            el.val('重发(' + second + ')');
            if (second == 0) {
                el.val('获取验证码');
                el.prop('disabled', false);
                clearInterval(timer);
            }
        }, 1000);
    }

    $('#smsBtn').on('click', function() {
        if (!$('#loginName1').val()) {
            alert('请输入用户名');
        } else {
            $('#smsBtn').prop('disabled', true);
            doPostAjax($("#basePath").val() + "/user/pwd/find/sms", {
                loginName: $('#loginName1').val()
            }, function(res) {
                $('#smsBtn').prop('disabled', false);
                if (res.success) {
                    count($('#smsBtn'), 60);
                } else {
                    alert('该用户无手机号，请联系管理员。');
                }
            });
        }
    });

    $('#confirmBtn').on('click', function() {
        if (!$('#loginName1').val()) {
            alert('请输入用户名');
        } else if (!$('#smsCaptcha').val()) {
            alert('请输入短信验证码');
        } else if (!$('#newLoginPwd').val()) {
            alert('请输入新密码');
        } else {
            $('#confirmBtn').prop('disabled', true);
            doPostAjax($("#basePath").val() + "/user/pwd/find", {
                loginName: $('#loginName1').val(),
                smsCaptcha: $('#smsCaptcha').val(),
                newLoginPwd: $('#newLoginPwd').val()
            }, function(res) {
                $('#confirmBtn').prop('disabled', false);
                if (res.success) {
                    alert('恭喜您重置密码成功！');
                    mySwiper.slidePrev();
                } else {
                    alert(res.msg);
                }
            });
        }
    });


});