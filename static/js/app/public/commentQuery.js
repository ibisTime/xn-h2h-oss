$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '针对内容',
        field: 'entityName',
        formatter: function(v, data) {
            var productName = data.productName ? data.productName : "该商品已被卖家删除";
            if (v) {
                return "订单：" + data.orderCode;
            } else {
                return "商品：" + productName;
            }
        }
    }, {
        field: 'content',
        title: '评论内容'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        data: {
            // "D": "被过滤",
            "A": "已发布",
            "B": "审批通过",
            "C": "审批不通过",
        },
        search: true
    }, {
        field: 'nickname',
        title: '评论人'
    }, {
        field: 'commentDatetime',
        title: '评论时间',
        formatter: dateTimeFormat
    }];
    buildList({
        router: "comment",
        columns: columns,
        pageCode: "801025",
        searchParams: {
            companyCode: OSS.company,
            statusList: ["A", "B", "C"]
        },
        beforeDetail: function(data) {
            window.location.href = "./comment_addedit.html?v=1&code=" + data.code + "&entityCode=" + data.entityCode;
        }
    });

})