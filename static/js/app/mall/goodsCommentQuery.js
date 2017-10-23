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
            // "D": "被过滤",
            "A": "已发布",
            "B": "审批通过",
            "C": "审批不通过",
        },
        search: true
            // key: 'comment_status'
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
        // pageCode: "801025",
        pageCode: "808960",
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