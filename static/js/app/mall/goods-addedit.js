$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: "商品发布人",
        field: "mobile"
    }, {
        field: 'name',
        title: '商品名称',
        readonly: view
    }, {
        field: 'categoryName',
        title: '大类',
        readonly: view
    }, {
        field: 'typeName',
        title: '小类',
        readonly: view
    }, {
        title: "原价",
        field: "originalPrice",
        formatter: moneyFormat,
        readonly: view
    }, {
        title: "售价",
        field: "price",
        formatter: moneyFormat,
        readonly: view
    }, {
        field: 'isNew',
        title: '是否全新',
        type: 'select',
        data: { "0": "否", "1": " 是" },
        readonly: view
    }, {
        field: 'isPublish',
        title: '是否发布到圈子',
        type: 'select',
        data: { "0": "否", "1": " 是" },
        readonly: view
    }, {
        field: 'isJoin',
        title: '是否参加活动',
        type: 'select',
        data: { "0": "否", "1": " 是" },
        readonly: view
    }, {
        title: "商品图片",
        type: "img",
        field: "pic",
        readonly: view
    }, {
        title: "商品详述",
        type: "textarea",
        field: "description",
        normalArea: true,
        readonly: view
    }, {
        title: "运费",
        field: "yunfei",
        formatter: moneyFormat,
        readonly: view
    }, {
        title: "发布地点",
        field: "province",
        type: "citySelect",
        readonly: view
    }, {
        title: "发布时间",
        field: "publishDatetime",
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "product_status",
        formatter: Dict.getNameForList("product_status"),
        readonly: view
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: "product_location",
        formatter: Dict.getNameForList("product_location"),
        readonly: true,
    }, {
        field: 'orderNo',
        title: 'UI次序',
        readonly: true,
    }, {
        field: 'remark',
        title: '备注',
        readonly: view
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '808026'
    });

});