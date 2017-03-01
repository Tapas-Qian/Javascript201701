// 先获取到可能要操作到的元素
var product = document.getElementById('product'); // 最外层
var nav = product.getElementsByClassName('nav')[0]; //
var btns = nav.getElementsByTagName('span'); // 评论和价格按钮

var productList = product.getElementsByTagName('ul')[0]; // 获取商品列表
var lis = productList.getElementsByTagName('li'); // 要排序的这些li

console.log(lis); // [] => 需要去后台获取数据然后把获取回来的数据添加到页面中

// ajax
var xhr = new XMLHttpRequest(); // 创建一个异步对象
xhr.open('get','data.txt',false); // get方式/post， 接口, 同步还是异步  false : 同步
xhr.onreadystatechange = function (){
    if(xhr.readyState == 4 && xhr.status == 200){
        // 404  不存在 前端
        // 500  服务端错误
        // 304  本地缓存
        // 200   成功
        xhr.responseText; // 这个属性保存着从接口获取回来的数据 响应文本
    }
}
xhr.send(null); 











