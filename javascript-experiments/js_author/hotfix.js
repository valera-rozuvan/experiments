/*
 * hotfix.js - Patch some old browsers for missing JS functionality.
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
    return function hotFix() {
        //
        // See:
        //
        //     https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
        //
        // indexOf is a recent addition to the ECMA-262 standard; as such it may
        // not be present in all browsers. You can work around this by inserting
        // the following code at the beginning of your scripts, allowing use of
        // indexOf in implementations which do not natively support it. This
        // algorithm is exactly the one specified in ECMA-262, 5th edition,
        // assuming Object, TypeError, Number, Math.floor, Math.abs, and Math.max
        // have their original value.
        //
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (searchElement) {
                "use strict";
                if (this == null) {
                    throw new TypeError();
                }
                var t = Object(this);
                var len = t.length >>> 0;
                if (len === 0) {
                    return -1;
                }
                var n = 0;
                if (arguments.length > 1) {
                    n = Number(arguments[1]);
                    if (n != n) { // shortcut for verifying if it's NaN
                        n = 0;
                    } else if (n != 0 && n != Infinity && n != -Infinity) {
                        n = (n > 0 || -1) * Math.floor(Math.abs(n));
                    }
                }
                if (n >= len) {
                    return -1;
                }
                var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
                for (; k < len; k++) {
                    if (k in t && t[k] === searchElement) {
                        return k;
                    }
                }
                return -1;
            }
        } // End-of: if (!Array.prototype.indexOf) {
    } // End-of: return function hotFix() {
}); // End-of: define([], function () {
