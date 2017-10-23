$(function() {
    var customer = getQueryString('c') || "";
    var userId = getQueryString('userId') || "";
    var mobile = getQueryString('mobile') || "";
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "商品发布人",
        field: "mobile",
        formatter: function(v, data) {
            if (v == undefined) {
                return mobile;
            } else {
                return v;
            }
        }
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
        search: true
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
        search: true
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
        pageCode: userId ? '808021' : '808025',
        searchParams: {
            companyCode: OSS.company,
            userId: userId,
            statusList: userId ? [3, 4] : '',
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

        if (selRecords[0].status != 5 && selRecords[0].status != 6) {
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
                code: '808017',
                json: { "code": selRecords[0].code, remark: "强制下架" }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        }, function() {});

    });
    //评论查询
    $('#commentBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        };

        if (selRecords.length > 1) {
            toastr.info("不能多选");
            return;
        };
        window.location.href = "./goodsCommentQuery.html?entityCode=" + selRecords[0].code;
    });
    if (customer) {
        $(".tools .toolbar").html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    };
    $("#backBtn").click(function() {
        window.location.href = '../user/customer.html'
    });
});