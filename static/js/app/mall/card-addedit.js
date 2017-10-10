$(function() {
    var view = getQueryString('v');
    var code = getQueryString('code');

    var fields = [{
        field: 'name',
        title: "面值",
        number: true,
        required: true,
        readonly: view
    }, {
        title: '有效期',
        field: 'pic',
        required: true,
        number: true,
        readonly: view,
    }, {
        field: '',
        title: '获取人',
        required: true,
        type: "select",
        pageCode: "",
        keyName: "userId",
        valueName: "mobile",
        searchName: "mobile",
        required: true,
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
        detailCode: ' ',
        addCode: ' ',
        editCode: ' ',
        view: view
    });

});