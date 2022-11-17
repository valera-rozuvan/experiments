/*
 * module4.js - Part of "Array.splice()" JavaScript experiment.
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
        var p, myArray, copyOfMyArray, obj1, obj2, obj3;

        p = this.moduleDiv.p;

        obj1 = {'x': 100};
        obj2 = {'x': 200};
        obj3 = {'x': 300};

        myArray = [obj1, obj2, obj3];

        copyOfMyArray = myArray.slice(0, 2);

        p('myArray = ' + JSON.stringify(myArray) + '.');
        p('copyOfMyArray = ' + JSON.stringify(copyOfMyArray) + '.');

        p(
            'What if we use the delete operator on the \'x\' property of ' +
            'the second object?'
        );
        delete obj2.x;

        p('myArray = ' + JSON.stringify(myArray) + '.');
        p('copyOfMyArray = ' + JSON.stringify(copyOfMyArray) + '.');
        p('typeof obj2.x = ' + (typeof obj2.x) + '.');

        this.moduleDiv.publish();
    };
});
