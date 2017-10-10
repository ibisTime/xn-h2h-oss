$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '优惠券编号',
        search: true,
    }, {
        title: "获取人",
        field: "",
        search: true
    }, {
        field: 'type',
        title: '面值',
        search: true
    }, {
        field: 'location',
        title: '有效期',
        search: true,
    }, {
        field: 'location',
        title: '剩余有效期',
        search: true,
    }, {
        title: "获取时间",
        field: "",
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "",
        search: true
    }, {
        field: '',
        title: '发放人'
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        pageCode: ' ',
        deleteCode: ' ',
        searchParams: {
            companyCode: OSS.company
        }
    });

});