$(function() {

    var code = getQueryString('code');

    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: "product_location",
        required: true,
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
        detailCode: '808026',
    });

    $("#subBtn").off("click").click(function() {
        if ($('#jsForm').valid()) {
            confirm("确认上架？").then(function() {
                var data = $('#jsForm').serializeObject();
                data.code = code;
                data.remark = $("#remark").val();
                reqApi({
                    code: '808013',
                    json: data
                }).then(function() {
                    sucDetail();
                });

            });
        }
    });
});