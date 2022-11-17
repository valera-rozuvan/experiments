/*
 * module3.js - Part of "Lanczos resampling" JavaScript experiment.
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
        'text!../md/module3_text.md'
    ],
    function (pipeline, MathJaxLoader, $, jui, flot, Showdown, module3Text) {

    return function () {
        var out, converter;

        out = this.moduleDiv.out;
        converter = new Showdown.converter();

        out(converter.makeHtml(module3Text));

        this.moduleDiv.publish();

        $('#a_slider_value2').css('left', (pipeline.a * 60 + 80) + 'px');
        $('#a_slider_value2').html(pipeline.a.toFixed(1));

        $('#a_slider2').slider({
            'min': 0,
            'max': 5,
            'value': 2,
            'step': 0.1,
            'slide': function(event, ui) {
                pipeline.a = ui.value;
                $('#a_slider_value2').css(
                    'left',
                    (pipeline.a * 60 + 80) + 'px'
                );
                $('#a_slider_value2').html(pipeline.a.toFixed(1));
                plot();
            }
        });
        plot();

        MathJaxLoader.typeset(this.el);
    };

    function plot() {
        var i, d2;

        d2 = [];
        for (i = -5; i <= 5; i += 0.05) {
            if (i < -pipeline.a - 0.05) {
                d2.push([i, 0]);
            } else if (i < -pipeline.a) {
                d2.push([i, 0]);
                d2.push([
                    i,
                    (Math.sin(Math.PI * i) / (Math.PI * i)) * (Math.sin(Math.PI * (i / pipeline.a)) / (Math.PI * (i / pipeline.a)))
                ]);
            } else if ((i >= pipeline.a - 0.05) && (i < pipeline.a)) {
                d2.push([
                    i,
                    (Math.sin(Math.PI * i) / (Math.PI * i)) * (Math.sin(Math.PI * (i / pipeline.a)) / (Math.PI * (i / pipeline.a)))
                ]);
                d2.push([i, 0]);
            } else if (i >= pipeline.a) {
                d2.push([i, 0]);
            } else if (Math.abs(i * pipeline.a) < 1e-16)  {
                d2.push([i, 1]);
            } else {
                d2.push([
                    i,
                    (Math.sin(Math.PI * i) / (Math.PI * i)) * (Math.sin(Math.PI * (i / pipeline.a)) / (Math.PI * (i / pipeline.a)))
                ]);
            }
        }

        flot(
            $('#placeholder2'),
            [
                {
                    'data': d2,
                    'label': 'Lanczos kernel'
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
