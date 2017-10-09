$(function() {
    var view = getQueryString('v');

    var code = getQueryString('code');
    var branch = getQueryString('b');


    var fields = [{
        field: 'fromSystemCode',
        type: 'hidden',
        value: getSystemId()
    }, {
        field: 'toSystemCode',
        type: 'hidden',
        value: getSystemId()
    }, {
        field: 'smsType',
        type: 'hidden',
        value: '1'
    }, {
        field: 'toKind',
        title: '针对人群',
        type: 'select',
        key: 'user_kind',
        keyCode:'805906',
        readonly: view,
        required: true
    }, {
        title: '标题',
        field: 'smsTitle',
        required: true,
        maxlength: 30,
        readonly: view
    }, {
        title: '内容',
        field: 'smsContent',
        required: true,
        maxlength: 255,
        readonly: view
    }, {
        title: "拟发送时间",
        field: "topushDatetime",
        type: "hidden",
        value: "0",
        formatter: dateTimeFormat
    }, {
        title: '备注',
        field: "remark",
        maxlength: 255

    }];



    buildDetail({
        fields: fields,
        code: code,
        addCode: '804034',
        editCode: '804035',
        detailCode: '804042',
        view: view,
    });
});