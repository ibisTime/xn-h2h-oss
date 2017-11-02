$(function() {
    var entityCode = getQueryString('entityCode') || "";

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '针对内容',
        field: 'entityName',
        formatter: function(v, data) {
            if (v) {
                return "订单：" + data.orderCode;
            } else {
                return "商品：" + data.productName;
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
            "A": "已发布",
            "B": "审批通过",
            "C": "审批不通过",
            "D": "被过滤",
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
        columns: columns,
        pageCode: "801025",
        searchParams: {
            companyCode: OSS.company,
            entityCode: entityCode
        }
    });
    $(".tools .toolbar").html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $("#backBtn").click(function() {
        window.location.href = './goods.html'
    });
})