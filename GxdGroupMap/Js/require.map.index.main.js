require.config({
    baseUrl: '../Js',
    paths: {
        jquery: 'jquery-2.1.4',
        obear: 'obear',
        obmap: 'obear.map'
    }
});

require(['obmap'], function (obmap) {
    //创建一个地图
    var map = $.obear.CreateBaiduMap($("#mapCanvas")[0]);
    //添加标注
    $.obear.AddMarker(map, 116.404, 39.915);
    //批量添加点
    $('#markbutton').click(function () {
        $.obear.AddGroupMark(map);
    });
    //添加自定义图标
    $('#picturebutton').click(function () {
        $.obear.AddPicture(map, "http://developer.baidu.com/map/jsdemo/img/fox.gif", 116.404, 39.915);
    });
    $("#searchbutton").click(function () { $.obear.Search(map, $("#searchaddress").val()); });
    //搜索自动填充功能
    var autoComplete = new BMap.Autocomplete(    //建立一个自动完成的对象
         {
             "input": "searchaddress",
             "location": map
         })

    autoComplete.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G($("#searchResultPanel").id).innerHTML = str;
    });
    //var myValue;
    //ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
    //    var _value = e.item.value;
    //    myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
    //    G($("#searchResultPanel").id).innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

    //    setPlace();
    //});
    //function setPlace() {
    //    map.clearOverlays();    //清除地图上所有覆盖物
    //    function myFun() {
    //        var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
    //        map.centerAndZoom(pp, 18);
    //        map.addOverlay(new BMap.Marker(pp));    //添加标注
    //    }
    //    var local = new BMap.LocalSearch(map, { //智能搜索
    //        onSearchComplete: myFun
    //    });
    //    local.search(myValue);
    //}
    });    