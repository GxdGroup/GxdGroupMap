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
            map.centerAndZoom(point, this.options.level);
            map.enableDragging();
            if (this.options.scroll) {
                map.enableScrollWheelZoom();
            }
            map.enableContinuousZoom();
            map.disableDoubleClickZoom();

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
});