/*
 * output.js - Routines for output of content (text, HTML) to a DIV element.
 *
 *
 * Copyright 2012-2017 Valera Rozuvan
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

define([], function () {
    // Add the method curry() to all functions.
    Function.prototype.curry = curry;

    // What the module makes available for other modules to use.
    return {
        'p': p,
        'out': out,
        'br': br,
        'pre': pre,
        'preCode': preCode
    };

    // Methods p(), out(), br(), ... expect a jQuery object (DOM element) on
    // which they will do their work.
    function p(el, text) {
        el.append('<p>' + text + '</p>');
    }

    function out(el, text) {
        el.append(text);
    }

    function br(el) {
        el.append('<br />');
    }

    function pre(el, text) {
        el.append('<pre>' + text + '</pre>');
    }

    function preCode(el, text) {
        el.append('<pre><code>' + text + '</code></pre>');
    }

    // Functions toArray() and curry() will simplify calling the same function
    // with similar parameters. Please see the great article at:
    //
    //     http://javascriptweblog.wordpress.com/2010/04/05/curry-cooking-up-tastier-functions/
    //
    // where I got the idea from.
    function toArray(args) {
        return Array.prototype.slice.call(args);
    }

    function curry() {
        var __method, args;

        if (arguments.length < 1) {
            return this;
        }

        __method = this;
        args = toArray(arguments);

        return function() {
            return __method.apply(this, args.concat(toArray(arguments)));
        };
    }
});
