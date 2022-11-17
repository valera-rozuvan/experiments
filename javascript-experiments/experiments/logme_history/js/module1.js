/*
 * module1.js - Part of "logme() history example" JavaScript experiment.
 *
 *
 * Copyright 2012-2013 Valera Rozuvan
 * http://javascript-experiments.net/
 *
 *
 * This file is part of javascript-experiments.
 *
 * javascript-experiments is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * javascript-experiments is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 */

define(['logme', 'jquery'], function (logme, $) {
    return function () {
        var  p, el;

        p = this.moduleDiv.p;
        this.moduleDiv.prepare();

        p('Will trigger logme() calls...');

        el = $(
            '<div>' +
                '<span class="simple_link">' +
                    'Trigger another logme() call.' +
                '</span>' +
            '</div>'
        );
        el.appendTo(this.moduleDiv.el);
        el.children('span').on('click', triggerLogmeCall);

        p(
            'NOTE: As an added bonus, you can also drag the "logme() ' +
            'history" dialog by the title bar.'
        );

        this.moduleDiv.publish();

        performTestLogmeCalls();
    }; // End-of: return function ()

    function triggerLogmeCall(event) {
        logme(
            'Another logme() call triggered. Random number is "' +
            Math.random(100) + '".'
        );

        event.preventDefault();
    }

    function performTestLogmeCalls() {
        logme($);
        logme($.kjsdfhkfash);
        (function (c1) {
            while (c1 < 50) {
                logme('Attaching a click handler.');
                logme('Message 1.');
                logme('Message 2.');
                logme('Message 3.');
                logme('Message 4.');
                logme('Attaching a click handler (repeat).');

                c1 += 1;
            }
        }(0));
        logme($);
        logme($.kjsdfhkfash);
        logme(43.2);
        logme(null);
        logme({'hello': 'world'});
        logme(window);
        logme('"Hello, world!"', '\'Hello, world!\'');
        logme($(document));
        (function (c1) {
            while (c1 < 50) {
                logme('Attaching a click handler.');
                logme('Message 1.');
                logme('Message 2.');
                logme('Message 3.');
                logme('Message 4.');
                logme('Attaching a click handler (repeat).');

                c1 += 1;
            }
        }(0));
        logme(
            '1234567890123456789012345678901234567890123456789012345678' +
            '9012345678901234567890123456789012345678901234567890'
        );
    }
});
