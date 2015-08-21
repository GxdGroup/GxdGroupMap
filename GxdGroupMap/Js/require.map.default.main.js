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
    //var startpoint=new BMap.Point(116.404, 39.915);
    $.obear.AddClickEvent(map, "http://app.baidu.com/map/images/tiananmen.jpg", smarker,"0");
   
    //checkbox选择
    $("#submit").click(function () {
        map.clearOverlays();
        var smarker = $.obear.AddMarker(map, 116.404, 39.915);
        //var startpoint=new BMap.Point(116.404, 39.915);
        $.obear.AddClickEvent(map, "http://app.baidu.com/map/images/tiananmen.jpg", smarker, "0");
        var chkvalue = [];
        $('input[name="type"]:checked').each(function () {
            chkvalue.push($(this).val());
        });
        if (chkvalue.length == 0) {
            alert( '你还没有选择任何内容！');
        }
        else {
            $.obear.GetInterestpoint(map,chkvalue);
        }
    });
    //setTimeout(function () {
    //    $.obear.AddLine(map, "../../image/icon/market.png", 116.404, 39.917, startpoint, "100");
    //    $.obear.AddPolyline(map, [startpoint, new BMap.Point(116.404, 39.917)], "blue" )
    //}, 2000)
    //setTimeout(function () {
    //    $.obear.AddLine(map, "../../image/icon/market.png", 116.406, 39.915, startpoint, "100");
    //    $.obear.AddPolyline(map, [startpoint, new BMap.Point(116.406, 39.915)], "blue")
    //}, 2000)
    //setTimeout(function () {
    //    $.obear.AddLine(map, "../../image/icon/subway.png", 116.402, 39.913, startpoint, "300");
    //    $.obear.AddPolyline(map, [startpoint, new BMap.Point(116.402, 39.913)], "red")
    //}, 4000)
    //setTimeout(function () {
    //    $.obear.AddLine(map, "../../image/icon/subway.png", 116.400, 39.915, startpoint, "600");
    //    $.obear.AddPolyline(map, [startpoint, new BMap.Point(116.400, 39.915)], "red")
    //}, 4000)
    //setTimeout(function () {
    //    $.obear.AddLine(map, "../../image/icon/hospital.png", 116.405, 39.916, startpoint, "600");
    //    $.obear.AddPolyline(map, [startpoint, new BMap.Point(116.405, 39.916)], "black")
    //}, 5000)
    //setTimeout(function () {
    //    $.obear.AddLine(map, "../../image/icon/hospital.png", 116.406, 39.913, startpoint, "600");
    //    $.obear.AddPolyline(map, [startpoint, new BMap.Point(116.406, 39.913)], "black")
    //}, 5000)
    //setTimeout(function () {
    //    $.obear.AddLine(map, "../../image/icon/store.png", 116.404, 39.913, startpoint, "600");
    //    $.obear.AddPolyline(map, [startpoint, new BMap.Point(116.404, 39.913)], "yellow")
    //}, 6000)
    //setTimeout(function () {
    //    $.obear.AddLine(map, "../../image/icon/store.png", 116.399, 39.916, startpoint, "600");
    //    $.obear.AddPolyline(map, [startpoint, new BMap.Point(116.399, 39.916)], "yellow")
    //}, 6000)
   
});