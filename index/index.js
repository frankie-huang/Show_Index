window.onload = function() {
    var options = {
        url: "index/index.php",
        success: function(text, xml) {
            text = JSON.parse(text);
            var title = document.createElement('title');
            var h1 = document.createElement('h1');
            if (text[text.length - 1] == 'WINNT') {
                title.innerHTML = "Index of /" + text[text.length - 2];
                h1.innerHTML = "Index of /" + text[text.length - 2];
            } else {
                title.innerHTML = "Index of /" + text[text.length - 2];
                h1.innerHTML = "Index of /" + text[text.length - 2];
            }
            document.head.appendChild(title);
            document.body.appendChild(h1);
            var ul = document.createElement('ul');

            //如果父目录是www，检测是否有phpmyadmin路径，没有则添加上去
            if (text[text.length - 2].toLowerCase() == 'www') {
                if (match_array(text, 'phpmyadmin').length == 0) {
                    text.splice(2, 0, 'phpmyadmin');
                }
            }

            //检测当前目录是否有laravel项目
            var match_laravel = match_array(text, 'laravel', false);
            var index = 0;

            //添加显示路径名以及跳转索引
            for (var i = 1; i < text.length - 2; i++) {
                if (text[i] == 'index' || text[i] == 'index.html') {
                    continue;
                }
                var li = document.createElement('li');
                var a = document.createElement('a');
                if (i == 1) {
                    a.innerHTML = 'Parent Directory';
                } else {
                    a.innerHTML = text[i];
                }
                a.href = text[i];
                if (i == match_laravel[index]) {
                    a.href = 'http://www.' + text[i] + '.com';
                    index++;
                }
                li.appendChild(a);
                ul.appendChild(li);
            }
            document.body.appendChild(ul);
        },
        fail: function(status) {
            alert("数据传输发生异常！HTTP状态码为：" + status);
        }
    }
    ajax(options);
}

//搜索数组中是否有匹配的字符串（忽略大小写）
function match_array(array, string, is_all = true) {
    var length_array = array.length;
    var match = new Array();
    var index = 0;
    if (is_all == true) {
        for (var i = 0; i < length_array; i++) {
            var value_array = array[i].toLowerCase();
            if (value_array == string) {
                match[index++] = i;
            }
        }
    } else {
        for (var i = 0; i < length_array; i++) {
            var value_array = array[i].toLowerCase();
            if (value_array.match(string) != null) {
                match[index++] = i;
            }
        }
    }
    return match;
}