$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'mobile',
        title: '手机号',
        search: true
    }, {
        field: 'realName',
        title: '姓名',
        search: true
    }, {
        field: 'idNo',
        title: '证件号码',
        search: true
    }, {
        title: "推荐人",
        field: "tj",
        formatter: function(v, data) {
            if (data.refereeUser) {
                return data.refereeUser.mobile;
            } else {
                return "-"
            }
        }
    }, {
        title: "推荐人",
        field: "userReferee",
        type: "select",
        pageCode: "805120",
        params: {
            kind: 'C',
            update: ""
        },
        keyName: "userId",
        valueName: "{{mobile.DATA}}--{{nickname.DATA}}",
        searchName: "mobile",
        search: true,
        visible: false
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'user_status',
        formatter: Dict.getNameForList('user_status'),
        search: true
    }, {
        field: 'createDatetime',
        title: '注册时间',
        formatter: dateTimeFormat,
        field1: 'createDatetimeStart',
        title1: '注册时间',
        type1: 'date',
        field2: 'createDatetimeEnd',
        type2: 'date',
        twoDate: true,
        search: true,
    }];
    buildList({
        router: 'customer',
        columns: columns,
        pageCode: '805120',
        searchParams: {
            kind: 'C',
            companyCode: OSS.company
        },
        beforeDetail: function(data) {
            window.location.href = "customer_addedit.html?v=1&userId=" + data.userId;
        }
    });
    //激活
    $('#activeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 0) {
            toastr.info("已激活");
            return;
        }
        confirm("确定激活？").then(function() {
            reqApi({
                code: '805091',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: '0',
                    remark: selRecords[0].remark
                }
            }).then(function() {
                sucList();
            });

        }, function() {})
    });

    //注销
    $('#rockBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status == 2) {
            toastr.info("已注销");
            return;
        }

        confirm("确定注销？").then(function() {
            reqApi({
                code: '805091',
                json: {
                    userId: selRecords[0].userId,
                    toStatus: '2',
                    remark: selRecords[0].remark
                }
            }).then(function() {
                sucList();
            });

        }, function() {})
    });
    //账户
    $('#accountBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "customer_account.html?&c=1&userId=" + selRecords[0].userId;
    });

    //查看推荐关系
    $('#userRefereeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "customer_userReferee.html?userId=" + selRecords[0].userId + "&mobile=" + selRecords[0].mobile;
    });


    //修改实名认证
    $('#identityBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "bizman_identity.html?userId=" + selRecords[0].userId;
    });
});