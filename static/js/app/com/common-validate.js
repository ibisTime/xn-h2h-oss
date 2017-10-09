//配置错误提示的节点，默认为label，这里配置成 span （errorElement:'span'）
$.validator.setDefaults({
    errorElement: 'span'
});

//配置通用的默认提示语
$.extend($.validator.messages, {
    equalTo: "与密码输入不一致",
    required: "必填字段",
    remote: "请修正该字段",
    email: "请输入正确格式的电子邮件",
    url: "请输入合法的网址",
    date: "请输入合法的日期",
    dateISO: "请输入合法的日期 (ISO).",
    number: "请输入合法的数字",
    digits: "只能输入整数",
    creditcard: "请输入合法的信用卡号",
    equalTo: "请再次输入相同的值",
    accept: "请输入拥有合法后缀名的字符串",
    maxlength: jQuery.validator.format("请输入一个长度最多是 {0} 的字符串"),
    minlength: jQuery.validator.format("请输入一个长度最少是 {0} 的字符串"),
    rangelength: jQuery.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
    range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
    max: jQuery.validator.format("请输入一个最大为 {0} 的值"),
    min: jQuery.validator.format("请输入一个最小为 {0} 的值")
});

/*-------------扩展验证规则-------------*/
//邮箱 
jQuery.validator.addMethod("mail", function(value, element) {
    var mail = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/;
    return this.optional(element) || (mail.test(value));
}, "邮箱格式不对");
//银行卡号
jQuery.validator.addMethod("bankCard", function(value, element) {
    var bankCard = /^(\d{16}|\d{19})$/;
    return this.optional(element) || (bankCard.test(value));
}, "银行卡格式错误");
//电话验证规则
jQuery.validator.addMethod("phone", function(value, element) {
    var phone = /^0\d{2,3}-\d{7,8}$/;
    return this.optional(element) || (phone.test(value));
}, "电话格式如：0371-68787027");

//区号验证规则  
jQuery.validator.addMethod("ac", function(value, element) {
    var ac = /^0\d{2,3}$/;
    return this.optional(element) || (ac.test(value));
}, "区号如：010或0371");

//无区号电话验证规则  
jQuery.validator.addMethod("noactel", function(value, element) {
    var noactel = /^\d{7,8}$/;
    return this.optional(element) || (noactel.test(value));
}, "电话格式如：68787027");

//手机验证规则  
jQuery.validator.addMethod("mobile", function(value, element) {
    var mobile = /^1[3|4|5|7|8]\d{9}$/;
    return this.optional(element) || (mobile.test(value));
}, "手机格式不对");

//邮箱或手机验证规则  
jQuery.validator.addMethod("mm", function(value, element) {
    var mm = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^.*$/;
    return this.optional(element) || (mm.test(value));
}, "邮箱或手机格式不对");

//电话或手机验证规则  
jQuery.validator.addMethod("tm", function(value, element) {
    var tm = /(^1[3|4|5|7|8]\d{9}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)|(^\d{3,4}-\d{7,8}-\d{1,4}$)|(^\d{7,8}-\d{1,4}$|(^\d{3}-\d{3}-\d{4}$))/;
    return this.optional(element) || (tm.test(value));
}, "电话或手机格式不对");

//年龄
jQuery.validator.addMethod("age", function(value, element) {
    var age = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
    return this.optional(element) || (age.test(value));
}, "不能超过120岁");

//验证当前值和目标val的值相等 相等返回为 false
jQuery.validator.addMethod("equalTo2", function(value, element) {
    var returnVal = true;
    var id = $(element).attr("data-rule-equalto2");
    var targetVal = $(id).val();
    if (value === targetVal) {
        returnVal = false;
    }
    return returnVal;
}, "不能和原始密码相同");

//大于指定数
jQuery.validator.addMethod("gt", function(value, element) {
    var returnVal = false;
    var gt = $(element).data("gt");
    if (value > gt && value != "") {
        returnVal = true;
    }
    return returnVal;
}, "不能小于0 或空");

$.validator.addMethod("isPositive", function(value, element) {
    var aint = parseFloat(value);
    return this.optional(element) || aint > 0;
}, '请输入大于0的数字');

$.validator.addMethod("Z+", function(value, element) {
    return this.optional(element) || /^[1-9]\d*$/.test(value);
}, '请输入整数');

$.validator.addMethod("amount", function(value, element) {
    var aint = '' + parseInt(value.replace(/[\,]/g, ''));
    return /^\d+$/.test(aint) && /^[\d\.\,]+$/.test(value + '') && aint.length <= 13;
}, '金额必须>=0，且小于13位');

$.validator.addMethod("amount1", function(value, element) {
    var aint = '' + parseInt(value.replace(/[\,]/g, ''));
    return /^\-?\d+$/.test(aint) && /^\-|\+?[\d\.\,]+$/.test(value + '') && aint.length <= 13;
}, '金额须小于13位');
//汉字
jQuery.validator.addMethod("chinese", function(value, element) {
    var chinese = /^[\u4E00-\u9FFF]+$/;
    return this.optional(element) || (chinese.test(value));
}, "汉字格式不对");

//指定数字的整数倍
jQuery.validator.addMethod("times", function(value, element) {
    var returnVal = true;
    var base = $(element).attr('data-rule-times');
    if (value % base != 0) {
        returnVal = false;
    }
    return returnVal;
}, "必须是发布赏金的整数倍");

//身份证
jQuery.validator.addMethod("idCard", function(value, element) {
    var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; //(15位)
    var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/; //(18位)

    return this.optional(element) || (isIDCard1.test(value)) || (isIDCard2.test(value));
}, "身份证格式不对");

jQuery.validator.addMethod("isNotFace", function(value, element) {
    return this.optional(element) || /^[\s0-9a-zA-Z\u4e00-\u9fa5\u00d7\u00b7\u002e\u0060\u2777\u2190\u300a\u2014\u2018\u2019\u201c\u201d\u0026\u0023\u0031\u0038\u0033\u003b\u3001\u3002\u300b\u300e\u300f\u3010\u3011\uff01\uff08\uff09\uff0c\uff1a\uff1b\uff1f\uff40\ufe11\uff0e\uff64\uff65\ufe12\uff0d\uff03\uef45\uffe5\x21-\x7e\u2460-\u2469]*$/.test(value);
}, "请输入合法字符");


//小数后1位
$.validator.addMethod("minAmount", function(value, element) {
    return this.optional(element) || /^\d+(\.\d{1})?$/.test(value);
}, '金额必须>0，且小数点后最多1位');


//ie6兼容after
var $beforeAfter = function(dom) {
    if (document.querySelector || !dom && dom.nodeType !== 1) return;

    var content = dom.getAttribute("data-content") || '';
    var before = document.createElement("before"),
        after = document.createElement("after");

    // 内部HTML
    before.innerHTML = content;
    after.innerHTML = content;
    // 前后分别插入节点
    dom.insertBefore(before, dom.firstChild);
    dom.appendChild(after);
};

$beforeAfter($('.error'));

$.validator.setDefaults({
    errorPlacement: function(error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else if (element.is('input[type=radio]')) {
            error.insertAfter(element.parent().children('label').last());
        } else {
            error.insertAfter((element.is("textarea")) ? element.parent() : element);
        }
    }
});


setTimeout(function() {
    $('form').on('reset', function() {
        $(this).find('select').val('');
    });
}, 100);

setTimeout(function() {
    $('form').find('textarea').on('input propertychange', function() {
        $(this).valid();
    });
}, 1000);