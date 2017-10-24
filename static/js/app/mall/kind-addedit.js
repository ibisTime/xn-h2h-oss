$(function() {
    var view = getQueryString('v');
    var code = getQueryString('code');

    var fields = [{
        field: "parentCode",
        title: "父类",
        type: "select",
        listCode: "808007",
        params: {
            status: "1",
            type: "4",
            parentCode: "0"
        },
        keyName: "code",
        valueName: "name",
        searchName: "name",
        required: true,
        readonly: view
    }, {
        field: 'name',
        title: '小类名称',
        required: true,
        readonly: view
    }, {
        title: '图片',
        field: 'pic',
        value: "0",
        hidden: true,
        readonly: view,
    }, {
        field: 'orderNo',
        title: '次序',
        required: true,
        number: true,
        readonly: view
    }];
    var viewList = [{
        title: "状态",
        field: "status",
        key: "category_status",
        formatter: Dict.getNameForList("category_status")
    }];
    if (view) {
        fields = fields.concat(viewList);
    }
    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808006',
        addCode: '808000',
        editCode: "808002",
        view: view,
        beforeSubmit: function(data) {
            // data.parentCode = 0;
            data.type = "4";
            return data;
        }
    });

});