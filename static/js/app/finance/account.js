$(function() {
    var accountNumberCNY;
    var accountNumberJF;
    var accountNumberTG;
    reqApi({
        code: '802503',
        json: {
            userId: getUserId()
        }
    }).done(function(data) {
        $("#amount-CNY").text("￥" + moneyFormat(data[0].amount));
        accountNumberCNY = data[0].accountNumber;
        $("#amount-JF").text(moneyFormat(data[1].amount));
        accountNumberJF = data[1].accountNumber;
    });

    reqApi({
        code: '802503',
        json: {
            userId: OSS.SYS_USER + "_TG"
        }
    }).then(function(data) {
        $("#amount-TG").text("￥" + moneyFormat(data[0].amount));
        accountNumberTG = data[0].accountNumber;
    });

    $("#CNYls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberCNY + "&kind=CNY";
    });
    $("#JFls-Btn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberJF + "&kind=JF";
    });
    $("#accoutGrantBtn").click(function() {
        location.href = "ledger.html?accountNumber=" + accountNumberTG + "&kind=TG";
    });
    $("#accouBtn").click(function() {
        window.location.href = 'account_enchashment.html?accountNumber=' + accountNumberTG;
    });

});