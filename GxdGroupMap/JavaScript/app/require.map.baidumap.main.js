require(['obmap'], function (obmap) {
    var globlePoint;
    var map = $.obear.CreateBaiduMap($("#mapCanvas")[0], { level: 16 });                    //创建一个地图

    var styleOptions = {
        strokeColor: "green",                                                              //边线颜色。
        fillColor: "green",                                                                //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 1,                                                                   //边线的宽度，以像素为单位。
        strokeOpacity: 1,	                                                               //边线透明度，取值范围0 - 1。
        fillOpacity: 0.3,                                                                  //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid'                                                               //边线的样式，solid或dashed。
    }

    var drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false,                                                                     //是否开启绘制模式
        enableDrawingTool: true,                                                           //是否显示工具栏
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT,                                                 //位置
            offset: new BMap.Size(5, 50),                                                  //偏离值
            scale: 0.7,
            drawingModes: [                                                                //绘制类型
            BMAP_DRAWING_CIRCLE,
            BMAP_DRAWING_POLYGON,
            BMAP_DRAWING_RECTANGLE
            ]
        },
        circleOptions: styleOptions,                                                       //圆的样式
        polylineOptions: styleOptions,                                                     //线的样式
        polygonOptions: styleOptions,                                                      //多边形的样式
        rectangleOptions: styleOptions                                                     //矩形的样式
    });

    drawingManager.addEventListener('overlaycomplete', function (e) {
        var pointarray = $.obear.getPoints();
        if (pointarray != null) {
            for (var i = 0; i < pointarray.length; i++) {
                var point = new BMap.Point(pointarray[i].Lng, pointarray[i].Lat)

                if ($.obear.isPointInGraph(point, e.drawingMode, e.overlay)) {
                    //$.obear.AddSelfMarker(map, new BMap.Point(pointArray[i].Lng, pointArray[i].Lat), $.obear.Icon.Hospital);
                    $.obear.AddMarker(map, point.lng, point.lat);
                }
            }
        } else {
            alert("当前视野范围内不存在点");
        }
    });

    $("#tool_map_clear").click(function () {
        map.clearOverlays();
    });
    $("#ckbHospital").change(function () {
        if ($("#ckbHospital").prop("checked")) {
            var pointArray = $.obear.QueryInterestpoint($("#ckbHospital").val());
            for (var i = 0; i < pointArray.length; i++) {
                $.obear.AddSelfMarker(map, new BMap.Point(pointArray[i].Lng, pointArray[i].Lat), $.obear.Icon.Hospital);
                var array = [globlePoint, new BMap.Point(pointArray[i].Lng, pointArray[i].Lat)];
                if (globlePoint) {
                    $.obear.AddPolyline(map, array, "red");
                }
            }
        } else {
            map.clearOverlays();
        }
    });

    $("#ckbSubway").change(function () {
        if ($("#ckbSubway").prop("checked")) {
            var pointArray = $.obear.QueryInterestpoint($("#ckbSubway").val());
            for (var i = 0; i < pointArray.length; i++) {
                $.obear.AddSelfMarker(map, new BMap.Point(pointArray[i].Lng, pointArray[i].Lat), $.obear.Icon.Subway);
                if (globlePoint) {
                    $.obear.AddPolyline(map, [globlePoint, new BMap.Point(pointArray[i].Lng, pointArray[i].Lat)], "green");
                }
            }
        } else {
            map.clearOverlays();
        }
    });
    $("#ckbStore").change(function () {
        if ($("#ckbStore").prop("checked")) {
            var pointArray = $.obear.QueryInterestpoint($("#ckbStore").val());
            for (var i = 0; i < pointArray.length; i++) {
                $.obear.AddSelfMarker(map, new BMap.Point(pointArray[i].Lng, pointArray[i].Lat), $.obear.Icon.Store);
                if (globlePoint) {
                    $.obear.AddPolyline(map, [globlePoint, new BMap.Point(pointArray[i].Lng, pointArray[i].Lat)], "yellow");
                }
            }
        } else {
            map.clearOverlays();
        }
    });
    $("#btnSerach").click(function () {
        var point = new BMap.Point(116.411296, 39.978437);
        globlePoint = point;
        map.panTo(point);
        $.obear.AddSelfMarker(map, point, $.obear.Icon.House);
    });
});