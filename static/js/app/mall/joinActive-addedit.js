$(function() {
    var view = getQueryString('v');
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
        title: "优惠活动类型",
        field: "type",
        type: "select",
        key: "yh_active_type",
        readonly: view,
        required: true,
        onChange: function(v, data) {
            if (v) {
                if (v != "1") {
                    $("#value1").parent().css("display", "none");
                } else {
                    $("#value1").parent().css("display", "block");
                }
            }
        }
    }, {
        field: 'value1',
        title: "折扣率",
        twoAmount: true,
        required: true,
        readonly: view,
        help: "请输入一个最小为0，最大为1，<br>并且最多有两位小数的值，如：0.66"
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
        title: "广告图",
        field: "advPic",
        type: "img",
        single: true,
        readonly: view,
        required: true
    }, {
        field: 'description',
        title: '活动图文详述',
        type: "textarea",
        required: true,
        readonly: view
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
        title: "UI次序",
        field: "orderNo",
        readonly: view
    }];
    if (view) {
        fields = fields.concat(viewList);
    }
    buildDetail({
        fields: fields,
        code: code,
        detailCode: '801071',
        addCode: '801060',
        editCode: '801062',
        view: view,
        beforeSubmit: function(data) {
            if (data.value1 == "") {
                data.value1 = "1";
            }
            data.value2 = "0";
            data.value3 = "0";
            return data;
        }
    });

});