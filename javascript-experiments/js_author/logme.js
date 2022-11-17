/*
 * logme.js - Utility to output information to the JS console.
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

    var debugMode, _logmeArchive, debugMessageEl, debugOverlayIsOn,
        jQueryUiLoaded;

    // debugMode can be one of the following:
    //
    //     true - All messages passed to logme will be written to the internal
    //            browser console.
    //     false - Suppress all output to the internal browser console.
    //
    // Obviously, if anywhere there is a direct console.log() call, we can't do
    // anything about it. That's why use logme() - it will allow to turn off
    // the output of debug information with a single change to a variable.
    debugMode = true;

    jQueryUiLoaded = false;
    require(['jquery_ui'], function (jqueryUi) {
        require(['jquery_block_ui'], function (blockUI) {
            jQueryUiLoaded = true;
        });
    });

    // Provide methods to enable/disable logging. I.e. setting the 'debugMode'
    // parameter to 'true' or 'false'.
    logme.enable = logmeEnable;
    logme.disable = logmeDisable;

    _logmeArchive = [];

    debugMessageEl = $('<div />');
    debugOverlayIsOn = false;

    $(document).click(function (event) {
        var clickedTagName;

        // Ctrl+Click event.
        if (event.ctrlKey) {
            clickedTagName = $(event.target)[0].tagName.toLowerCase();

            if ((clickedTagName === 'html') || (clickedTagName === 'body')) {
                if (debugOverlayIsOn === false) {
                    showLogmeOutput();
                }
            }
        }
    });

    $(document).keyup(function(e) {
        if ((e.keyCode == 27) && (debugOverlayIsOn === true)) {
            $.unblockUI();
        }
    });

    return logme;

    function showLogmeOutput() {
        var c1, windowDim, messageDim, messagesEl, closeButtonEl, escapedText,
            findReplace, item, currentLength;

        if (debugOverlayIsOn === true) {
            return;
        }
        debugOverlayIsOn = true;

        if (jQueryUiLoaded !== true) {
            debugOverlayIsOn = false;
            setTimeout(showLogmeOutput, 50);
            return;
        }

        findReplace = [
            [/&/g, '&amp;'],
            [/</g, '&lt;'],
            [/>/g, '&gt;'],
            [/"/g, '&quot;'],
            [/'/g, '&apos;']
        ];

        windowDim = {
            'width': $(window).width(),
            'height': $(window).height()
        };

        messageDim = {
            'width': 800,
            'height': 400
        };

        if (windowDim.width * 0.8 < messageDim.width) {
            messageDim.width = windowDim.width * 0.8;
        }
        if (windowDim.height * 0.8 < messageDim.height) {
            messageDim.height = windowDim.height * 0.8;
        }

        messageDim.left = 0.5 * (windowDim.width - messageDim.width);
        messageDim.top = 0.5 * (windowDim.height - messageDim.height);

        debugMessageEl.css('height', (messageDim.height - 55) + 'px');

        messagesEl = $('<div class="debugWindowMessages"></div>');
        currentLength = _logmeArchive.length;
        for (c1 = 0; c1 < currentLength; c1 += 1) {
            escapedText = _logmeArchive[c1];

            for (item in findReplace) {
                escapedText = escapedText.replace(
                    findReplace[item][0],
                    findReplace[item][1]
                );
            }

            messagesEl.append(c1 + ': ');
            if (escapedText.length <= 100) {
                messagesEl.append(
                    escapedText +
                    '<br />'
                );
            } else {
                messagesEl.append(
                    '<br />' +
                    '<textarea rows="4" tabindex="-1" readonly="readonly">' + escapedText + '</textarea>' +
                    '<br />'
                );
            }
        }

        debugMessageEl.append(messagesEl);

        debugMessageEl.append(
            '<div class="debugWindowInstructions">' +
                'To open this dialog, [Ctrl + Click] on empty part of page.' +
            '</div>'
        );

        closeButtonEl =  $(
            '<div class="debugWindowCloseIcon">' +
                '<img src="images/close_icon.png" />' +
            '</div>'
        );

        $.blockUI.defaults.css.cursor = 'default';
        $.blockUI({
            'title': 'logme() history',
            'draggable': true,
            'theme': true,
            'css': {
                'cursor': 'default',

                'left': messageDim.left + 'px',
                'top': messageDim.top + 'px',
                'width': messageDim.width + 'px',
                'height': messageDim.height + 'px',

                'margin': '0px auto 0px auto',

                'textAlign': 'left'
            },
            'overlayCSS': {
                'cursor': 'default'
            },
            'themedCSS': {
                'left': messageDim.left + 'px',
                'top': messageDim.top + 'px',
                'width': messageDim.width + 'px',
                'height': messageDim.height + 'px'
            },
            'message': debugMessageEl,
            'onBlock': function () {
                $('.blockUI.blockMsg').children('.ui-dialog-titlebar').append(
                    closeButtonEl
                );

                // Sometimes scrolling to the bottom is not fully done, as it
                // stops on a <textarea>. I have tried to determine the cause
                // of this, and came to a conclusion that when there is a large
                // number of messages in logme() history, then it takes time
                // to render all of them, which causes 'scrollHeight' report
                // incorrectly, or scrollTop() to not work as expected.
                // Therefore, as a fix, I create a timeout, after which it will
                // scroll to the bottom. So far this seems to work.
                setTimeout(function () {
                    messagesEl.scrollTop(messagesEl.prop('scrollHeight'));
                }, 100);

                closeButtonEl.click(function () {
                    $.unblockUI();
                });
            },
            'onUnblock': function () {
                debugMessageEl.empty();

                debugOverlayIsOn = false;
            }
        });
    }

    // ########################################################################
    //
    // Function: logme([arg1 [, arg2 [, ...]]])
    //
    // A helper function that provides logging facilities. We don't want
    // to call console.log() directly, because sometimes it is not supported
    // by the browser. Also when everything is routed through this function.
    // the logging output can be easily turned off.
    //
    // logme() supports multiple parameters. Each parameter will be passed to
    // the console.log() function separately.
    //
    // ########################################################################
    function logme() {
        var i, c1, seen, MAX_STRINGIFY_STACK, MAX_STRINGIFY_STACK_WARN_MSG,
            objText;

        MAX_STRINGIFY_STACK = 1024;
        MAX_STRINGIFY_STACK_WARN_MSG = 'WARNING: Maximum object length (' +
            MAX_STRINGIFY_STACK + ') for stringify reached! Not all ' +
            'properties will be shown.';

        if (
            (typeof debugMode === 'undefined') ||
            (debugMode !== true)
        ) {
            return;
        }

        for (i = 0; i < arguments.length; i++) {
            if (typeof window.console !== 'undefined') {
                window.console.log(arguments[i]);
            }

            seen = [];
            c1 = 0;

            if (typeof arguments[i] === 'string') {
                _logmeArchive.push(arguments[i]);
            } else if (typeof arguments[i] === 'function') {
                _logmeArchive.push(arguments[i].toString());
            } else if (typeof arguments[i] === 'undefined') {
                _logmeArchive.push('undefined');
            } else {
                objText = JSON.stringify(
                    arguments[i],
                    function (key, val) {
                        c1 += 1;

                        if (c1 >= MAX_STRINGIFY_STACK) {
                            return undefined;
                        }

                        if (typeof val === 'object') {
                            if (seen.indexOf(val) >= 0) {
                                return '[recursion]';
                            }

                            seen.push(val);
                        }

                        return val;
                    }
                );

                if (objText === undefined) {
                    _logmeArchive.push('undefined');
                } else if (objText === null) {
                    _logmeArchive.push('null');
                } else {
                    _logmeArchive.push(objText);
                }
            }

            if (c1 >= MAX_STRINGIFY_STACK) {
                if (typeof window.console !== 'undefined') {
                    window.console.log(MAX_STRINGIFY_STACK_WARN_MSG);
                }

                _logmeArchive.push(MAX_STRINGIFY_STACK_WARN_MSG);
            }
        }

        if (debugOverlayIsOn === false) {
            setTimeout(function () {
                showLogmeOutput();
            }, 50);
        }
    } // End-of: function logme

    function logmeEnable() {
        debugMode = true;
    }

    function logmeDisable() {
        debugMode = false;
    }
});
