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
        title: '图片',
        formatter: function(v, data) {
            if (v) {
                return v && '<img style="width:306px;height:84px;" src="' + OSS.picBaseUrl + "/" + v + '">'
            }
        }
    }];
    buildList({
        columns: columns,
        pageCode: '808915',
        searchParams: {
            type: 'img',
            companyCode: OSS.company
        },
        beforeEdit: function(r) {
            location.href = 'mallRuleImg_addedit.html?code=' + r.id + "&t=" + r.type;
        }
    });
});