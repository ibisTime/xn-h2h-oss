$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: '关键字',
        field: 'word',
        required: true,
        readonly: view,
        maxlength: 30
    }, {
        title: '权重',
        field: 'weight',
        required: true,
        value: '1',
        hidden: true
    }, {
        field: 'level',
        title: '作用等级',
        value: '0',
        required: true,
        hidden: true
    }, {
        title: '反应',
        field: 'reaction',
        required: true,
        value: '3',
        hidden: true
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 255,
        readonly: view,
    }, {
        title: '更新人',
        field: 'updater',
        hidden: true,
        value: getUserName(),
        required: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '801016',
        addCode: '801010',
        editCode: '801012',
        beforeSubmit: function(data) {
            if (code) {
                return data;
            } else {
                delete data.code;
                delete data.id;
                var word = data.word;
                var level = data.level;
                var weight = data.weight;
                var remark = data.remark;
                var updater = data.updater;
                var reaction = data.reaction;
                var ky = { word: word, level: level, weight: weight, remark: remark, reaction: reaction, updater: updater }
                data.keywordList = [ky];
                delete data.remark;
                delete data.reaction;
                delete data.weight;
                delete data.word;
                delete data.updater;
                delete data.level;
                return data
            }
        }
    });
});