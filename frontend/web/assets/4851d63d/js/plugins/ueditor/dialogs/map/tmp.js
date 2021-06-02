 

    var map = new BMap.Map("container"),marker,point,styleStr;
    map.enableScrollWheelZoom();
    map.enableContinuousZoom();
    function doSearch(){
        if (!document.getElementById('city').value) {
            alert(lang.cityMsg);
            return;
        }
        var search = new BMap.LocalSearch(document.getElementById('city').value, {
            onSearchComplete: function (results){
                if (results && results.getNumPois()) {
                    var points = [];
                    for (var i=0; i<results.getCurrentNumPois(); i++) {
                        points.push(results.getPoi(i).point);
                    }
                    if (points.length > 1) {
                        map.setViewport(points);
                    } else {
                        map.centerAndZoom(points[0], 13);
                    }
                    point = map.getCenter();
                    marker.setPoint(point);
                } else {
                    alert(lang.errorMsg);
                }
            }
        });
        search.search(document.getElementById('address').value || document.getElementById('city').value);
    }
    //获得参数
    function getPars(str,par){
        var reg = new RegExp(par+"=((\\d+|[.,])*)","g");
        return reg.exec(str)[1];
    }
    function init(){
        var mapNode = editor.selection.getRange().getClosedNode(),
            isMapImg = mapNode && /api[.]map[.]baidu[.]com/ig.test(mapNode.getAttribute("src")),
            isMapIframe = mapNode && domUtils.hasClass(mapNode, 'ueditor_baidumap');
        if(isMapImg || isMapIframe){
            var url, centerPos, markerPos;
            if(isMapIframe) {
                url = decodeURIComponent(mapNode.getAttribute("src"));
                $G('is_dynamic').checked = true;
                styleStr = mapNode.style.cssText;
            } else {
                url = mapNode.getAttribute("src");
                styleStr = mapNode.style.cssText;
            }

            centerPos = getPars(url,"center").split(",");
            markerPos = getPars(url, "markers").split(",");
            point = new BMap.Point(Number(centerPos[0]),Number(centerPos[1]));
            marker = new BMap.Marker(new BMap.Point(Number(markerPos[0]), Number(markerPos[1])));
            map.addControl(new BMap.NavigationControl());
            map.centerAndZoom(point, Number(getPars(url,"zoom")));
        }else{
            point = new BMap.Point(116.404, 39.915);    // 创建点坐标
            marker = new BMap.Marker(point);
            map.addControl(new BMap.NavigationControl());
            map.centerAndZoom(point, 10);                     // 初始化地图,设置中心点坐标和地图级别。
        }
        marker.enableDragging();
        map.addOverlay(marker);
    }
    init();
    document.getElementById('address').onkeydown = function (evt){
        evt = evt || event;
        if (evt.keyCode == 13) {
            doSearch();
        }
    };
    dialog.onok = function (){
        var center = map.getCenter();
        var zoom = map.zoomLevel;
        var size = map.getSize();
        var mapWidth = size.width;
        var mapHeight = size.height;
        var point = marker.getPoint();

        if($G('is_dynamic').checked) {
            var URL = editor.options.UEDITOR_HOME_URL,
                url = [URL + (/\/$/.test(URL) ? '':'/') + "dialogs/map/show.html" +
                    '#center=' + center.lng + ',' + center.lat,
                    '&zoom=' + zoom,
                    '&width=' + mapWidth,
                    '&height=' + mapHeight,
                    '&markers=' + point.lng + ',' + point.lat,
                    '&markerStyles=' + 'l,A'].join('');
            editor.execCommand('inserthtml', '<iframe class="ueditor_baidumap" src="' + url + '"' + (styleStr ? ' style="' + styleStr + '"' :'') + ' frameborder="0" width="' + (mapWidth+4) + '" height="' + (mapHeight+4) + '"></iframe>');
        } else {
            var url = "http://api.map.baidu.com/staticimage?center=" + center.lng + ',' + center.lat +
                    "&zoom=" + zoom + "&width=" + size.width + '&height=' + size.height + "&markers=" + point.lng + ',' + point.lat;
            editor.execCommand('inserthtml', '<img width="'+ size.width +'"height="'+ size.height +'" src="' + url + '"' + (styleStr ? ' style="' + styleStr + '"' :'') + '/>');
        }
    };
    document.getElementById("address").focus();

  

    function getParam(name) {
        return location.href.match(new RegExp('[?#&]' + name + '=([^?#&]+)', 'i')) ? RegExp.$1 : '';
    }
    var map, marker;
    var centerParam = getParam('center');
    var zoomParam = getParam('zoom');
    var widthParam = getParam('width');
    var heightParam = getParam('height');
    var markersParam = getParam('markers');
    var markerStylesParam = getParam('markerStyles');

    //创建和初始化地图函数：
    function initMap() {
        // [FF]切换模式后报错
        if (!window.BMap) {
            return;
        }
        var dituContent = document.getElementById('dituContent');
        dituContent.style.width = widthParam + 'px';
        dituContent.style.height = heightParam + 'px';

        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件

        // 创建标注
        var markersArr = markersParam.split(',');
        var point = new BMap.Point(markersArr[0], markersArr[1]);
        marker = new BMap.Marker(point);
        marker.enableDragging();
        map.addOverlay(marker); // 将标注添加到地图中

        if(parent.editor && parent.document.body.contentEditable=="true") { //在编辑状态下
            setMapListener();//地图改变修改外层的iframe标签src属性
        }
    }

    //创建地图函数：
    function createMap() {
        map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
        var centerArr = centerParam.split(',');
        var point = new BMap.Point(parseFloat(centerArr[0]), parseFloat(centerArr[1]));//定义一个中心点坐标
        map.centerAndZoom(point, parseInt(zoomParam));//设定地图的中心点和坐标并将地图显示在地图容器中
    }

    //地图事件设置函数：
    function setMapEvent() {
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }

    //地图控件添加函数：
    function addMapControl() {
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE});
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1});
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
        map.addControl(ctrl_sca);
    }

    function setMapListener() {
        var editor = parent.editor, containerIframe,
            iframes = parent.document.getElementsByTagName('iframe');
        for (var key in iframes) {
            if (iframes[key].contentWindow == window) {
                containerIframe = iframes[key];
                break;
            }
        }
        if (containerIframe) {
            map.addEventListener('moveend', mapListenerHandler);
            map.addEventListener('zoomend', mapListenerHandler);
            marker.addEventListener('dragend', mapListenerHandler);
        }

        function mapListenerHandler() {
            var zoom = map.getZoom(),
                center = map.getCenter(),
                marker = window.marker.getPoint();
            containerIframe.src = containerIframe.src.
                replace(new RegExp('([?#&])center=([^?#&]+)', 'i'), '$1center=' + center.lng + ',' + center.lat).
                replace(new RegExp('([?#&])markers=([^?#&]+)', 'i'), '$1markers=' + marker.lng + ',' + marker.lat).
                replace(new RegExp('([?#&])zoom=([^?#&]+)', 'i'), '$1zoom=' + zoom);
            editor.fireEvent('saveScene');
        }
    }

 