/**
 * "Rules of Optimization:
 *     Rule 1: Don't do it.
 *     Rule 2 (for experts only): Don't do it yet.”
 *
 * ~ Michael A. Jackson
 */

// From https://github.com/mbostock/d3/wiki/Tutorials :
// 1.) http://d3js.org/
//     -> TODO: Enter andExit, and below.
// 2.) ...
//
// Also:
// 1.) http://bost.ocks.org/mike/join/

(function (require) {
    'use strict';

    var $, d3;

    require.config({
        baseUrl: 'js',
        paths: {
            jquery: 'vendor/jquery/jquery.min',
            d3: 'vendor/d3/d3.min'
        }
    });

    require(['jquery', 'd3'], function (_$, _d3) {
        $ = _$;
        d3 = _d3;

        $.noConflict();
        $(document).ready(onReady);
    });

    return;

    function onReady() {
        playWithColors();
        playWithPositioning();
    }

    function playWithColors() {
        var colorFunc = function () {
                return 'hsl(' + Math.random() * 360 + ',100%,50%)';
            };

        changeColorE('p', colorFunc, true);
        changeColorE('h1', 'blue');
        changeColorE('h1', 'pink', false, 2);

        changeColorBackGroundE('body', 'green');
    }

    function playWithPositioning() {
        var data = [
                {size: 50, position: [120, 260], border: 'red'},
                {size: 23, position: [200, 234], border: 'blue'},
                {size: 45, position: [150, 290], border: 'yellow'},
                {size: 67, position: [258, 220], border: 'black'},
                {size: 34, position: [130, 334], border: 'white'},
                {size: 67, position: [200, 300], border: 'pink'}
            ],
            modifiers = {
                width: function (d) {
                    return '' + d.size + 'px';
                },
                height: function (d) {
                    return '' + d.size + 'px';
                },
                top: function (d) {
                    return '' + d.position[0] + 'px';
                },
                left: function (d) {
                    return '' + d.position[1] + 'px';
                },
                border: function (d) {
                    return '1px solid ' + d.border;
                }
            };

        bindData('.dot', data, true);
        $.each(modifiers, function (modName, modFunc) {
            changeCssProperty('.dot', modName, modFunc, true);
        });
    }

    function bindData(elementSelector, data, selectAll, elementIndex) {
        selectElements(
            elementSelector,
            function (el) {
                el.data(data);
            },
            selectAll,
            elementIndex
        );
    }

    function changeCssProperty(
        elementSelector, cssPropertyName, cssValue, selectAll, elementIndex
    ) {
        selectElements(
            elementSelector,
            function (el) {
                el.style(cssPropertyName, cssValue);
            },
            selectAll,
            elementIndex
        );
    }

    function changeColorE(elementSelector, colorName, selectAll, elementIndex) {
        return changeCssProperty(
            elementSelector, 'color', colorName, selectAll, elementIndex
        );
    }

    function changeColorBackGroundE(
        elementSelector, colorName, selectAll, elementIndex
    ) {
        return changeCssProperty(
            elementSelector, 'background-color', colorName, selectAll,
            elementIndex
        );
    }

    function selectElements(
        elementSelector, callback, selectAll, elementIndex
    ) {
        var selectFunc = 'selectAll',
            el;

        // If we don't want to select all elements, but only some
        // specific element (we have the element's index).
        if (!selectAll && elementIndex) {
            if (typeof elementIndex === 'number' && elementIndex > 0) {
                elementSelector += ':nth-of-type(' + elementIndex + ')';
            }
        } else if (!selectAll) {
            // Select a single element (the first one that is found).
            selectFunc = 'select';
        }

        // Try selecting the element.
        el = d3[selectFunc](elementSelector);

        // If our selector returned something, invoke the callback,
        // passing it the selected element(s).
        if (el.length) {
            callback(el);
        }
    }
}).call(this, window.require);
