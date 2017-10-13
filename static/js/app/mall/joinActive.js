$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "优惠活动类型",
        field: "type",
        type: "select",
        key: "yh_active_type",
        formatter: Dict.getNameForList("yh_active_type"),
        search: true
    }, {
        field: 'value1',
        title: "折扣率",
    }, {
        field: 'description',
        title: '活动图文详述',
        type: "textarea",
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
        field: 'location',
        title: '位置',
        type: 'select',
        key: "active_location",
        formatter: Dict.getNameForList("active_location"),
        search: true,
    }, {
        field: 'orderNo',
        title: 'UI次序'
    }, {
        title: "备注",
        field: "remark"
    }];

    buildList({
        columns: columns,
        pageCode: '801070',
        deleteCode: '801061',
        beforeEdit: function(data) {
            if (data.status == "1") {
                toastr.warning("上架中，不可修改");
                return "";
            }
            window.location.href = "./joinActive_addedit.html?code=" + data.code;
        },
        searchParams: {
            companyCode: OSS.company
        }
    });
    //上架
    $('#upBtn').click(function() {
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
        window.location.href = "joinActive_up.html?Code=" + selRecords[0].code;
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
                code: '801064',
                json: { "code": selRecords[0].code, remark: "下架" }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        }, function() {});

    });
});