/**
 * Created by kate on 18/07/16.
 */
(function () {
    'use strict';

    var ITERATIONS = null;
    var EVERY = null;
    var running = false;

    //Function that generates random coordinates for point(x:[-r,r), y:[-r,r))
    //and checks if it is in a circle with radius r
    var generatePoint = function () {
        var r = 16;
        var x = Math.random() * r * 2 - r;
        var y = Math.random() * r * 2 - r;
        return (Math.pow(x, 2) + Math.pow(y, 2) < Math.pow(r, 2))
    };

    //Return estimated value of Pi after all iterations
    var computePiWorker = function () {
        var inCircle = 0;
        var i;
        for (i = 1; i <= ITERATIONS; i++) {
            if (generatePoint()) {
                inCircle++;
            }
            if (i % EVERY == 0 && i) {
                postMessage({type: 'progress', iteration: i, result: inCircle / i * 4});
            }
        }
        running = false;
        postMessage({type: 'status', message: 'Done'});

    };


    addEventListener('message', function (event) {

        if (running === false) {
            running = true;
            ITERATIONS = event.data.iteration;
            EVERY = event.data.every;
            postMessage({type: 'status', message: 'Start'});
            computePiWorker();
        }
    });

})();
