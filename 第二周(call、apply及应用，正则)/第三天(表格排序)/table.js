//
var table = document.getElementById('table');
var tHead = table.tHead; // 表格特殊的获取方式  表头
var tHeadRow = tHead.rows[0]; // rows获取行 tr
var tHeadThs = tHeadRow.cells; // cells就是单元格 列

var tBody = table.tBodies[0]; // 所有tbody的第
// 一个
var tBodyRows = tBody.rows; // 获取表格主体下所有的行。暂时没有

// ajax => async javascript and xml
;(function (){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','data.txt',false);
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4 && xhr.status == 200){
            window.data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
})();
console.log(window.data); // [obj,obj...]

// 动态添加
;(function (){
    if(window.data && window.data.length){
        var frg = document.createDocumentFragment();
        for(var i = 0; i < data.length; i++){
            // 只要数组中有一项那么创建一个tr
            var tr = document.createElement('tr');
            // 只要对象里有一组属性那么创建一个td
            for(var key in data[i]){ // {country,capital...}
                var td = document.createElement('td');
                // if(key == 'develop'){
                //      if(data[i].develop == 0){
                //          td.innerHTML = '发展中';
                //      }else{
                //          td.innerHTML = '发达';
                //      }
                // }else{
                //     td.innerHTML = data[i][key];
                // }
                td.innerHTML = key == 'develop' ? data[i][key] ? '发达' : '发展中' : data[i][key];
                tr.appendChild(td);
            }
            frg.appendChild(tr);
        }
        tBody.appendChild(frg);
        frg = null;
    }
})();

// 隔行变色
function changeBg(){
    for(var i = 0; i < tBodyRows.length; i++){
        tBodyRows[i].className = 'c' + i%2;
        // tBodyRows[i].className = i%2 ? 'c0' : 'c1';
    }
}
changeBg();

// 给表头列绑定点击事件
;(function bindEvent(){
    for(var i = 0; i < tHeadThs.length; i++){
        if(tHeadThs[i].className == 'cursor'){ // 只给有cursor类样式的绑定
            tHeadThs[i].onclick = function (){
                // 按照当前(this)点击的这一列去排序
                sort();
                changeBg();
            }
        }
    }
})();

function sort(){ // sort负责排序
    var tBodyRowsAry = [].slice.call(tBodyRows);
    tBodyRowsAry.sort(function (tr1,tr2){
        return tr1.cells[2].innerHTML - tr2.cells[2].innerHTML;
    });
    for(var i = 0; i < tBodyRowsAry.length; i++){
        tBody.appendChild(tBodyRowsAry[i]);
    }
}


