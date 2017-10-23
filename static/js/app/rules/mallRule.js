$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'remark',
        title: '规则名称'
    }, {
        field: 'ckey',
        title: '参数',
        search: true
    }, {
        field: 'cvalue',
        title: '数值'
    }];
    buildList({
        columns: columns,
        pageCode: '808915',
        searchParams: {
            // type: '3',
            companyCode: OSS.company
        },
        beforeEdit: function(r) {
            location.href = 'mallRule_addedit.html?code=' + r.id + "&t=" + r.type;
        }
    });
});