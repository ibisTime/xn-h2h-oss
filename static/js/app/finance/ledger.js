$(function() {
    var currency = getQueryString('currency') || "";
    var accountNumber = getQueryString('accountNumber') || "";
    var kind = getQueryString('kind') || "";
    var bizTypeDictCNY = {
        "01": "注册送人民币",
        "02": "签到送人民币",
        "11": "充值",
        "-11": "取现",
        "HL": "红冲蓝补",
        "XXFK": "线下付款",
        "RF": "推荐送人民币",
        "WTW_MALL": "购物付款",
        "WTW_MALL_TK": "购物退款",
        "32": "商品确认收货",
        "WTW_MALL_FL": "购物返利",
        "CZSJF": "充值送人民币"
    };
    var bizTypeDictJF = {
        "01": "注册送积分",
        "02": "签到送积分",
        "RF": "推荐送积分",
        "WTW_MALL": "购物付款",
        "32": "商品确认收货",
        "WTW_MALL_TK": "购物退款",
        "WTW_MALL_FL": "购物返利",
        "CZSJF": "充值送积分"
    };

    if (kind == "CNY" || kind == "TG") {
        bizTypeDict = bizTypeDictCNY;
    } else if (kind == "JF") {
        bizTypeDict = bizTypeDictJF;
    } else {
        bizTypeDict = Dict.getNameForList('biz_type');
    };
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名',
    }, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
        search: true,
        formatter: Dict.getNameForList('channel_type'),
    }, {
        title: "币种",
        field: "currency",
        type: "select",
        key: "currency",
        formatter: Dict.getNameForList("currency")
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        search: true,
        data: bizTypeDict
    }, {
        field: 'transAmount',
        title: '变动金额',
        formatter: moneyFormat
    }, {
        field: 'preAmount',
        title: '变动前金额',
        formatter: moneyFormat
    }, {
        field: 'postAmount',
        title: '变动后金额',
        formatter: moneyFormat
    }, {
        title: "创建时间",
        field: "createDatetime",
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',
        search: true,
        formatter: Dict.getNameForList('jour_status'),
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: "802524",
        searchParams: {
            currency: currency,
            userId: accountNumber ? "" : getUserId(),
            accountNumber: accountNumber,
            companyCode: OSS.company
        }
    });

    $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
    $('#backBtn').on('click', function() {
        sessionStorage.setItem('listSearchs', '');
        goBack();
    });
});