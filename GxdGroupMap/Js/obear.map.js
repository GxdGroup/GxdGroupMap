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
            //function showinfo(e) {
            //    alert(e.point.lng + "," + e.point.lat);
            //}
            //map.addEventListener("click", showinfo);
            return map;
        }
    };

    //创建一个百度地图
    obear.CreateBaiduMap = function (element, options) {
        var baiduMap = new BaiduMap(element, options);
        return baiduMap.create();
    };
    obear.AddMarker = function (map, x, y) {
            map.clearOverlays();
            var new_point = new BMap.Point(x, y);
            var marker = new BMap.Marker(new_point);
            map.addOverlay(marker);
            return new_point;
    };
    obear.AddPicture = function (map,picture,x,y)
    {
        map.clearOverlays();
        var sAddress = picture;
        var point = new BMap.Point(x, y);
        var sIcon = new BMap.Icon(sAddress, new BMap.Size(300, 157));
        var marker2 = new BMap.Marker(point, { icon: sIcon });  // 创建标注
        marker2.enableDragging();  
        map.addOverlay(marker2); //放置图标
    }
    obear.Search=function(map,array)
    {                  
        var local = new BMap.LocalSearch(map, {
            renderOptions: { map: map }
        });
        local.search(array);
    }
});