/*
 * md.js - Create a module DIV from a MarkDown file without a JS definition.
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

define(['showdown', 'MathJaxLoader'], function (Showdown, MathJaxLoader) {
    return ExtMd;

    function ExtMd(mdText, useMathJax) {
        var converter;

        converter = new Showdown.converter();
        this.moduleDiv.out(converter.makeHtml(mdText));

        this.moduleDiv.publish();

        if (useMathJax === true) {
            MathJaxLoader.typeset(this.el);
        }
    }
});
