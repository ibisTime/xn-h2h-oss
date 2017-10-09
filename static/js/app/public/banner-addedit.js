$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: "status",
        required: 'true',
        value: 1,
        hidden: true
    }, {
        field: "companyCode",
        hidden: true,
        value: sessionStorage.getItem('systemCode')
    }, {
        field: "type",
        value: 2,
        required: 'true',
        hidden: true
    }, {
        field: "belong",
        title: '属于',
        value: 1,
        required: 'true',
        hidden: true
    }, {
        field: "parentCode",
        value: 0,
        required: 'true',
        hidden: true
    }, {
        field: "contentType",
        required: 'true',
        value: 1,
        hidden: true
    }, {
        field: "isCompanyEdit",
        required: 'true',
        value: 0,
        hidden: true
    }, {
        title: 'banner名称',
        field: 'name',
        required: true,
        readonly: view,
        maxlength: 32 //
    }, {
        title: '位置',
        field: 'location',
        type: "select",
        data: {
            "index_banner": "首页"
        },
        value: "index_banner",
        required: true,
        readonly: view
    }, {
        title: '顺序',
        field: 'orderNo',
        number: true,
        maxlength: 10,
        required: true,
        readonly: view
    }, {
        title: "banner图片",
        field: "pic",
        type: "img",
		single: true,
        required: true,
        readonly: view
    }, {
        title: 'url地址',
        field: "url",
        //required: true,
        readonly: view,
        //maxlength: 255
    }, {
        title: '备注',
        field: 'remark',
        readonly: view,
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        addCode: "805800",
        editCode: "805802",
        detailCode: '805807'
    });

});