$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: "parentCode",
        title: "父类",
        type: "select",
        listCode: "810007",
        keyName: "code",
        valueName: "name",
        searchName: "name",
        search: true,
    }, {
        field: 'name',
        title: '小类名称',
        search: true,
    }, {
        field: 'status',
        title: '状态',
        key: "category_status",
        search: true,
        formatter: Dict.getNameForList("category_status"),
    }, {
        field: 'orderNo',
        title: '次序'
    }];

    buildList({
        columns: columns,
        pageCode: '810005',
        searchParams: {
            type: "4",
            companyCode: OSS.company
        },
        beforeEdit: function(data) {
            if (data.status == 1) {
                toastr.info("已上架不可修改");
                return "";
            };
            window.location.href = './kind_addedit.html?code=' + data.code;
        }
    });

    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            toastr.info("已上架");
            return;
        }
        confirm("确认上架？").then(function() {
            reqApi({
                code: '810003',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });

    });

    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 1) {
            toastr.info("还未上架,不可下架");
            return;
        }
        confirm("确认下架？").then(function() {
            reqApi({
                code: '810004',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });
    });

});