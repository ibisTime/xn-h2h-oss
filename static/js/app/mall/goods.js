$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '商品名称',
        search: true,
    }, {
        field: 'type',
        title: '类型',
        type: 'select',
        listCode: '808007',
        params: {
            type: '1',
            parentCode: 0,
        },
        keyName: 'code',
        valueName: 'name',
        search: true
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: "product_location",

        formatter: Dict.getNameForList("product_location"),
        search: true,
    }, {
        field: 'orderNo',
        title: '序号'
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "product_status",
        formatter: Dict.getNameForList("product_status"),
        search: true
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        pageCode: '808025',
        // deleteCode: '808011',
        searchParams: {
            companyCode: OSS.company
        },
        beforeEdit: function(data) {
            if (data.status == 3) {
                toastr.info("已上架，不可修改");
                return;
            }
            window.location.href = "product_addedit.html?Code=" + data.code + '&type=' + data.type;
        }
    });
    //上架
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        };

        if (selRecords.length > 1) {
            toastr.info("不能多选");
            return;
        };

        if (selRecords[0].status != 1 && selRecords[0].status != 4) {
            toastr.info("该商品状态不可强制上架");
            return;
        };
        confirm("确认上架？").then(function() {
            reqApi({
                code: '808013',
                json: { "code": selRecords[0].code, loaction: "0", orderNo: "0", remark: "重新上架" }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        });
    });
     //热门设置
    $('#hotBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        };

        if (selRecords.length > 1) {
            toastr.info("不能多选");
            return;
        };
       window.location.href="./goods_up.html?code="+selRecords[0].code;
    });
    //下架
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length > 1) {
            toastr.info("不能多选");
            return;
        }

        if (selRecords[0].status != 3) {
            toastr.info("该商品状态不可强制下架");
            return;
        }
        confirm("确认强制下架？").then(function() {
            reqApi({
                code: '808014',
                json: { "code": selRecords[0].code, remark: "强制下架" }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        }, function() {});

    });

});