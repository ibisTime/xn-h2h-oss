$(function() {

    var code = getQueryString('code');
    var type = getQueryString('t');

    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    }, {
        title: '规则名称',
        field: 'remark',
        readonly: true,
        maxlength: 250
    }, {
        title: '参数',
        field: 'ckey',
        readonly: true,
        required: true,
        maxlength: 20
    }, {
        title: '图片',
        field: 'cvalue',
        type: "img",
        required: true,
        single: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808916',
        editCode: '808910',
        beforeSubmit: function(data) {
            data.remark = $('#remark').html();
            data.type = type;

            return data;
        }
    });

});