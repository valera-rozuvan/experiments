'use strict';

(function (window, $, undefined) {
    var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        myAnimate;

    $(document).ready(initialize);

    return;

    function myAnimate(callback) {
        window.setTimeout(callback, 1000 / 60);
    }

    function initialize() {
        var canvas = document.getElementById('canvas'),
            w = canvas.width,
            h = canvas.height,
            ctx = canvas.getContext('2d'),
            frame = 0,
            bitmaps = [ctx.createImageData(w, h), ctx.createImageData(w, h)],
            arr = Array(4),
            dates = [];

        $(window).resize(onResize);

        onResize();
        eachPixel(initPixel);
        draw();

        return;

        function neighbors(x, y) {
            var d = bitmaps[0].data,
                y0 = (y + h - 1) % h,
                y1 = (y + 1) % h,
                x0 = (x + w - 1) % w,
                x1 = (x + 1) % w;

            return (d[x0 + y0 * w << 2] ? 1 : 0) +
                (d[x0 + y * w << 2] ? 1 : 0) +
                (d[x0 + y1 * w << 2] ? 1 : 0) +
                (d[x + y0 * w << 2] ? 1 : 0) +
                (d[x + y1 * w << 2] ? 1 : 0) +
                (d[x1 + y0 * w << 2] ? 1 : 0) +
                (d[x1 + y * w << 2] ? 1 : 0) +
                (d[x1 + y1 * w << 2] ? 1 : 0);
        }

        function eachPixel(f) {
            var src = bitmaps[0].data, dst = bitmaps[1].data,
                si = 0,
                di = 0,
                arr,
                v = Array(4),
                y, x;

            for (y = 0; y < h; y++) {
                for (x = 0; x < w; x++) {
                    v[0] = src[si++];
                    v[1] = src[si++];
                    v[2] = src[si++];
                    v[3] = src[si++];
                    arr = f(x, y, v);
                    dst[di++] = arr[0];
                    dst[di++] = arr[1];
                    dst[di++] = arr[2];
                    dst[di++] = arr[3];
                }
            }
        }

        function initPixel(x, y) {
            var v;

            x -= w/2;
            y -= h/2;
            v = Math.random()*(x*x + y*y)/1600;
            v *= v;
            v = v < .1 ? 255 : 0;
            arr[0] = arr[1] = arr[2] = v;
            arr[3] = 255;

            return arr;
        }

        function nextPixel(x, y, v) {
            var n = neighbors(x, y),
                isLive = n == 3 || (v[0] & n >= 2 && n<= 3);

            arr[0] = arr[1] = arr[2] = isLive ? 255 : 0;
            arr[3] = 255;

            return arr;
        }

        function nextFrame() {
            var v = bitmaps[0];

            bitmaps[0] = bitmaps[1];
            bitmaps[1] = v;
        }


        function draw() {
            var t;

            nextFrame();
            eachPixel(nextPixel);
            ctx.putImageData(bitmaps[0], 0, 0);
            frame++;

            // Track  frame rate
            t = Date.now();
            while (dates.length && (dates[0] + 1000) < t) {
                dates.shift();
            }
            dates.push(t);
            ctx.fillStyle = 'rgba(0,255,0,.5)';
            ctx.fillText('frame rate:' + dates.length, 4, 10);

            animate(draw);
        }

        function onResize() {
            var a = Math.min(
                    document.documentElement.clientWidth,
                    document.documentElement.clientHeight
                ),
                b = Math.max(w, h);

            canvas.style.zoom = .9 * a / b;
        }
    }
}).call(this, window, jQuery);
