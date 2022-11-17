/*
 * module_div.js - Create a DIV container for a module.
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

define(['jquery', 'Controller', 'Output'], function ($, Controller, Output) {
    return ModuleDiv;

    function ModuleDiv(moduleDescription, githubLink) {
        var moduleDiv, el;

        el = $('<div>');
        el.addClass('module');

        moduleDiv = {
            'el': el,

            'addCaption': addCaption,
            'appendToPage': appendToPage,
            'appendToSelector': appendToSelector,

            'prepare': prepare,
            'publish': publish,

            // Provide Output methods to JS Exp. module.
            'p': Output.p.curry(el),
            'out': Output.out.curry(el),
            'br': Output.br.curry(el),
            'preCode': Output.preCode.curry(el)
        };

        el = $('<div>');
        el.addClass('module_caption');
        el.html(moduleDescription);
        moduleDiv.captionEl = el;

        el = $('<div>');
        el.addClass('octocat');
        el.html(
            '<a href="https://github.com/valera-rozuvan/javascript-experiments/blob/master/' + githubLink + '">' +
                '<img src="images/git_cat_icon.png" />' +
            '</a>'
        );
        el.appendTo(moduleDiv.captionEl);

        return moduleDiv;
    }

    function addCaption() {
        this.captionEl.appendTo(this.el);
    }

    function appendToPage() {
        this.el.appendTo('.page');
    }

    function appendToSelector(divSelector) {
        this.el.appendTo(divSelector);
    }

    function prepare() {
        this.el.hide();
        this.el.empty();
        this.addCaption();
    }

    function publish(divSelector) {
        if (typeof divSelector === 'string') {
            this.appendToSelector(divSelector);
        } else {
            this.appendToPage();
        }
        this.el.slideDown(500);
        Controller.attachClickEvents();
    }
});
