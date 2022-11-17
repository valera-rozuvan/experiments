/*
 * module1.js - Part of "Array.splice()" JavaScript experiment.
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

define([], function () {
    return function () {
        var p, myObj, copyOfMyObj;

        p = this.moduleDiv.p;

        myObj = {
            'property1': {
                'x': 100
            }
        };

        copyOfMyObj = myObj;

        p('myObj.property1.x = ' + myObj.property1.x + '.');
        p('copyOfMyObj.property1.x = ' + copyOfMyObj.property1.x + '.');
        p('Now we will assign myObj.property1.x the value 200.');

        myObj.property1.x = 200;

        p('myObj.property1.x = ' + myObj.property1.x + '.');
        p('copyOfMyObj.property1.x = ' + copyOfMyObj.property1.x + '.');

        p(
            'Now we will change myObj completely. Let us assign {} to it ' +
            '(i.e. a new object).'
        );

        myObj = {};
        p('typeof myObj.property1 = ' + (typeof myObj.property1) + '.');
        p('copyOfMyObj.property1.x = ' + copyOfMyObj.property1.x + '.');

        this.moduleDiv.publish();
    };
});
