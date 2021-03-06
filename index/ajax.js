//ajax
function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    options.async = options.async || true;
    options.data = options.data || {};
    /*url加随机参数，防止缓存*/
    options.url += ('?rand=' + Math.random()).replace('.', '');
    var params = formatParams(options.data);

    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //接收 - 第三步
    if (options.async == true) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                callback();
            }
        }
    }

    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url + '&' + params, options.async);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, options.async);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }

    if (options.async == false) {
        callback();
    }

    //回调函数
    function callback() {
        var status = xhr.status;
        if (status >= 200 && status < 300) {
            options.success && options.success(xhr.responseText, xhr.responseXML);
        } else {
            options.fail && options.fail(status);
        }
    }
}

//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    //arr.push(("rand=" + Math.random()).replace(".", ""));
    return arr.join("&");
}

//
function html_encode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&gt;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "</br>");
    return s;
}

function html_decode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&gt;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
}