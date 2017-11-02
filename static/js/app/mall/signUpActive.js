$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "活动类型",
        field: "type",
        type: "select",
        key: "cz_active_type",
        formatter: Dict.getNameForList("cz_active_type"),
        // search: true
    }, {
        field: 'currency',
        title: "赠送币种",
        type: "select",
        key: "currency",
        formatter: Dict.getNameForList("currency"),
        search: true
    }, {
        title: '赠送的数量',
        field: 'number',
        formatter: moneyFormat,
    }, {
        title: '开始时间',
        field: 'startDatetime',
        type: "datetime",
        formatter: dateTimeFormat,
        search: true
    }, {
        title: '结束时间',
        field: 'endDatetime',
        type: "datetime",
        formatter: dateTimeFormat,
        search: true
    }, {
        type: "select",
        field: "status",
        title: "状态",
        key: "czActive_status",
        formatter: Dict.getNameForList("czActive_status"),
        search: true
    }, {
        title: "备注",
        field: "remark"
    }];

    buildList({
        columns: columns,
        pageCode: '801050',
        deleteCode: '801041',
        beforeEdit: function(data) {
            if (data.status == "1") {
                toastr.warning("上架中，不可修改");
                return "";
            }
            window.location.href = "./signUpActive_addedit.html?code=" + data.code + "&type=" + data.type;
        },
        searchParams: {
            type: "1",
            companyCode: OSS.company
        },
    });
    //上架
    $('#upBtn').click(function() {
        var activeNumber;
        reqApi({
            code: "801052",
            json: {
                status: "1",
                type: "1"
            },
            sync: true
        }).then(function(data) {
            activeNumber = data.length;
        });

        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        }
        if (selRecords.length > 1) {
            toastr.warning("不能多选");
            return;
        }
        if (selRecords[0].status == 1) {
            toastr.warning("该记录不是可上架的状态");
            return;
        }
        if (activeNumber >= 1) {
            toastr.warning("只能同时上架一个活动");
            return;
        }
        confirm("确认上架？").then(function() {
            reqApi({
                code: '801043',
                json: {
                    "code": selRecords[0].code,
                    remark: "上架",
                    "location": "0",
                    "orderNo": "0",
                }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        }, function() {});
    });
    //下架
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        }

        if (selRecords.length > 1) {
            toastr.warning("不能多选");
            return;
        }

        if (selRecords[0].status != 1) {
            toastr.warning("该记录不是可下架的状态");
            return;
        }
        confirm("确认下架？").then(function() {
            reqApi({
                code: '801044',
                json: { "code": selRecords[0].code, remark: "下架" }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        }, function() {});

    });
});