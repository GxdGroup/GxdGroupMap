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

    //var model = {};
    //model.Count = 2;
    //$.post("/Map/QueryCommunity", { models: JSON.stringify(model) }, function (data) {

    //for (var i = 0; i < data.length; i++)
    //{
    setTimeout(function () {
        $.obear.AddPicture(map,"../../image/icon/market.png", 116.404, 39.917);
        $.obear.AddPolyline(map, [new BMap.Point(116.404, 39.915), new BMap.Point(116.404, 39.917)])
    }, 2000)
    setTimeout(function () {
        $.obear.AddPicture(map, "../../image/icon/market.png", 116.406, 39.915);
        $.obear.AddPolyline(map, [new BMap.Point(116.404, 39.915), new BMap.Point(116.406, 39.915)])
    }, 2000)
    setTimeout(function () {
        $.obear.AddPicture(map, "../../image/icon/subway.png", 116.402, 39.913);
        $.obear.AddPolyline(map, [new BMap.Point(116.404, 39.915), new BMap.Point(116.402, 39.913)])
    }, 4000)
    setTimeout(function () {
        $.obear.AddPicture(map, "../../image/icon/store.png", 116.404, 39.913);
        $.obear.AddPolyline(map, [new BMap.Point(116.404, 39.915), new BMap.Point(116.404, 39.913)])
    }, 6000)
    //}     
    //});
});