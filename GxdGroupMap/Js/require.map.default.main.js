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
    var map = $.obear.CreateBaiduMap($("#mapCanvas")[0], {level:18});
    //添加标注
   var smarker= $.obear.AddMarker(map, 116.404, 39.915);
    var startpoint=new BMap.Point(116.404, 39.915);
    $.obear.AddClickEvent(map, "http://app.baidu.com/map/images/tiananmen.jpg", smarker,"0");
    //var model = {};
    //model.Count = 2;
    //$.post("/Map/QueryCommunity", { models: JSON.stringify(model) }, function (data) {

    //for (var i = 0; i < data.length; i++)
    //{
    setTimeout(function () {
        $.obear.AddLine(map, "../../image/icon/market.png", 116.404, 39.917, startpoint, "100");
        $.obear.AddPolyline(map, [startpoint, new BMap.Point(116.404, 39.917)])
    }, 2000)
    setTimeout(function () {
        $.obear.AddLine(map, "../../image/icon/market.png", 116.406, 39.915, startpoint, "100");
        $.obear.AddPolyline(map, [startpoint, new BMap.Point(116.406, 39.915)])
    }, 2000)
    setTimeout(function () {
        $.obear.AddLine(map, "../../image/icon/subway.png", 116.402, 39.913, startpoint, "300");
        $.obear.AddPolyline(map, [startpoint, new BMap.Point(116.402, 39.913)])
    }, 4000)
    setTimeout(function () {
        $.obear.AddLine(map, "../../image/icon/store.png", 116.404, 39.913, startpoint, "600");
        $.obear.AddPolyline(map, [startpoint, new BMap.Point(116.404, 39.913)])
    }, 6000)
    //}     
    //});
});