$(function() {

    var userId = getQueryString('userId');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'mobile',
        title: '手机号',
        required: true,
        readonly: view
    }, {
        title: "昵称",
        field: "nickname",
        readonly: view
    }, {
        field: 'realName',
        title: '真实姓名',
        readonly: view,
        maxlength: 10
    }, {
        title: "性别",
        field: "gender",
        type: "select",
        data: {
            "0": "未知",
            "1": "男",
            "2": "女"
        },
        readonly: view,
    }, {
        field: 'userReferee',
        title: '推荐人',
        formatter: function(v, data) {
            if (data.refereeUser) {
                return data.refereeUser.mobile;
            } else {
                return "-"
            }
        },
        required: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "user_status",
        formatter: Dict.getNameForList("user_status"),
    }, {
        field: 'bankcardList',
        title: '银行卡信息:',
        type: 'o2m',
        pageCode: '802015',
        o2mvalue: {
            'userId': userId
        },
        columns: [{
            field: 'realName',
            title: '真实名称',
        }, {
            field: 'bankName',
            title: '银行类型',
        }, {
            field: 'bankcardNumber',
            title: '银行卡号',
        }, {
            field: 'bindMobile',
            title: '预留手机号',
        }, {
            field: 'createDatetime',
            title: '创建时间',
            formatter: dateTimeFormat
        }]
    }, {
        field: 'remark',
        title: '备注',
        readonly: view,
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: {
            userId: userId
        },
        detailCode: '805121',
        view: view
    });

});