$(function() {
    var view = getQueryString('v');
    var type = getQueryString('type');
    var code = getQueryString('code');
    var start = {
        elem: '#startDatetime',
        format: 'YYYY-MM-DD hh:mm:ss',
        min: laydate.now(),
        istime: true,
        istoday: false,
        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateTimeFormat(d);
            end.min = datas;
            end.start = datas
        }
    };
    var end = {
        elem: '#endDatetime',
        format: 'YYYY-MM-DD hh:mm:ss',
        min: laydate.now(),
        istime: true,
        istoday: false,
        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateTimeFormat(d);
            start.max = datas;
        }
    };

    var fields = [{
        title: "活动类型",
        field: "type",
        type: "select",
        data: {
            "1": "注册送活动"
        },
        required: true,
        value: "1"
    }, {
        field: 'currency',
        title: "赠送币种",
        type: "select",
        key: "currency",
        required: true,
        readonly: view
    }, {
        title: '赠送的数量',
        field: 'number',
        required: true,
        amount: true,
        readonly: view,
        formatter: moneyFormat
    }, {
        title: '开始时间',
        field: 'startDatetime',
        type: "datetime",
        formatter: dateTimeFormat,
        dateOption: start,
        readonly: view,
        required: true
    }, {
        title: '结束时间',
        field: 'endDatetime',
        type: "datetime",
        formatter: dateTimeFormat,
        dateOption: end,
        readonly: view,
        required: true
    }, {
        field: 'description',
        title: '活动图文详述',
        hidden: true,
        value: "0",
        required: true,
        readonly: view,
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255,
        readonly: view
    }];
    var viewList = [{
        title: "状态",
        field: "status",
        key: "czActive_status",
        formatter: Dict.getNameForList("czActive_status"),
        readonly: view
    }];
    if (view) {
        fields = fields.concat(viewList);
    }
    buildDetail({
        fields: fields,
        code: code,
        detailCode: '801051',
        addCode: '801040',
        editCode: '801042',
        view: view,
    });

});