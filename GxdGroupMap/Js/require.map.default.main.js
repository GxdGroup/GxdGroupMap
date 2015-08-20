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
    map.anchorBL{ display:none;};
    //添加标注
    $.obear.AddMarker(map, 116.404, 39.915);

    var model = {};
    model.Count = 2;
    $.post("/Map/QueryCommunity", { models: JSON.stringify(model) }, function (data) {

        for (var i = 0; i < data.length; i++)
        {
            $.obear.AddMarker(map, data[i].Lng, data[i].Lat);
            alert(data[i].Name);
        }
       
    });
});