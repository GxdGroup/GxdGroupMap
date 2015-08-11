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
    obear.AddGroupMark = function (map) {
        map.clearOverlays(); 
        var pointdata = [[116.417854, 39.921988,   
	"http://app.baidu.com/map/images/tiananmen.jpg","北京市东城区王府井大街88号乐天银泰百货八层"],
					 [116.406605, 39.921585, "http://app.baidu.com/map/images/tiananmen.jpg", "地址：北京市东城区东华门大街"],
					 [116.412222, 39.912345, "http://app.baidu.com/map/images/tiananmen.jpg", "地址：北京市东城区正义路甲5号"]
        ];
        var Opts = {
            width: 500,     // 信息窗口宽度
            height: 180,     // 信息窗口高度
            //title: "信息窗口", // 信息窗口标题
            enableMessage: true//设置允许信息窗发送短息
        };
        for (var i = 0; i < pointdata.length; i++) {
            var marker = new BMap.Marker(new BMap.Point(pointdata[i][0], pointdata[i][1]));  // 创建标注
            var message = pointdata[i][2];
            var address = pointdata[i][3];
            map.addOverlay(marker);               // 将标注添加到地图中
            AddClickEvent(message, marker,address);
        }
        function AddClickEvent(message, marker, address) {
            marker.addEventListener("click", function (e) {
                var Point = new BMap.Point(e.target.getPosition().lng, e.target.getPosition().lat);
                var infoWindow = new BMap.InfoWindow("<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" + "<img style='float:right;margin:4px' id='imgDemo' src='" + message + "' width='250' height='104' title='天安门'/>" + "地址：" + address, Opts);
                map.openInfoWindow(infoWindow, Point);
            })
        };
    }
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
        map.clearOverlays();
        var local = new BMap.LocalSearch(map, {
            renderOptions: { map: map }
        });
        local.search(array);
    }
});