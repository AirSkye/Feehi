 

    domUtils.on(window,"load",function(){
        var map = new google.maps.Map(document.getElementById('container'), {
                zoom: 3,
                streetViewControl: false,
                scaleControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var imgcss;
            var marker = new google.maps.Marker({
                map: map,
                draggable: true
            });
            function doSearch(){
                var address = document.getElementById('address').value;
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode( { 'address': address}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var bounds = results[0].geometry.viewport;
                        map.fitBounds(bounds);
                        marker.setPosition(results[0].geometry.location);
                        marker.setTitle(address);
                    } else alert(lang.searchError);
                });
            }
            $G('address').onkeydown = function (evt){
                evt = evt || event;
                if (evt.keyCode == 13) {
                    doSearch();
                }
            };
            $G("doSearch").onclick = doSearch;
            dialog.onok = function (){
                var center = map.getCenter();
                var point = marker.getPosition();
                var url = "http://maps.googleapis.com/maps/api/staticmap?center=" + center.lat() + ',' + center.lng() + "&zoom=" + map.zoom + "&size=520x340&maptype=" + map.getMapTypeId() + "&markers=" + point.lat() + ',' + point.lng() + "&sensor=false";
                editor.execCommand('inserthtml', '<img width="520" height="340" src="' + url + '"' + (imgcss ? ' style="' + imgcss + '"' :'') + '/>');
            };

            function getPars(str,par){
                var reg = new RegExp(par+"=((\\d+|[.,])*)","g");
                return reg.exec(str)[1];
            }
            var img = editor.selection.getRange().getClosedNode();
            if(img && img.src.indexOf("http://maps.googleapis.com/maps/api/staticmap")!=-1){
                var url = img.getAttribute("src");
                var centers = getPars(url,"center").split(",");
                point = new google.maps.LatLng(Number(centers[0]),Number(centers[1]));
                map.setCenter(point);
                map.setZoom(Number(getPars(url,"zoom")));
                centers = getPars(url,"markers").split(",");
                marker.setPosition(new google.maps.LatLng(Number(centers[0]),Number(centers[1])));
                imgcss = img.style.cssText;
            }else{
                setTimeout(function(){
                    doSearch();
                },30)
            }
    });


 