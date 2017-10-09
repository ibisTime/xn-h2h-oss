$(function() {

    var code = getQueryString('code');

    var fields = [{
        title: "订单信息",
        type: "title"
    }, {
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
        field: 'payAmount3',
        title: '实际支付总额',
        formatter: function(v, data) {
            if (v != "0" && data.payAmount1 != "0" && data.payAmount2 != "0") {
                return "人民币：" + moneyFormat(data.payAmount1) + "，积分" + moneyFormat(data.payAmount2) + "，小金库" + moneyFormat(data.payAmount3)
            } else if (v == "0" && data.payAmount1 != "0" && data.payAmount2 != "0") {
                return "人民币：" + moneyFormat(data.payAmount1) + "，积分" + moneyFormat(data.payAmount2);
            } else if (v != "0" && data.payAmount1 != "0" && data.payAmount2 == "0") {
                return "人民币：" + moneyFormat(data.payAmount1) + "，小金库" + moneyFormat(data.payAmount3);
            } else if (v != "0" && data.payAmount1 == "0" && data.payAmount2 != "0") {
                return "积分" + moneyFormat(data.payAmount2) + "，小金库" + moneyFormat(data.payAmount3);
            } else if (v == "0" && data.payAmount1 == "0" && data.payAmount2 != "0") {
                return "积分" + moneyFormat(data.payAmount2);
            } else if (v != "0" && data.payAmount1 == "0" && data.payAmount2 == "0") {
                return "小金库" + moneyFormat(data.payAmount3);
            } else if (v == "0" && data.payAmount1 != "0" && data.payAmount2 == "0") {
                return "人民币" + moneyFormat(data.payAmount1);
            }
        },
        readonly: true
    }, {
        field: 'payDatetime',
        title: '支付时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        field: 'promptTimes',
        title: '催货次数',
        readonly: true,
        formatter: function(v, data) {
            return data.promptTimes
        }
    }, {
        title: "商品信息",
        type: "title"
    }, {
        title: "商品信息",
        field: "productOrderList",
        type: "o2m",
        readonly: true,
        columns: [{
            title: "商品名称",
            field: "name",
            formatter: function(v, data) {
                return data.product.name;
            }
        }, {
            title: "产品规格",
            field: "productSpecsName"
        }, {
            title: "商品价格",
            field: "price1",
            formatter: function(v, data) {
                if (v) {
                    return moneyFormat(v) + "人民币"
                } else if (data.price2) {
                    return moneyFormat(data.price2) + "积分"
                }
            }
        }, {
            title: "数量",
            field: "quantity"
        }]
    }, {
        title: "发货信息",
        type: "title"
    }, {
        title: '物流公司',
        field: 'logisticsCompany',
        type: 'select',
        key: 'kd_company',
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
                $("#pdf").parent().hide();
            }
        }
    }, {
        field: 'deliverer',
        title: '发货人',
        readonly: true,
    }, {
        field: 'deliveryDatetime',
        title: '发货时间',
        formatter: dateTimeFormat,
        readonly: true,
    }, {
        field: 'pdf',
        title: '物流单',
        type: "img",
        readonly: true
    }, {
        field: 'remark',
        title: '备注',
        readonly: true
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
            title: "内容",
            field: "content"
        }, {
            title: "星级",
            field: "score",
            formatter: function(v, data) {
                if (v == 1) {
                    return "1颗星"
                } else if (v == 2) {
                    return "2颗星"
                } else if (v == 3) {
                    return "3颗星"
                } else if (v == 4) {
                    return "4颗星"
                } else if (v == 5) {
                    return "5颗星"
                }
            },
        }, {
            title: "评论时间",
            field: "commentDatetime",
            formatter: dateTimeFormat
        }]
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808066',
        view: true
    });

});