/*
 * Author: Valera Rozuvan
 * Date: 24.12.2013
 *
 *
 * Rectangle editor with Raphael JS.
 *
 * The idea is to create a visual editor for a rectangle's position and size.
 *
 *
 * More JS fiddles at: https://github.com/valera-rozuvan/js-fiddles
 */


// http://underscorejs.org/#each
var each = function (obj, iterator, context) {
    var i, keys;

    if (obj === null) {
        return;
    }

    if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
        for (i = 0, length = obj.length; i < length; i++) {
            if (iterator.call(context, obj[i], i, obj) === breaker) {
                return;
            }
        }
    } else {
        keys = _.keys(obj);
        for (i = 0, length = keys.length; i < length; i++) {
            if (
                iterator.call(context, obj[keys[i]], keys[i], obj) === breaker
            ) {
                return;
            }
        }
    }
};

window.onload = function () {
    var paper, boxEl, sizerEls, sizerAttrs;

    paper = Raphael('canvas', 858, 536);

    // The rectangle that can be dragged around, and resized.
    boxEl = paper.rect(100, 100, 100, 100).attr({
        fill: 'rgb(126, 170, 236)',
        stroke: 'none',
        opacity: .5,
        cursor: 'move'
    });

    sizerEls = [];
    sizerAttrs = {
        fill: 'rgb(255, 255, 255)',
        stroke: 'none',
        opacity: 1.0
    };

    // Bottom-right corner. `0` element of array.
    sizerEls.push(paper.rect(180, 180, 20, 20).attr(sizerAttrs));

    // Top-right corner. `1` element of array.
    sizerEls.push(paper.rect(180, 100, 20, 20).attr(sizerAttrs));

    // Top-left corner. `2` element of array.
    sizerEls.push(paper.rect(100, 100, 20, 20).attr(sizerAttrs));

    // Bottom-left corner. `3` element of array.
    sizerEls.push(paper.rect(100, 180, 20, 20).attr(sizerAttrs));

    // rstart and rmove are the resize functions;

    boxEl.drag(move, start, up);
    // `sizer` is a custom property which will be accessible via
    // the `this` variable in functions.
    boxEl.sizers = sizerEls;

    each(sizerEls, function (sizerEl, index) {
        sizerEl.drag(rmove, rstart);

        // `box` is a custom property which will be accessible via
        // the `this` variable in functions.
        sizerEl.box = boxEl;

        sizerEl.sizerIndex = index;
    });

    // Link each sizer to two sizers that are linked to it by the box's
    // edges.
    sizerEls[0].prevSizer = sizerEls[1];
    sizerEls[0].nextSizer = sizerEls[3];

    sizerEls[1].prevSizer = sizerEls[0];
    sizerEls[1].nextSizer = sizerEls[2];

    sizerEls[2].prevSizer = sizerEls[3];
    sizerEls[2].nextSizer = sizerEls[1];

    sizerEls[3].prevSizer = sizerEls[2];
    sizerEls[3].nextSizer = sizerEls[0];

    return;

    // start, move, and up are the drag functions
    function start() {
        // storing original coordinates
        this.ox = this.attr('x');
        this.oy = this.attr('y');

        this.attr({
            opacity: 0.8
        });

        each(this.sizers, function (sizer, index) {
            sizer.ox = sizer.attr('x');
            sizer.oy = sizer.attr('y');

            sizer.attr({
                opacity: 0.6
            });
        });
    }

    function move(dx, dy) {
        // move will be called with dx and dy
        this.attr({
            x: this.ox + dx,
            y: this.oy + dy
        });

        each(this.sizers, function (sizer, index) {
            sizer.attr({
                x: sizer.ox + dx,
                y: sizer.oy + dy
            });
        });
    }

    function up() {
        // restoring state
        this.attr({
            opacity: 0.5
        });

        each(this.sizers, function (sizer, index) {
            sizer.attr({
                opacity: 1.0
            });
        });
    }

    function rstart() {
        // storing original coordinates
        each(this.box.sizers, function (sizer, index) {
            sizer.ox = sizer.attr('x');
            sizer.oy = sizer.attr('y');
        });

        this.box.ow = this.box.attr('width');
        this.box.oh = this.box.attr('height');
        this.box.ox = this.box.attr('x');
        this.box.oy = this.box.attr('y');
    }

    function rmove(dx, dy) {
        // move will be called with dx and dy
        this.attr({
            x: this.ox + dx,
            y: this.oy + dy
        });

        // Update coordinates of sizers that are linked to the
        // currently dragged slider.
        this.prevSizer.attr('x', this.prevSizer.ox + dx);
        this.nextSizer.attr('y', this.nextSizer.oy + dy);

        switch (this.sizerIndex) {
            case 0:
                this.box.attr({
                    width: this.box.ow + dx,
                    height: this.box.oh + dy
                });

                break;
            case 1:
                this.box.attr({
                    y: this.box.oy + dy,

                    width: this.box.ow + dx,
                    height: this.box.oh - dy
                });

                break;
            case 2:
                this.box.attr({
                    x: this.box.ox + dx,
                    y: this.box.oy + dy,

                    width: this.box.ow - dx,
                    height: this.box.oh - dy
                });

                break;
            case 3:
                this.box.attr({
                    x: this.box.ox + dx,

                    width: this.box.ow - dx,
                    height: this.box.oh + dy
                });

                break;
        }
    }
};
