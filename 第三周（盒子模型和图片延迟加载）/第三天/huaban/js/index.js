var main = utils.getElesByClass('main')[0];
var uls = main.getElementsByTagName('ul'); // [ul,ul,ul,ul,ul]
var imgs = main.getElementsByTagName('img'); // 所有的img
var ulsAry = utils.listToArray(uls); // 数组
// 获取数据
var data = null;
;(function (){
    var xhr = new XMLHttpRequest();
    xhr.open('get','data.txt?_='+Math.random(),false); // 在接口ulr的末尾添加一个随机数是为了避免缓存问题
    xhr.onreadystatechange = function (){
        // 以2开头的状态码都是成功
        if(xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
            data = utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send();
})();
console.log(data);

// 绑定数据
;(function bindData(){
    if(data && data.length){
        for(var i = 0; i < /*data.length*/50; i++){
            var ran = Math.round(Math.random()*8);
            var curData = data[/*i*/ran]; // { src : url,  title : 标题 }
            var li = document.createElement('li');
            var img = document.createElement('img');
            img.setAttribute('real',curData.src); // 给图片添加real自定义属性，用来图片延迟加载
            // 160 - 350 之间的随机高度
            img.style.height = Math.round(Math.random()*(350-160)+160) + 'px';
            //img.src = curData.src; // 看样式用的 => 删除 => 图片延迟加载

            li.appendChild(img);
            var p = document.createElement('P');
            p.innerHTML = curData.title;
            li.appendChild(p);
            var a = document.createElement('a');
            a.innerHTML = '采集';
            a.href = 'javascript:void 0';
            li.appendChild(a);
            // 要把这个li连带里面的子元素添加给高度最小的ul
            // 先找到高度最小的ul => 排序 => 按照高度排序
            ulsAry.sort(function (ul1,ul2){
                // 如果盒子的display属性是none，那么和盒子的offsetHeight是0
                return ul1.offsetHeight - ul2.offsetHeight;
            });
            ulsAry[0].appendChild(li);
        }
    }
})();

// 图片延迟加载 => 淡入 =>  多个单张图片延迟加载
;(function imgsDelayLoad(){
    for(var i = 0; i < imgs.length; i++){
        var curImg = imgs[i]; // 立刻要做判断这个curImg是否完全进入到窗口内
        var _a = utils.win('clientHeight') + utils.win('scrollTop');
        var _b = curImg.offsetHeight + utils.offset(curImg).top;
        if(_a > _b){ // 条件成立说明这个图片已经完全进入到窗口内
            // 我需要把real的值赋值给src，但是在赋值之前检查资源有效性
            
        }
    }
})();


