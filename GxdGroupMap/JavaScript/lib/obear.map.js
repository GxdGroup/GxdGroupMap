define(["obear"], function (obear) {
    var BaiduMap = function (ele, opt) {
        this.element = ele,
        this.defaults = {
            lng: 116.411529,
            lat: 39.971664,
            level: 15,
            scroll: true
        };
        this.options = $.extend(this.defaults, opt || {});
    };
    BaiduMap.prototype = {
        create: function () {
            var map = new BMap.Map(this.element);
            var point = new BMap.Point(this.options.lng, this.options.lat);
            var top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
            var top_left_navigation = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });  //左上角，添加默认缩放平移控件
            var mapType2 = new BMap.MapTypeControl({ anchor: BMAP_ANCHOR_TOP_LEFT });
            var marker;
            map.centerAndZoom(point, this.options.level);
            map.enableDragging();
            if (this.options.scroll) {
                map.enableScrollWheelZoom();
            }
            map.enableContinuousZoom();
            map.disableDoubleClickZoom();
            map.addControl(top_left_control);
            map.addControl(top_left_navigation);
            map.addControl(mapType2);
            map.setCurrentCity("北京");
            //map.addEventListener("dblclick", function (e) {
            //    map.clearOverlays();
            //    marker = obear.AddMarker(map, e.point.lng, e.point.lat);
            //    map.addEventListener("click", addclick);
            //    function addclick(m) {
            //        var point = m.point;
            //        obear.getPointarray(map, marker, point);
            //        map.removeEventListener("click", addclick);
            //    }
            //});

            return map;
        }
    };
    /*
      定义地图中几种图形类型
      2015-8-27 lwb
    */
    obear.Graph = {
        Circle: "circle",
        Rectangle: "rectangle",
        Polygon: "polygon"
    };
    /*
      定义图标类型
      2015-8-27 lwb
    */
    obear.Icon = {
        Subway: "../../image/icon/subway.png",
        Hospital: "../../image/icon/hospital.png",
        Store: "../../image/icon/store.png",
        House: "../../image/icon/house.png"
    };
    //创建一个百度地图
    obear.CreateBaiduMap = function (element, options) {
        var baiduMap = new BaiduMap(element, options);
        return baiduMap.create();
    };
    //添加折线
    obear.AddPolyline = function (map, array, color) {
        var scolor = color;
        var polyline = new BMap.Polyline(array, { strokeColor: scolor, strokeWeight: 2, strokeOpacity: 0.5 });
        map.addOverlay(polyline);

        var point = new BMap.Point((array[0].lng + array[1].lng) / 2, (array[0].lat + array[1].lat) / 2)
        var length = map.getDistance(array[0], array[1]).toFixed(2);
        polyline.addEventListener("mouseover", function () {
            var opts = {
                position: point,
                offset: new BMap.Size(0, 0)
            }
            var label = new BMap.Label(length + "m", opts);
            label.setStyle({
                color: "green",
                fontSize: "10px",
                height: "16px",
                lineHeight: "16px",
                fontFamily: "微软雅黑"
            });
            map.addOverlay(label);
            polyline.addEventListener("mouseout", function () {
                map.removeOverlay(label)
            });
        });
    };

    obear.AddMarker = function (map, x, y) {
        //map.clearOverlays();
        var new_point = new BMap.Point(x, y);
        var marker = new BMap.Marker(new_point);
        map.addOverlay(marker);
        return marker;
    };
    /*
      添加自定义图标坐标点
      2015-8-27 lwb
    */
    obear.AddSelfMarker = function (map, point, icon) {
        var selfIcon = new BMap.Icon(icon, new BMap.Size(36, 36));
        var selfMarker = new BMap.Marker(point, { icon: selfIcon });
        map.addOverlay(selfMarker);
    };

    //得到点的数组
    obear.getPointarray = function (map, sbounds) {
        //var radius = map.getDistance(marker.getPosition(), point);
        //var circle = new BMap.Circle(marker.getPosition(), radius);
        //map.addOverlay(circle);
        //var sbounds = circle.getBounds();
        var model = {};
        var spointarray = [];
        model.Count = 2;
        $.post("/Map/QueryCommunity", { models: JSON.stringify(model) }, function (pointdata) {
            for (var i = 0; i < pointdata.length; i++) {
                var spoint = new BMap.Point(pointdata[i].Lng, pointdata[i].Lat)
                if (sbounds.containsPoint(spoint)) {
                    obear.AddMarker(map, spoint.lng, spoint.lat);
                }
            }
        });

    };
    /*
     添加多边形
     2015-10-8 lwb
    */
    obear.CreatePolygon = function (map, arr) {
        map.panTo(arr[0]);
        var polygon = new BMap.Polygon(arr, { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 });       
        map.addOverlay(polygon);

        return polygon;
    };
    obear.OpenPolygon = function (p) {
        p.enableEditing();
    }
    obear.ClosePolygon = function (p) {
        p.disableEditing();
    }
    /*
      获取矩形（当前屏幕|或指定矩形）范围内的坐标点
      2015-8-27 lwb
    */
    obear.getPoints = function () {
        var pointArray;
        var model = {};
        model.Count = 2;
        $.ajax({
            type: "post",
            url: "/Map/QueryCommunity",
            data: { models: JSON.stringify(model) },
            async: false,
            success: function (data) {
                pointArray = data;
            }
        });
        return pointArray;
    };

    /*
      判断点是否在指定图形（圆形|矩形|多边形|可扩展）范围内
      2015-8-27 lwb
    */
    obear.isPointInGraph = function (point, type, graph) {
        switch (type) {
            case obear.Graph.Circle:
                if (BMapLib.GeoUtils.isPointInCircle(point, graph)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case obear.Graph.Rectangle:
                if (BMapLib.GeoUtils.isPointInRect(point, graph.getBounds())) {
                    return true;
                } else {
                    return false;
                }
                break;
            case obear.Graph.Polygon:
                if (BMapLib.GeoUtils.isPointInPolygon(point, graph)) {
                    return true;
                } else {
                    return false;
                }
                break;
            default:
                return false;
        }
    };

    //批量添加点
    //obear.AddGroupMark = function (map) {
    //    map.clearOverlays();
    //    var model = {};
    //    model.Count = 2;
    //    var Opts = {
    //        width: 465,     // 信息窗口宽度
    //        height: 140,     // 信息窗口高度
    //        //title: "信息窗口", // 信息窗口标题
    //        enableMessage: true//设置允许信息窗发送短息
    //    };
    //    $.post("/Map/QueryCommunity", {
    //        models: JSON.stringify(model)
    //    }, function (pointdata) {
    //        for (var i = 0; i < pointdata.length; i++) {
    //            var smarker = new BMap.Marker(new BMap.Point(pointdata[i].Lng, pointdata[i].Lat));  // 创建标注
    //            mpointarray.push(pointdata[i].Lng, pointdata[i].Lat);
    //            var message = pointdata[i].Picurl;
    //            var address = pointdata[i].Address;
    //            map.addOverlay(smarker).hide();               // 将标注添加到地图中
    //            AddClickEvent(message, marker, address);
    //        }
    //    }
    //    );
    //    function AddClickEvent(message, marker, address) {
    //        smarker.addEventListener("click", function (e) {
    //            var Point = new BMap.Point(e.target.getPosition().lng, e.target.getPosition().lat);
    //            var infoWindow = new BMap.InfoWindow("<p style='margin:0;color:blue'>天安门</p>" + "<table width='450' cellspacing='0' cellpadding='0'><tbody><tr><td   rowspan='2' align='center' valign='middle' width='153'><img src=" + message + " height='89' width='131'></td> <td  height='22' width='260'>" + "天安门" + "</td></tr><tr><td height='22'>" + address + "</td></tr></tbody></table>", Opts);
    //            map.openInfoWindow(infoWindow, Point);
    //        })
    //    };
    //};
    obear.AddClickEvent = function (map, picture, marker, message) {
        var Opts = {
            width: 350,     // 信息窗口宽度
            height: 100,     // 信息窗口高度
            //title: "信息窗口", // 信息窗口标题
            enableMessage: true//设置允许信息窗发送短息
        };
        var smarker = marker;
        smarker.addEventListener("click", function (e) {
            var Point = new BMap.Point(e.target.getPosition().lng, e.target.getPosition().lat);
            var infoWindow = new BMap.InfoWindow("<p style='margin:0;color:blue'>天安门</p>" + "<table width='450' cellspacing='0' cellpadding='0'><tbody><tr><td   rowspan='2' align='center' valign='middle' width='153'><img src=" + picture + " height='89' width='131'></td> <td  height='22' width='260'>" + "距离天安门" + "</td></tr><tr><td height='22'>" + message + "米</td></tr></tbody></table>", Opts);
            map.openInfoWindow(infoWindow, Point);
        })
    };
    obear.AddLine = function (map, picture, x, y, startpoint, length) {
        var spoint = startpoint;
        var slength = length;
        var sAddress = picture;
        var point = new BMap.Point(x, y);
        var sIcon = new BMap.Icon(sAddress, new BMap.Size(36, 36));
        var marker2 = new BMap.Marker(point, { icon: sIcon });  // 创建标注
        obear.AddClickEvent(map, sAddress, marker2, length);
        map.addOverlay(marker2); //放置图标
    };
    obear.AddPicture = function (map, picture, x, y) {
        //map.clearOverlays();       
        var sAddress = picture;
        var point = new BMap.Point(x, y);
        var sIcon = new BMap.Icon(sAddress, new BMap.Size(36, 36));
        var marker2 = new BMap.Marker(point, { icon: sIcon });  // 创建标注
        obear.AddClickEvent(sAddress, marker2);
        map.addOverlay(marker2); //放置图标
    };
    obear.Search = function (map, array) {
        map.clearOverlays();
        var local = new BMap.LocalSearch(map, {
            renderOptions: { map: map }
        });
        local.search(array);
    }
    //添加绘图工具
    obear.AddDrawingManager = function (map) {
        var styleOptions = {
            strokeColor: "blue",    //边线颜色。
            fillColor: "blue",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        }
        var pointarray = [];
        pointarray.push(new BMap.Point(116.399, 39.910));
        pointarray.push(new BMap.Point(116.405, 39.920));
        pointarray.push(new BMap.Point(116.423493, 39.907445));
        //实例化鼠标绘制工具
        var drawingManager = new BMapLib.DrawingManager(map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: true, //是否显示工具栏
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                offset: new BMap.Size(5, 5), //偏离值
            },
            circleOptions: styleOptions, //圆的样式
            polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions, //多边形的样式
            rectangleOptions: styleOptions //矩形的样式
        });
        drawingManager.addEventListener('overlaycomplete', Getpoint);
        function Getpoint(e) {
            for (var i = 0; i < pointarray.length; i++) {
                var marker = new BMap.Marker(pointarray[i]);
                map.addOverlay(marker);
                var polyline = new BMap.Polyline([
        (116.404, 39.915), pointarray[i]], { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 });
                map.addOverlay(polyline);
            }
        }
    }
    /*
      获取兴趣点数组
      2015-8-27 lwb
    */
    obear.QueryInterestpoint = function (type) {
        var pointArray;
        var model = {};
        model.Type = type;
        $.ajax({
            type: "post",
            url: "/Map/QueryInterestpoint",
            data: { models: JSON.stringify(model) },
            async: false,
            success: function (data) {
                pointArray = data;
            }
        });
        return pointArray;
    }
    //数据库提取数据
    obear.GetInterestpoint = function (map, type) {
        var model = {};
        var startpoint = new BMap.Point(116.404, 39.915);
        for (var i = 0; i < type.length; i++) {
            model.Type = type[i];
            $.post("/Map/QueryInterestpoint", { models: JSON.stringify(model) }, function (data) {
                for (var j = 0; j < data.length; j++) {
                    var s = j;
                    setTimeout(Interestpoint(s, data), (s * 1000 + 6000))
                }
            });
        }
        function Interestpoint(s, data) {
            $.obear.AddLine(map, "../../image/icon/market.png", data[s].Lng, data[s].Lat, startpoint, "100");
            $.obear.AddPolyline(map, [startpoint, new BMap.Point(data[s].Lng, data[s].Lat)], "blue")
        }
    }
});