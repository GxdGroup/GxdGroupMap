require(['obmap'], function (obmap) {
    var globlePoint;
    var map = $.obear.CreateBaiduMap($("#mapCanvas")[0], { level: 11 });                    //创建一个地图

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

    var _polygon;
    var _pId = 0;
    $(".selectList").each(function () {
        var url = "/Map/QueryArea";
        var areaJson;
        var temp_html;
        var oProvince = $(this).find(".province");
        var oCity = $(this).find(".city");
        var oDistrict = $(this).find(".district");
        //初始化省
        var province = function () {
            var model = {};
            model.AreaType = 0;
            temp_html = "";
            $.post(url, { models: JSON.stringify(model) }, function (data) {
                for (var j = 0; j < data.length; j++) {
                    temp_html += "<option value=" + data[j].区划代码 + ">" + data[j].区划名称 + "</option>";
                }
                oProvince.html(temp_html);
                city();
            });
        };
        //赋值市
        var city = function () {
            temp_html = "";
            var model = {};
            model.AreaType = 1;
            model.QHDM = oProvince.val();
            $.post(url, { models: JSON.stringify(model) }, function (data) {
                for (var j = 0; j < data.length; j++) {
                    temp_html += "<option value='" + data[j].区划代码 + "'>" + data[j].区划名称 + "</option>";
                }
                oCity.html(temp_html);
                district();
            });
        };
        //赋值县
        var district = function () {
            temp_html = "";
            var model = {};
            model.AreaType = 2;
            model.QHDM = oCity.val();
            $.post(url, { models: JSON.stringify(model) }, function (data) {
                for (var j = 0; j < data.length; j++) {
                    temp_html += "<option value='" + data[j].区划代码 + "'>" + data[j].区划名称 + "</option>";
                }
                oDistrict.html(temp_html);
            });
        };
        //选择省改变市
        oProvince.change(function () {
            //清空
            oCity.html('');
            oDistrict.html('');

            city();
        });
        //选择市改变县
        oCity.change(function () {
            district();
        });

        //选择区县展示多边形
        oDistrict.change(function () {
            //每次定位清空
            _polygon = [];

            var model = {};
            model.QHDM = oDistrict.val();
            //定义
            var BainJieN,
                BainJieNLength,
                YuanSu,
                Lng,
                Lat,
                BianJieArray,
                BianJieArrayLength;
            $.post("/Map/GetAreaByQHDM", { models: JSON.stringify(model) }, function (data) {
                var BianJie = data.边界;
                _pId = data.Id;
                if (BianJie === '') {
                    alert("暂无边界");
                } else {
                    //判断是否是多块边界
                    if (BianJie.indexOf(";") > 0) {
                        BainJieN = BianJie.split(';');
                        BainJieNLength = BainJieN.length;
                        for (var i = 0; i < BainJieNLength; i++) {
                            var mArray = [];
                            BianJieArray = BainJieN[i].split('|');
                            BianJieArrayLength = BianJieArray.length;
                            for (var j = 0; j < BianJieArrayLength; j++) {
                                YuanSu = BianJieArray[j];
                                Lng = YuanSu.split(',')[0];
                                Lat = YuanSu.split(',')[1];

                                mArray.push(new BMap.Point(Lng, Lat));
                            }

                            _polygon.push($.obear.CreatePolygon(map, mArray));
                        }
                    } else {
                        var sArray = [];
                        BianJieArray = BianJie.split('|');
                        BianJieArrayLength = BianJieArray.length;
                        for (var j = 0; j < BianJieArrayLength; j++) {
                            YuanSu = BianJieArray[j];
                            Lng = YuanSu.split(',')[0];
                            Lat = YuanSu.split(',')[1];

                            sArray.push(new BMap.Point(Lng, Lat));
                        }

                        _polygon.push($.obear.CreatePolygon(map, sArray));
                    }
                }
            });
        });
        //执行
        province();
    });

    $("#btnOpen").click(function () {
        if (_polygon === undefined || _polygon.length === 0) {
            alert("请先选择区块");
        } else {
            for (var i = 0; i < _polygon.length; i++) {
                $.obear.OpenPolygon(_polygon[i]);
            }
        }
    });
    $("#btnClose").click(function () {
        if (_polygon === undefined || _polygon.length === 0) {
            alert("请先选择区块");
        } else {
            for (var i = 0; i < _polygon.length; i++) {
                $.obear.ClosePolygon(_polygon[i]);
            }
        }
    });
    $("#btnSave").click(function () {
        if (_pId === 0) {
            alert("请先选择区块");
            return;
        } else {
            //更新
            var ss = "";
            var _pLength = _polygon.length;
            for (var i = 0; i < _pLength; i++) {
                var s = "";
                for (var j = 0; j < _polygon[i].getPath().length; j++) {
                    var _lng = _polygon[i].getPath()[j].lng;
                    var _lat = _polygon[i].getPath()[j].lat;
                    s += _lng + ',' + _lat + '|';
                }
                if (_pLength > 1)
                { 
                    ss += s + ';';
                }
            };
            //如数据库
            $.post(url, { models: JSON.stringify(model) }, function (data) {
               
            });
        }
    });
});