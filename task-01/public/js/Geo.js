/**
 * Created by kate on 12/07/16.
 */
var Geo = (function () {

    var watchID = null;
    var defaultOptions = {
        zoom: '13',
        size: '640x340',
        scale: 2,
        maptype: 'roadmap',
        latitude: 0,
        longitude: 0,
        //max value of markers
        limit: 10
    };
    var canvas = null;
    var markers = [];

    var googleMapUrl = "https://maps.googleapis.com/maps/api/staticmap?center={{latitude}},{{longitude}}&zoom=" +
        "{{zoom}}&size={{size}}&maptype={{maptype}}";


    var init = function (node, options) {

        canvas = node;
        if (watchID) {
            return;
        }

        if (options && Object.prototype.toString.call(options) === "[object Object]") {
            var keys = Object.keys(options);
            for (var key in defaultOptions) {
                if (keys.indexOf(key)!==-1) {
                    Object.defineProperty(defaultOptions, key, {value:  options[key]});
                }
            }
        }
        if (navigator.geolocation) {
            watchID = navigator.geolocation.watchPosition(success, error);
        } else {
            error("Geolocation API not supported");
        }
    };

    var stopGeo = function () {
        if (watchID) {
            navigator.geolocation.clearWatch(watchID);
        }
        markers = [];
        watchID = null;
    };

    function error(msg) {
        canvas.innerHTML = msg;
    }

    function success(position) {
        var crd = position.coords;
        if (markers.length > defaultOptions.limit) {
            stopGeo(watchID);
        }

        markers.push(
            [crd.latitude, crd.longitude]
        );
        defaultOptions.latitude = crd.latitude;
        defaultOptions.longitude = crd.longitude;

        showMap(googleMapUrl, defaultOptions, markers);
    }

    function showMap(mapPattern, options, markers) {
        var mapUrl = replace(options, mapPattern) + markersToString(markers);
        canvas.innerHTML = "<img src='" + mapUrl + "'>";
    }


    function replace(obj, template) {
        var t, key, reg;

        for (key in obj) {
            reg = new RegExp('{{' + key + '}}', 'ig');
            t = (t || template).replace(reg, obj[key]);
        }

        return t;
    }

    function markersToString(markers) {
        var markerString = '';
        for (var i = 0; i < markers.length; i++) {
            markerString += '&markers=color:blue%7Clabel:' + i + '%7C';
            markerString += markers[i].join(',');
        }
        return markerString;
    }

    //obj2 additional object
    function mergeObjects(obj1, obj2) {
        var keys = Object.keys(obj2);
        for (var key in obj1) {
            if (keys.indexOf(key)!==-1) {
                Object.defineProperty(obj1, key, {value: obj2[key]});
            }
        }
    }
    

    return {
        init: init,
        stopGeo: stopGeo
    }

}());
