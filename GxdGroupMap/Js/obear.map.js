define(["obear"], function (obear) {
    var BaiduMap = function (ele, opt) {
        this.element = ele,
        this.defaults = {
            lng: 116.404,
            lat: 39.915,
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
            map.addEventListener("dblclick", function (e) {
                map.clearOverlays();
                marker = obear.AddMarker(map, e.point.lng, e.point.lat);
                map.addEventListener("click", addclick);
                function addclick(m) {
                    var point = m.point;
                    obear.getPointarray(map, marker, point);
                    map.removeEventListener("click", addclick);
                }
            });           
                     
            return map;
        }
    };

    //创建一个百度地图
    obear.CreateBaiduMap = function (element, options) {
        var baiduMap = new BaiduMap(element, options);
        return baiduMap.create();
    };
    obear.AddMarker = function (map, x, y) {
        //map.clearOverlays();
        var new_point = new BMap.Point(x, y);
        var marker = new BMap.Marker(new_point);
        map.addOverlay(marker);
        return marker;
    };
    //得到点的数组
    obear.getPointarray = function (map, marker, point) {
        var radius = map.getDistance(marker.getPosition(), point);
        var circle = new BMap.Circle(marker.getPosition(), radius);
        map.addOverlay(circle);
        var sbounds = circle.getBounds();
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
    obear.AddPicture = function (map, picture, x, y) {
        //map.clearOverlays();
        var sAddress = picture;
        var point = new BMap.Point(x, y);
        var sIcon = new BMap.Icon(sAddress, new BMap.Size(36, 36));
        var marker2 = new BMap.Marker(point, { icon: sIcon });  // 创建标注
        marker2.enableDragging();
        map.addOverlay(marker2); //放置图标
    };
    obear.Search = function (map, array) {
        map.clearOverlays();
        var local = new BMap.LocalSearch(map, {
            renderOptions: { map: map }
        });
        local.search(array);
    }
});