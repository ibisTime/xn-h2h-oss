$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "商品发布人",
        field: "mobile"
    }, {
        field: 'name',
        title: '商品名称',
        search: true,
    }, {
        field: 'category',
        title: '大类',
        type: 'select',
        listCode: '808007',
        params: {
            type: '4',
            parentCode: '0',
        },
        keyName: 'code',
        valueName: 'name',
        searchName: 'name',
        onChange: function(v, data) {
            if (v) {
                $("#type").renderDropdown({
                    listCode: "808007",
                    params: {
                        type: "4",
                        parentCode: v,
                        // status:""
                    },
                    keyName: "code",
                    valueName: "name",
                    searchName: "name"
                });
            }
        },
        search: true,
        visible: false
    }, {
        field: 'categoryName',
        title: '大类',
    }, {
        field: 'type',
        title: '小类',
        type: 'select',
        listCode: '808007',
        params: {
            type: '4',
            parentCode: "1",
        },
        keyName: 'code',
        valueName: 'name',
        searchName: 'name',
        search: true,
        visible: false
    }, {
        field: 'typeName',
        title: '小类',
    }, {
        title: "原价",
        field: "originalPrice",
        formatter: moneyFormat
    }, {
        title: "售价",
        field: "price",
        formatter: moneyFormat
    }, {
        field: 'isNew',
        title: '是否全新',
        type: 'select',
        data: { "0": "否", "1": " 是" },
        search: true,
    }, {
        field: 'isPublish',
        title: '是否发布到圈子',
        type: 'select',
        data: { "0": "否", "1": " 是" },
        search: true,
    }, {
        field: 'isJoin',
        title: '是否参加活动',
        type: 'select',
        data: { "0": "否", "1": " 是" },
        search: true,
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: "product_location",
        formatter: Dict.getNameForList("product_location"),
        search: true,
    }, {
        field: 'orderNo',
        title: 'UI次序'
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
        searchParams: {
            companyCode: OSS.company
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
            toastr.info("该商品状态不可上架");
            return;
        };
        window.location.href = "./goods_up.html?code=" + selRecords[0].code;
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
        window.location.href = "./goods_hot.html?code=" + selRecords[0].code;
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