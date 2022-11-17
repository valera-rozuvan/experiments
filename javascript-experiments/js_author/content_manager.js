/*
 * content_manager.js - Parse main 'toc.json', make it's content available.
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

define(['text!../toc.json', 'jquery', 'logme'], function (Toc, $, logme) {
    var toc, featured;

    featured = [];

    // Parse the 'toc.json' file. If something bad happens, most likely that
    // file does not exist, and we are trying to parse an empty string.
    try {
        toc = JSON.parse(Toc);
    } catch (err) {
        logme('ERROR: Could not parse the toc.json file.');
        logme('Error message: "' + err.message + '".');

        toc = undefined;
    }

    // If parse went OK, lets see what we got.
    if (toc !== undefined) {
        parseFeatured();
    }

    // Other modules can use this module's return object to access the
    // available content of 'toc.json' without parsing it themselves.
    return {
        'featured': featured
    };

    function parseFeatured() {
        var c1;

        // See if the 'featured' section is present. It must be an array.
        if ($.isArray(toc.featured) === true) {

            // Go over each element of the 'featured' array.
            for (c1 = 0; c1 < toc.featured.length; c1++) {

                // Each array entry is an object with 2 properties: the
                // experiment's source folder path, and the experiment's name.
                if ($.isPlainObject(toc.featured[c1]) === false) {
                    continue;
                }

                // Both of the properties must be strings.
                if (
                    (typeof toc.featured[c1].srcFolder === 'string') &&
                    (typeof toc.featured[c1].name === 'string')
                ) {

                    // Push a valid featured experiment entry to a hash.
                    featured.push(toc.featured[c1]);

                }

            }

        } // End-of: if ($.isArray(toc.featured) === true)
    } // End-of: function parseFeatured
});
