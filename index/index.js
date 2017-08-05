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
            if (text[text.length - 2].toLowerCase() == 'www') {
                text.splice(2, 0, 'phpmyadmin');
            }
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