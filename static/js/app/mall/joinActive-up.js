$(function() {

    var code = getQueryString('code');

    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    }, {
        field: 'location',
        title: '位置',
        // type: 'select',
        // key: "active_location",
        required: true,
        hidden: true,
        value: "0"
    }, {
        field: 'orderNo',
        title: 'UI次序',
        required: true,
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '801071',
    });

    $("#subBtn").off("click").click(function() {
        if ($('#jsForm').valid()) {
            confirm("确认上架？").then(function() {
                var data = $('#jsForm').serializeObject();
                data.code = code;
                data.remark = $("#remark").val();
                reqApi({
                    code: '801063',
                    json: data
                }).then(function() {
                    sucDetail();
                });
            });
        }
    });
});