/*
 * show_hide_gh_ribbon.js - Show or hide GitHub ribbon based on window width.
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
    if ($.browser.msie === true) {
        $(window).on('resize', showHideRibbonIE);

        return showHideRibbonIE;
    }

    $(window).on('resize', showHideRibbon);

    return showHideRibbon;

    function showHideRibbon() {
        require(['jquery_ui'], function (jqueryUi) {
            if ($(window).width() <= 1000) {
                $('.forkme_github').hide(
                    'slide',
                    {
                        'direction': 'left'
                    },
                    750
                );
            } else {
                $('.forkme_github').show(
                    'slide',
                    {
                        'direction': 'left'
                    },
                    750
                );
            }
        });
    }

    function showHideRibbonIE() {
        if ($(window).width() <= 1000) {
            $('.forkme_github').hide();
        } else {
            $('.forkme_github').show();
        }
    }
});
