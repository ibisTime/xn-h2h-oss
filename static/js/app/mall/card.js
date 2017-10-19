$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '优惠券编号'
    }, {
        title: "获取人",
        field: "toUser",
        type: "select",
        pageCode: "805120",
        keyName: "userId",
        valueName: "loginName",
        searchName: "loginName",
        params: {
            updater: "",
            kind: "C",
        },
        search: true,
        visible: false
    }, {
        title: "获取人",
        field: "toUser11",
        formatter: function(v, data) {
            if (data.user) {
                return data.user.loginName
            }
        }
    }, {
        field: 'parValue',
        title: '面值',
        formatter: moneyFormat
    }, {
        title: '有效期开始时间',
        field: 'startDatetime',
        type: "datetime",
        formatter: dateTimeFormat
    }, {
        title: '有效期截止时间',
        field: 'endDatetime',
        type: "datetime",
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "coupn_status",
        formatter: Dict.getNameForList('coupn_status'),
        search: true
    }, {
        field: 'releaser',
        title: '发放人'
    }, {
        title: "创建时间",
        field: "releaseDatetime",
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        pageCode: '801115',
        searchParams: {
            companyCode: OSS.company
        }
    });

    $("#returnBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        };
        if (selRecords[0].status != 0) {
            toastr.warning("不是可以回收的状态");
            return;
        };

        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">回收优惠券</li>' +
                '<li><label>备注：</label><input id="remark" name="remark" class="control-def"></input></li>' +
                '<li><input id="subBtn" name="subBtn"type="button" class="btn margin-left-100 submit" value="确定"><li><input id="goBackBtn" name="goBackBtn" type="button" class=" btn margin-left-20 goBack" value="返回"></ul>' +
                '</form>'
        });
        dw.showModal();
        $(document).on('click', '#subBtn', function() {

            if ($('#popForm').valid()) {
                var data = $('#popForm').serializeObject();
                data.code = selRecords[0].code;
                data.remark = $("#remark").val();
                reqApi({
                    code: "801111",
                    json: data
                }).done(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                    setTimeout(function() {
                        dw.close().remove();
                    }, 500)
                });
            }
        });
        $(document).on('click', '#goBackBtn', function() {
            setTimeout(function() {
                dw.close().remove();
            }, 500)

        });
        dw.__center();
    });
});