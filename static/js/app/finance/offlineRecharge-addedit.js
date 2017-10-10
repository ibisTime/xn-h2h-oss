$(function() {
    var view = !!getQueryString('v');
    var userId = getQueryString('userId') || '';


    var fields = [{
        field: 'accountNumber',
        title: '用户账户',
        required: true,
        type: 'select',
        pageCode: userId ? '802503' : '802500',
        keyCode1: '801907',
        dict: [
            ['currency', 'currency'],
            ['type', 'account_type']
        ],
        params: {
            currency: '',
            userId: userId
        },
        keyName: 'accountNumber',
        valueName: '{{realName.DATA}} - {{currencyName.DATA}} - {{typeName.DATA}}',
        searchName: 'realName',
        help: '支持户名查询',
        onChange: function(v, data) {
            var accountNumValue = $('#accountNumber option:selected').text();
            if (accountNumValue.indexOf("人民币") != -1) {
                $("#payCardInfo").parent().css("display", "block");
                $("#payCardNo").parent().css("display", "block");
            } else {
                $("#payCardInfo").parent().css("display", "none");
                $("#payCardNo").parent().css("display", "none");
            }
        }
    }, {
        title: "充值数量",
        field: 'amount',
        required: true,
        amount: true,
        formatter: moneyFormat
    }, {
        field: 'payCardInfo',
        title: '开户行',
        required: true,
        maxlength: 255
    }, {
        field: 'payCardNo',
        title: '银行卡号',
        bankCard: true,
        required: true,
    }, {
        field: 'applyNote',
        title: '充值说明',
        maxlength: 255
    }];

    var options = {
        fields: fields,
        addCode: '802700',
        view: view,
        beforeSubmit: function(data) {
            data.applyUser = getUserId();
            data.bizType = "11";
            return data;
        }
    };

    buildDetail(options);

})