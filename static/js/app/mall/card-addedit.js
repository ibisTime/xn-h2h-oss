$(function() {
    var view = getQueryString('v');
    var code = getQueryString('code');
    var start = {
        elem: '#startDatetime',
        format: 'YYYY-MM-DD hh:mm:ss',
        min: laydate.now(),
        istime: true,
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
        choose: function(datas) {
            var d = new Date(datas);
            d.setDate(d.getDate());
            datas = dateTimeFormat(d);
            start.max = datas;
        }
    };
    var fields = [{
        field: 'toUser',
        title: '获取人',
        type: "select",
        pageCode: "805120",
        keyName: "userId",
        valueName: "mobile",
        searchName: "mobile",
        params: {
            updater: "",
            kind: "C",
            // status: "1"
        },
        required: true,
        readonly: view
    }, {
        field: 'parValue',
        title: "面值",
        amount: true,
        formatter: moneyFormat,
        required: true,
        readonly: view
    }, {
        title: '有效期开始时间',
        field: 'startDatetime',
        type: "datetime",
        formatter: dateTimeFormat,
        dateOption: start,
        readonly: view,
        required: true
    }, {
        title: '有效期截止时间',
        field: 'endDatetime',
        type: "datetime",
        formatter: dateTimeFormat,
        dateOption: end,
        readonly: view,
        required: true
    }, {
        field: "releaser",
        value: getUserName(),
        hidden: true,
        required: true
    }];
    var viewList = [{
        title: "状态",
        field: "status",
        key: "coupn_status",
        formatter: Dict.getNameForList("coupn_status"),
        readonly: view
    }];
    if (view) {
        fields = fields.concat(viewList);
    }
    buildDetail({
        fields: fields,
        code: code,
        detailCode: '801116',
        addCode: "801110",
        view: view
    });

});