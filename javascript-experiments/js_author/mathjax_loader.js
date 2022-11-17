/*
 * mathjax_loader.js - Load MathJax and initialize it. Wrapper for MathJax utilities.
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

define(['MathJax'], function (MathJax) {
    MathJax.Hub.Config({
        'tex2jax': {
            inlineMath: [ ['\\(','\\)'] ],
            processEnvironments: false
        },
        'asciimath2jax': {
            'delimiters': [
                ['\\$', '\\$']
            ]
        }
    });
    MathJax.Hub.Configured();

    return {
        'typeset': typeset
    };

    function typeset(el) {
        // MathJax.Hub.Typeset();
        // setTimeout(function () { MathJax.Hub.Queue(['Typeset', MathJax.Hub], el); }, 50);
        MathJax.Hub.Queue(['Typeset', MathJax.Hub], el);
    }
});
