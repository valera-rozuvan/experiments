/*
 * module2.js - Part of "Lanczos resampling" JavaScript experiment.
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

define(
    [
        'pipeline', 'MathJaxLoader', 'jquery', 'jquery_ui', 'flot', 'showdown',
        'text!../md/module2_text.md'
    ],
    function (pipeline, MathJaxLoader, $, jui, flot, Showdown, module2Text) {

    return function () {
        var out, converter;

        out = this.moduleDiv.out;
        converter = new Showdown.converter();

        out(converter.makeHtml(module2Text));

        this.moduleDiv.publish();

        pipeline.a = 2;
        $('#a_slider_value').css('left', (pipeline.a * 60 + 80) + 'px');
        $('#a_slider_value').html(pipeline.a.toFixed(1));

        $('#a_slider').slider({
            'min': 0,
            'max': 5,
            'value': 2,
            'step': 0.1,
            'slide': function(event, ui) {
                pipeline.a = ui.value;
                $('#a_slider_value').css(
                    'left',
                    (pipeline.a * 60 + 80) + 'px'
                );
                $('#a_slider_value').html(pipeline.a.toFixed(1));
                plot();
            }
        });

        plot();

        MathJaxLoader.typeset(this.el);
    }; // End-of: return function ()

    function plot() {
        var i, d1, d2;

        d1 = [];
        for (i = -5; i <= 5; i += 0.05) {
            if (Math.abs(i) < 1e-16)  {
                d1.push([i, 1]);
            } else {
                d1.push([i, Math.sin(Math.PI * i) / (Math.PI * i)]);
            }
        }
        d1.push([5, Math.sin(Math.PI * 5) / (Math.PI * 5)]);

        d2 = [];
        if (pipeline.a !== 0) {
            d2.push([
                -pipeline.a,
                // Math.sin(Math.PI * (-pipeline.a / pipeline.a)) / (Math.PI * (-pipeline.a / pipeline.a))
                Math.sin(-Math.PI) / (-Math.PI)
            ]);
        } else {
            d2.push([0, 1]);
        }
        for (i = -5; i <= 5; i += 0.05) {
            if ((i < -pipeline.a) || (i > pipeline.a)) {
                continue;
            }

            if (Math.abs(i * pipeline.a) < 1e-16)  {
                d2.push([i, 1]);
            } else {
                d2.push([
                    i,
                    Math.sin(Math.PI * (i / pipeline.a)) / (Math.PI * (i / pipeline.a))
                ]);
            }
        }
        if (pipeline.a !== 0) {
            d2.push([
                pipeline.a,
                // Math.sin(Math.PI * (pipeline.a / pipeline.a)) / (Math.PI * (pipeline.a / pipeline.a))
                Math.sin(Math.PI) / Math.PI
            ]);
        }

        flot(
            $('#placeholder1'),
            [
                {
                    'data': d1,
                    'label': 'sinc'
                },
                {
                    'data': d2,
                    'label': 'Lanczos window'
                }
            ],
            {
                'legend': {
                    'show': true,
                    'backgroundOpacity': 0
                },
                'grid': {
                    'markings': [
                        {
                            'color': '#000',
                            'lineWidth': 1,
                            'xaxis': {
                                'from': -pipeline.a,
                                'to': -pipeline.a
                            }
                        },
                        {
                            'color': '#000',
                            'lineWidth': 1,
                            'xaxis': {
                                'from': pipeline.a,
                                'to': pipeline.a
                            }
                        }
                    ]
                },
                'xaxis': {
                    'min': -5,
                    'max': 5
                },
                'yaxis': {
                    'min': -0.4,
                    'max': 1.2
                }
            }
        ); // End-of: flot(
    } // End-of: function plot()
});
