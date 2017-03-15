// 获取元素
var wrap = utils.getElementsByClass('wrap')[0];

var inner = utils.getElementsByClass('inner', wrap)[0];
var focusList = utils.getElementsByClass('focusList', wrap)[0];
var left = utils.children(wrap, 'a')[0];
var right = utils.children(wrap, 'a')[1];

var imgs = inner.getElementsByTagName('img'); // [????]
var lis = focusList.getElementsByTagName('li');

// 获取数据
var data = null;
;(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data.txt?_=' + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
})();
console.log(data);

// 绑定数据
;(function () {
    if (data && data.length) {
        var str = '';
        var str1 = '';
        for (var i = 0; i < data.length; i++) {
            //
            str += '<div><img src="" real="' + data[i].src + '"></div>'; // imgs
            str1 += i == 0 ? '<li class="cur"></li>' : '<li></li>'; // lis
        }
        str += '<div><img src="" real="' + data[0].src + '"></div>'; // 为了保证无缝轮播在末尾增加第一张图片。
        var winWidth = utils.win('clientWidth'); // 窗口宽度
        utils.css(inner,'width',winWidth*(data.length+1)); // 修改包含所有图片的inner的宽度
        inner.innerHTML = str;
        focusList.innerHTML = str1;
        // 重新设置每一张图片的宽度
        for(var i = 0; i < imgs.length; i++){
            utils.css(imgs[i].parentNode,'width',winWidth);
        }
    }
})();

// 验证图片有效性
;(function () {
    for (var i = 0; i < imgs.length; i++) {
        (function (i) {
            var curImg = imgs[i];
            var tempImg = document.createElement('img');
            tempImg.src = curImg.getAttribute('real');
            tempImg.onload = function () {
                curImg.src = this.src;
                animate({
                    ele: curImg,
                    target: {
                        opacity: 1
                    },
                    duration: 300
                });
            }
        })(i);
    }
})();

// 开始轮播
var index = 0; // index的值就是哪一张图片应该出现的索引
var timer = window.setInterval(autoMove,2000);
function autoMove() {
    var winWidth = utils.win('clientWidth'); // 浏览器的宽度 => 一张图片的宽度
    index++; // index++之后的值就是我立刻要运动到的终点
    if(index == /*5*/data.length+1){ // 视觉上看到已经是第一张了,下一次应该是第二张
        utils.css(inner,'left',0);
        index = 1;
    }
    animate({
        ele: inner,
        target: {
            left: -index * winWidth
        },
        duration: 500
    });
}



