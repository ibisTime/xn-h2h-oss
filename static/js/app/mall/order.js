$(function() {
    var applyUser = getQueryString('applyUser') || "";
    var toUser = getQueryString('toUser') || "";
    var customer = getQueryString('c') || "";

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'codeForQuery',
        title: '订单编号',
        formatter: function(v, data) {
            return data.code;
        },
        search: true
    }, {
        field: 'applyUser',
        title: '下单用户',
        search: true,
        formatter: function(v, data) {
            return data.user.mobile;
        },
        type: 'select',
        search: true,
        pageCode: '805120',
        params: {
            kind: 'C',
            updater: '',
            companyCode: OSS.company
        },
        keyName: 'userId',
        valueName: '{{mobile.DATA}}--{{nickname.DATA}}',
        searchName: 'mobile',
    }, {
        field: 'productName',
        title: '商品名称',
        formatter: function(v, data) {
            if (data.productOrderList) {
                return data.productOrderList[0].productName;
            } else {
                return ""
            }
        }
    }, {
        title: "商品发布人",
        field: "companyUser",
        formatter: function(v, data) {
            if (data.companyUser) {
                return data.companyUser.loginName;
            }
        }
    }, {
        field: 'payType',
        title: '支付方式',
        key: 'pay_type',
        formatter: Dict.getNameForList("pay_type"),
        type: 'select',
        search: true,
    }, {
        field: 'amount1',
        title: '订单价格',
        formatter: moneyFormat
    }, {
        title: "运费",
        field: "yunfei",
        formatter: moneyFormat
    }, {
        title: "收件人",
        field: "receiver",
        search: true
    }, {
        title: "收件人联系方式",
        field: "reMobile",
        search: true
    }, {
        field: "promptTimes",
        title: "催货次数"
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '下单时间',
        type: 'date',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
    }, {
        field: "payDatetime",
        title: "支付时间",
        formatter: dateTimeFormat,
        field1: 'payDatetimeStart',
        title1: '支付时间',
        type: 'date',
        field2: 'payDatetimeEnd',
        twoDate: true,
        search: true,
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        key: "order_status",
        formatter: Dict.getNameForList("order_status"),
        search: true
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '808065',
        singleSelect: false,
        searchParams: {
            toUser: toUser,
            applyUser: applyUser
        }
    });
    if (customer) {
        $(".tools .toolbar").append('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
        $("#rockBtn").remove();
        $("#activeBtn").remove();
        $("#accountBtn").remove();
        $("#goodsBtn").remove();
        $("#sellOrderBtn").remove();
        $("#buyOrderBtn").remove();
    };
    $("#backBtn").click(function() {
        window.location.href = '../user/customer.html'
    });

});