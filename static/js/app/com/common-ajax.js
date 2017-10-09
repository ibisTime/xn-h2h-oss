var dataCache = {};

function ajaxPost(url, param) {
    var promise = $.ajax({
        url: url,
        type: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(param)
    });
    promise.then(function(res) {
        if (res.errorCode != '0') {
            toastr.warning(res.errorInfo);
        }
    }, function(obj, error, msg) {
        toastr.error(msg);
    });
    return promise;
}

function ajaxGet(url, param, reload, sync) {
    if (typeof param == 'boolean' || typeof param == 'undefined') {
        reload = param;
        param = {};
    }
    var tokenStr = '_=' + new Date().valueOf(),
        symbol = (url.indexOf('?') === -1 ? '?' : '&');
    if (url && !/_=.*/.test(url)) {
        var send_url = url + symbol + tokenStr;
    }
    var cache_url = url + JSON.stringify(param);
    if (reload) {
        delete dataCache[cache_url];
    }
    if (!dataCache[cache_url]) {
        dataCache[cache_url] = $.ajax({
            async: !sync,
            type: 'get',
            url: send_url,
            data: param
        });
        dataCache[cache_url].then(function(res) {
            if (res.errorCode != '0') {
                toastr.warning(res.errorInfo);
            }
        }, function(obj, error, msg) {
            toastr.error(msg);
        });
    }
    return dataCache[cache_url];
}

function urlDispatch() {
    return OSS.mainUrl;
}

function reqApi(options, updateType) {
    var url = urlDispatch(options.code) + "/api";
    if (!updateType) {
        var commonParams = {
            token: sessionStorage.getItem('token') || '',
            updater: sessionStorage.getItem('userName'),
            systemCode: sessionStorage.getItem('systemCode'),
            companyCode: OSS.company
        };
    } else {
        var commonParams = {
            token: sessionStorage.getItem('token') || '',
            systemCode: sessionStorage.getItem('systemCode'),
            companyCode: OSS.company
        };
    }

    var params = {
        code: options.code,
        json: JSON.stringify($.extend(commonParams, options.json))
    };
    var cache_url = url + JSON.stringify(params);
    if (!options.cache) { // cache: true 多个相同的请求只发送一次请求
        delete dataCache[cache_url];
    }
    if (!dataCache[cache_url]) {
        dataCache[cache_url] = $.ajax({
            async: !options.sync, // 同步
            url: url,
            type: 'POST',
            data: params
        });
    }

    return dataCache[cache_url].then(function(res, textStatus, jqXHR) {
        if (res.errorCode != '0') {
            toastr.warning(res.errorInfo);
            return $.Deferred().reject(jqXHR, res, 'Not YES').promise();
        } else {
            return res.data;
        }
    }, function(obj, error, msg) {
        toastr.error(msg);
    });
}

function reqApi1(options) {
    var url = urlDispatch(options.code) + "/api";

    var params = {
        code: options.code,
        json: JSON.stringify($.extend({
            token: sessionStorage.getItem('token') || '',
            updater: sessionStorage.getItem('userName'),
            systemCode: sessionStorage.getItem('systemCode'),
            companyCode: OSS.company
        }, options.json))
    };

    return $.ajax({
        async: !options.sync, // 同步
        url: url,
        type: 'POST',
        data: params
    });
}
