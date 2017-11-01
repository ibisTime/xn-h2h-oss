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
            "4": "充值送活动"
        },
        required: true,
        value: "4"
    }, {
        field: 'currency',
        title: "赠送币种",
        type: "select",
        key: "currency",
        required: true,
        readonly: view
    }, {
        title: '赠送的比例',
        field: 'number',
        help: "用户的充值金额乘以这个比例，<br>就是赠送的积分或者人民币数目",
        required: true,
        twoAmount: true,
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
    }, view ? {
        field: 'descriptionDetail',
        title: '活动详述',
        readonly: true,
        formatter: function(v, data) {
            descriptionDetail = decode(data.description);
            return descriptionDetail;
        }
    } : {
        field: 'description',
        title: '活动详述',
        normalArea: true,
        type: "textarea",
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
    }, {
        title: "位置",
        field: "location",
        type: "select",
        key: "active_location",
        readonly: view
    }, {
        title: "UI次序",
        field: "orderNo",
        readonly: view
    }];
    if (view) {
        fields = fields.concat(viewList);
    };

    function decode(str) {
        if (!str || str.length === 0) {
            return '';
        }
        var s = '';
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/<(?=[^o][^)])/g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br/>");
        return s;
    }
    buildDetail({
        fields: fields,
        code: code,
        detailCode: '801051',
        addCode: '801040',
        editCode: '801042',
        view: view,
        beforeSubmit: function(data) {
            data.number = data.number * 1000;
            return data;
        }
    });

});