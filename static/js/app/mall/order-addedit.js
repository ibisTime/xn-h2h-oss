$(function() {
    var code = getQueryString('code');

    var fields = [{
            field: 'code1',
            title: '订单编号',
            formatter: function(v, data) {
                return data.code;
            },
            readonly: true,
        }, {
            field: 'receiver',
            title: '收件人',
            readonly: true,
        }, {
            field: 'reMobile',
            title: '联系方式',
            readonly: true,
        }, {
            field: 'reAddress',
            title: '收货地址',
            readonly: true,
        }, {
            title: '下单人',
            field: 'mobile',
            readonly: true,
            formatter: function(v, data) {
                return data.user.mobile;
            }
        }, {
            title: "下单说明",
            field: "applyNote",
            readonly: true
        }, {
            field: 'applyDatetime',
            title: '下单时间',
            formatter: dateTimeFormat,
            readonly: true
        }, {
            title: "商品名称",
            field: "name",
            formatter: function(v, data) {
                return data.productOrderList[0].productName;
            },
            readonly: true
        }, {
            title: "商品发布人",
            field: "companyUser",
            formatter: function(v, data) {
                if (data.companyUser) {
                    return data.companyUser.loginName;
                }
            },
            readonly: true
        }, {
            title: "订单价格",
            field: "amount1",
            formatter: moneyFormat
        }, {
            title: "运费",
            field: "yunfei",
            formatter: moneyFormat
        }, {
            field: 'payAmount3',
            title: '实际支付总额',
            formatter: function(v, data) {
                if (v != "0" && data.payAmount1 != "0" && data.payAmount2 != undefined && data.payAmount2 != "0") {
                    return "人民币：" + moneyFormat(data.payAmount1) + "，积分：" + moneyFormat(data.payAmount2) + "，优惠券：" + moneyFormat(data.payAmount3)
                } else if (v != "0" && data.payAmount1 != "0" && data.payAmount2 == undefined) {
                    return "人民币：" + moneyFormat(data.payAmount1) + "，优惠券：" + moneyFormat(data.payAmount3)
                } else if (v == "0" && data.payAmount1 != "0" && data.payAmount2 != "0") {
                    return "人民币：" + moneyFormat(data.payAmount1) + "，积分：" + moneyFormat(data.payAmount2);
                } else if (v != "0" && data.payAmount1 != "0" && data.payAmount2 == "0") {
                    return "人民币：" + moneyFormat(data.payAmount1) + "，优惠券：" + moneyFormat(data.payAmount3);
                } else if (v != "0" && data.payAmount1 == "0" && data.payAmount2 != "0") {
                    return "积分：" + moneyFormat(data.payAmount2) + "，优惠券：" + moneyFormat(data.payAmount3);
                } else if (v == "0" && data.payAmount1 == "0" && data.payAmount2 != "0") {
                    return "积分：" + moneyFormat(data.payAmount2);
                } else if (v != "0" && data.payAmount1 == "0" && data.payAmount2 == "0") {
                    return "优惠券：" + moneyFormat(data.payAmount3);
                } else if (v == "0" && data.payAmount1 != "0" && data.payAmount2 == "0") {
                    return "人民币：" + moneyFormat(data.payAmount1);
                }
            },
            readonly: true
        }, {
            field: 'payDatetime',
            title: '支付时间',
            formatter: dateTimeFormat,
            readonly: true
        }, {
            title: "支付方式",
            field: "payType",
            type: "select",
            key: "pay_type",
            formatter: Dict.getNameForList('pay_type'),
            readonly: true
        }, {
            field: "promptTimes",
            title: "催货次数"
        }, {
            field: 'status',
            title: '订单状态',
            type: "select",
            key: "order_status",
            formatter: Dict.getNameForList("order_status"),
            readonly: true
        }, {
            field: 'remark',
            title: '备注',
            readonly: true
        },
        {
            title: "发货信息",
            type: "title"
        }, {
            title: '物流公司',
            field: 'logisticsCompany',
            type: 'select',
            key: 'back_kd_company',
            readonly: true,

        }, {
            title: '物流单号',
            field: 'logisticsCode',
            readonly: true,
            formatter: function(v, data) {
                if (v) {
                    return v
                } else {
                    $("#logisticsCompany").parent().hide();
                    $("#logisticsCode").parent().hide();
                    $("#deliverer").parent().hide();
                    $("#deliveryDatetime").parent().hide();
                }
            }
        }, {
            field: 'deliverer',
            title: '发货人',
            readonly: true,
            formatter: function(v, data) {
                if (data.companyUser) {
                    return data.companyUser.mobile;
                }
            }
        }, {
            field: 'deliveryDatetime',
            title: '发货时间',
            formatter: dateTimeFormat,
            readonly: true,
        }, {
            title: "评论信息",
            type: "title"
        }, {
            title: "评论信息",
            field: "productOrderListCom",
            type: "o2m",
            pageCode: '801025',
            o2mvalue: {
                orderCode: code,
                limit: 100,
                start: 0,
                companyCode: OSS.company
            },
            readonly: true,
            columns: [{
                title: "商品名称",
                field: "entityName",
            }, {
                title: '评论人',
                field: 'nickname'
            }, {
                title: "评论内容",
                field: "content"
            }, {
                title: "评论时间",
                field: "commentDatetime",
                formatter: dateTimeFormat
            }]
        }
    ];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808066',
        view: true
    });

});