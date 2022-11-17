/*
 * controller.js - Switch current experiment, process links to experiments.
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

define(['jquery'], function ($) {
    return {
        'switchExperiment': switchExperiment,
        'attachClickEvents': attachClickEvents
    };

    function switchExperiment(srcFolder) {
        var numDivsLeft, divsToProcess;

        // $('.page').empty();

        // Instead of a simple empty(), let us do something a bit more
        // fancy. We will get all of the DIVs that must be removed, and
        // we will hide them using the jQuery's slide up event. The
        // last DIV to slide up will call the function to show the next
        // set of content DIVs. If there are no DIVs to slide up, then
        // we simply call the function to show the next set of content
        // DIVs.

        divsToProcess = $('.page').children('.module');

        if (divsToProcess.length === 0) {
            showSelectedExperiment(srcFolder);
        } else {
            numDivsLeft = divsToProcess.length;

            divsToProcess.each(function (index, value) {
                $(value).slideUp(500, function () {
                    numDivsLeft -= 1;

                    if (numDivsLeft === 0) {
                        showSelectedExperiment(srcFolder);
                    }
                });
            });
        }
    }

    // Function to show the next set of content DIVs.
    function showSelectedExperiment(srcFolder) {
        $('.page').empty();

        window.location.hash = srcFolder;

        $('.page').html('loading ..');

        require(['RunModules'], function (RunModules) {
            RunModules(srcFolder);
        });
    }

    function attachClickEvents() {
        $('.experiment_link').each(function (index, value) {
            var srcFolder, clickAttached;

            srcFolder = $(value).attr('data-src_folder');
            clickAttached = $(value).attr('data-click_attached');

            if (
                (typeof srcFolder === 'string') &&
                (typeof clickAttached !== 'string')
            ) {
                $(value).attr('data-click_attached', 'true');

                $(value).on('click', function () {
                    switchExperiment(srcFolder);
                });
            }
        });
    }
});
