/*
 * run_modules.js - Runs all modules contained in an experiment.
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

define(
    ['jquery', 'logme', 'ModuleDiv', 'ExtMd', 'MathJaxLoader'],
    function ($, logme, ModuleDiv, ExtMd, MathJaxLoader) {

    return RunModules;

    function RunModules(moduleDir) {

        // Tell Require JS to load the experiment's configuration JSON file.
        // It will contain the list of modules available for that experiment,
        // (along with the order that they should be displayed in).
        require(['text!' + moduleDir + '/config.json'], function (configJson) {
            var config, c1, moduleNames, moduleConfig, moduleConfigObj, matches;

            // configJson is the contents of the 'config.json' file, as
            // retrieved by RequireJS. It should be a string.
            if (typeof configJson !== 'string') {
                logme(
                    'ERROR: While trying to retrieve the contents (text) ' +
                    'from the "' + moduleDir + '/config.json" file, we did ' +
                    'not get a string.'
                );

                $('.page').empty();

                return;
            }

            try {
                config = JSON.parse(configJson);
            } catch (err) {
                logme(
                    'Something went wrong while parsing the configJson ' +
                    'string. Most likely the file "' + moduleDir +
                    '/config.json" was not found, and Require JS gave us ' +
                    'back an empty string. We do not continue.',

                    'JSON.parse() returned with error message: "' +
                    err.message + '".'
                );

                $('.page').empty();

                return;
            }

            // We expect an array of module paths (without the trailing '.js').
            // If we don't get an array, or it is empty, do not continue
            if (
                (config.hasOwnProperty('to_run') === false) ||
                ($.isArray(config.to_run) === false) ||
                (config.to_run.length === 0)
            ) {
                logme(
                    'ERROR: The file "' + moduleDir + '/config.json" does ' +
                    'not specify a "to_run" array, or it is empty.'
                );

                return;
            }

            moduleNames = [];
            moduleConfig = [];

            for (c1 = 0; c1 < config.to_run.length; c1 += 1) {

                // If this is an object, then we get configuration options from it.
                if ($.isPlainObject(config.to_run[c1]) === true) {

                    // First check that we have a 'source' string. It is a path to the module. All modules JS files
                    // are to be placed under the 'js/' directory in the experiment folder, all MD modules are
                    // to be placed under the 'md/' directory. It is expected that directory prefixes are not present
                    // in the 'source' string - they are automatically added.
                    if (
                        (config.to_run[c1].hasOwnProperty('source') === false) ||
                        (typeof config.to_run[c1].source !== 'string')
                    ) {
                        logme('ERROR: Missing "source" property!');

                        return;
                    }
                    parseModuleSourceStr(config.to_run[c1].source);

                    moduleConfigObj = {
                        'description': '',
                        'githubLink': '',
                        'useMathJax': false
                    };

                    if (
                        (config.to_run[c1].hasOwnProperty('description') === true) &&
                        (typeof config.to_run[c1].description === 'string')
                    ) {
                        moduleConfigObj.description = config.to_run[c1].description;
                    }

                    if (
                        (config.to_run[c1].hasOwnProperty('githubLink') === true) &&
                        (typeof config.to_run[c1].githubLink === 'string')
                    ) {
                        moduleConfigObj.githubLink = config.to_run[c1].githubLink;
                    }

                    if (
                        (config.to_run[c1].hasOwnProperty('useMathJax') === true) &&
                        (typeof config.to_run[c1].useMathJax === 'string')
                    ) {
                        if (config.to_run[c1].useMathJax.toLowerCase() === 'true') {
                            moduleConfigObj.useMathJax = true;
                        }
                    }

                    moduleConfig.push(moduleConfigObj);

                    moduleConfigObj = null;
                }
            }

            if (
                (config.hasOwnProperty('name') === true) &&
                (typeof config.name === 'string')
            ) {
                $(document).attr(
                    'title',
                    'JavaScript Experiments: ' + config.name
                );
            }

            // Tell require JS to load all of the modules defined in the
            // experiment. The anonymous callback will execute once all of them
            // have been loaded.
            require(moduleNames, function () {
                var i, moduleObj;

                $('.page').empty();

                // Call the module functions sequentially.
                for (i = 0; i < arguments.length; i++) {
                    if (moduleConfig[i] !== null) {
                        moduleObj = {
                            'moduleDiv': ModuleDiv(
                                moduleConfig[i].description,
                                moduleConfig[i].githubLink
                            )
                        };
                        moduleObj.moduleDiv.prepare();

                        // If an argument is a string - then it was passed to us by
                        // the RequireJS 'text' plugin. We will pass it to the
                        // extension function ExtMd().
                        if (typeof arguments[i] === 'string') {
                            ExtMd.call(moduleObj, arguments[i], moduleConfig[i].useMathJax);
                        }

                        // In all other cases, the argument is a module function.
                        // Execute it.
                        else {
                            arguments[i].call(moduleObj);
                        }

                        moduleObj = null;
                    }
                }
            }); // End-of: require(moduleNames, function () {

            return;

            function parseModuleSourceStr(sourceStr) {
                matches = sourceStr.match(/^md!(.*)$/);
                if (matches !== null) {
                    moduleNames.push('text!' + moduleDir + '/md/' + matches[1]);
                } else {
                    moduleNames.push(moduleDir + '/js/' + sourceStr);
                }
            }
        }); // End-of: require(['text!' + moduleDir + '/config.json'], function (configJson) {
    } // End-of: function RunModules(moduleDir) {
}); // End-of: define(['jquery', 'logme'], function ($, logme) {
