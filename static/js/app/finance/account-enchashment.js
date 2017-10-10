$(function() {
    var code = getQueryString('code');
    var accountNumber = getQueryString('accountNumber');

    var fields = [{
        field: 'accountNumber',
        title: '用户账户',
        required: true,
        type: 'hidden',
        value: accountNumber
    }, {
        field: 'amount',
        title: '取现金额',
        required: true,
        amount: true,
        formatter: moneyFormat
    }, {
        title: "支付时间",
        field: "payDatetime",
        type: "datetime",
        formatter: dateFormat,
        required: true,
    }, {
        field: 'payCardInfo',
        title: '开户行',
        required: true,
        maxlength: 255
    }, {
        field: 'payCardNo',
        title: '银行卡号',
        required: true,
        bankCard: true,
    }, {
        field: 'applyNote',
        title: '备注',
        maxlength: 255
    }];

    var options = {
        fields: fields,
        addCode: '802754',
        beforeSubmit: function(data) {
            data.applyUser = getUserId();
            return data;
        }
    };

    buildDetail(options);

});