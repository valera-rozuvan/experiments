/*
 * module1.js - Part of "JS Markdown" JavaScript experiment.
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

define(['showdown', 'text!../md/index.md'], function (Showdown, indexSource) {
    return function () {
        var p, out, converter;

        p = this.moduleDiv.p;
        out = this.moduleDiv.out;

        p('Experimenting with text.');

        converter = new Showdown.converter();
        out(converter.makeHtml(indexSource));

        this.moduleDiv.publish();
    };
});
