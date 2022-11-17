/*
 * experiments_menu.js - An access point to experiments, and other stuff.
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

define(['ContentManager', 'Controller'], function (ContentManager, Controller) {
    return function () {
        var out, featured, c1, todaysDate, year, url;

        out = this.moduleDiv.out;

        url = 'https://github.com/valera-rozuvan/javascript-experiments';
        out(
            '<div class="toc_info">' +
                '<a href="' + url + '">source</a> || click octocat' +
            '</div>'
        );

        featured = ContentManager.featured;
        out('<ul>');
        for (c1 = 0; c1 < featured.length; c1 += 1) {
            out(
                '<li ' +
                    'class="experiment_link" ' +
                    'data-src_folder="' + featured[c1].srcFolder + '" ' +
                '>' +
                    featured[c1].name  +
                '</li>'
            );
        }
        out('</ul>');

        todaysDate = new Date();
        year = todaysDate.getFullYear();

        out(
            '<div class="toc_info">' +
                '&copy; 2012 - ' +year + ' Valera Rozuvan' +
            '</div>'
        );

        this.moduleDiv.publish('.toc');

        if (window.location.hash.length > 0) {
            Controller.switchExperiment(window.location.hash.replace(/^#/, ''));
        }
    }
});
