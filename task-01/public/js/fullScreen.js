/**
 * Created by kate on 17/07/16.
 */
(function () {

    var IN_FULL_SCREEN = false;

// Object options = {canvas: canvas, icon: icon}.
    function init(options) {
        //Checking if browser supports API
        document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;
        var icons = $(options.icon);
        if (document.fullscreenEnabled) {
            icons.each(function (i, element) {
                element.style.display = 'block';
            });
            icons.click(function(e){
                var canvas = e.target.closest(options.canvas);
                 toggleFullScreen(canvas);
            });
        }
    }

    function requestFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        IN_FULL_SCREEN = true;
    }

    // Cancel full screen mode
    function cancelFullscreen() {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        IN_FULL_SCREEN = false;
    }


    function toggleFullScreen(elem) {
        if (IN_FULL_SCREEN) {
            cancelFullscreen();
        } else {
            requestFullscreen(elem);
        }
    }

    document.addEventListener("MSFullscreenError", function (e) {
        console.warn("full screen error has occured " + e.target);
    }, true);


    document.addEventListener('DOMContentLoaded', function () {
        init({canvas:'.fs-cover', icon:'.full-screen-icon'});
    }, true);

})();