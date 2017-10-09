$(function() {

    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'smsTitle',
            title: '标题',
        }, {
            field: 'toKind',
            title: '针对人群',
            type: 'select',
            key: 'user_kind',
            formatter: Dict.getNameForList('user_kind'),
            search: true
        },{
            field: 'status',
            title: '状态',
            type: 'select',
            formatter: Dict.getNameForList('notice_status'),
            search: true,
            key: 'notice_status'
        },
        {
            field: 'updater',
            title: '最近修改人'
        }, {
            field: 'updateDatetime',
            title: '最近修改时间',
            formatter: dateTimeFormat
        }, {
            field: 'remark',
            title: '备注'
        }
    ];


    buildList({
        router: 'notice',
        columns: columns,
        pageCode: '804040',
        searchParams: {
            channelType: '4',
            fromSystemCode: OSS.system
        }
    });
    
    $('#pushBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        var msg = selRecords[0].status == 1 ? "确定撤下该消息？" : "确定发布该消息？";
        confirm(msg).then(function() {
            reqApi({
                code: '804036',
                json: { 'id': selRecords[0].id }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        }, function(){});
    });
    $('#edit2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            toastr.info("已发布，不可修改");
            return;
        }
        window.location.href = 'notice_addedit.html?id=' + selRecords[0].id + "&code=" + selRecords[0].id;
    });
})