/*
 * module2.js - Part of "Array.splice()" JavaScript experiment.
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
        var p, myArray, copyOfMyArray;

        p = this.moduleDiv.p;

        myArray = [
            {
                'x': 100
            },
            {
                'x': 200
            },
            {
                'x': 300
            }
        ];

        copyOfMyArray = myArray.slice(0, 2);

        p('myArray = ' + JSON.stringify(myArray) + '.');
        p('copyOfMyArray = ' + JSON.stringify(copyOfMyArray) + '.');

        p(
            'Now we will modify the second element. We will set "x" ' +
            'property of the object to 201'
        );
        myArray[1].x = 201;

        p('myArray = ' + JSON.stringify(myArray) + '.');
        p('copyOfMyArray = ' + JSON.stringify(copyOfMyArray) + '.');

        p(
            'Now we will change the second element completely. Let us ' +
            'assign some string to it.'
        );
        myArray[1] = 'Hello, world!';

        p('myArray = ' + JSON.stringify(myArray) + '.');
        p('copyOfMyArray = ' + JSON.stringify(copyOfMyArray) + '.');

        this.moduleDiv.publish();
    };
});
