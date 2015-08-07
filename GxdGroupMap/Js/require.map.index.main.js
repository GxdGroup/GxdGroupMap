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
    //添加自定义图标
    $('#picturebutton').click(function () {
        $.obear.AddPicture(map, "http://developer.baidu.com/map/jsdemo/img/fox.gif", 116.404, 39.915);
    });
    $("#searchbutton").click(function(){$.obear.Search(map,$("#searchaddress").val());});
});