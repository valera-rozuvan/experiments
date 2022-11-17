// Initialize the Angular JS app.
angular.module('app', ['uiSlider', 'app.controllers']);

// Add a controller, define initialization code.
angular.module('app.controllers', []).controller('FinanceController',
    function ($scope) {
        $scope.N_max = 12;
        $scope.outputData = initOutputData();

        $scope.r = 1;

        // When the r value is changed, recalculate all of the x_i values.
        $scope.$watch('r', function() {
            var c1 = 0;

            for (c1 = 0; c1 < $scope.outputData.length; c1 += 1) {
                $scope.outputData[c1].x_N_max = compute(
                    $scope.r, $scope.outputData[c1].x_1, $scope.N_max
                );
            }
        });

        $scope.xPrecision = 0.01;
        $scope.yPrecision = 0.1;

        $scope.options1 = {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true,
                    radius: 5.0,
                    fill: true,
                    fillColor: "rgba(70, 130, 180, 0.6)"
                }
            },
            colors: ["#000000"],
            xaxis: {
                min: 1.0,
                max: 4.0
            },
            yaxis: {
                min: 0.0,
                max: 1.0
            }
        };

        $scope.options2 = {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true,
                    radius: 0.5,
                    fill: true,
                    fillColor: "rgba(70, 130, 180, 0.6)"
                }
            },
            colors: ["#000000"],
            xaxis: {
                min: -3.0,
                max: 5.0
            },
            yaxis: {
                min: -2.0,
                max: 2.0
            }
        };

        $scope.$watch('N_max', function () {
            $scope.plotData = regeneratePlotData(
                $scope.options1.xaxis, $scope.options1.yaxis,
                $scope.xPrecision, $scope.yPrecision,
                $scope.N_max
            );
            $scope.plot = $('#chaos_plot')
                .plot([$scope.plotData], $scope.options1).data('plot');
        });

        $scope.$watch('N_max', function () {
            $scope.plotData2 = regeneratePlotData(
                $scope.options2.xaxis, $scope.options2.yaxis,
                $scope.xPrecision, $scope.yPrecision,
                $scope.N_max
            );
            $scope.plot = $('#chaos_plot_2')
                .plot([$scope.plotData2], $scope.options2).data('plot');
        });
    }
);


// End of executable code. Functions follow below.

// Compute the value of a recursive function of the logistic map.
// Given an initial x_1, the r coefficient, and the iter bailout value,
// calculate the x_iter result.
function compute(r, x_n, iter) {
    if (iter === 1) {
        return x_n;
    } else {
        return compute(r, r * x_n * (1.0 - x_n), iter - 1);
    }
}

// Create an empty array, initialize it, and return to the caller.
function initOutputData() {
    var tempArray = [],
        c1 = 0;

    for (c1 = 0; c1 < 11; c1 += 1) {
        tempArray.push({
            x_1: 0.1 * c1,
            x_N_max: 0
        });
    }

    return tempArray;
}

function regeneratePlotData(xAxis, yAxis, xPrecision, yPrecision, N_max) {
    // Setup up our plot bounds, scale.
    var x_min = xAxis.min, x_max = xAxis.max, x_step = xPrecision, x_N,
        y_min = yAxis.min, y_max = yAxis.max, y_step = yPrecision, y_N,

        // Used in for loop.
        c0 = 0, c1 = 0, r = 0, x_1 = 0, diffXvalues = {}, tempXValue = 0,

        // The result.
        plotData = [];

    // Calculate number of points on both axes
    x_N = Math.floor((x_max - x_min) / x_step) + 1;
    y_N = Math.floor((y_max - y_min) / y_step) + 1;

    // Generate the result.
    for (c0 = 0; c0 < x_N; c0 += 1) {
        r = x_min + xPrecision * c0;
        diffXvalues = {};

        for (c1 = 0; c1 < y_N; c1 += 1) {
            x_1 = y_min + yPrecision * c1;

            tempXValue = compute(
                r, x_1, N_max
            );

            diffXvalues[tempXValue.toPrecision(3)] = 1;
        }

        Object.getOwnPropertyNames(diffXvalues)
            .forEach(function (val, idx, array) {
                var floatVal = parseFloat(val);
                if ((floatVal > y_min) && (floatVal < y_max) && (floatVal !== 0)) {
                    plotData.push([r, floatVal]);
                }
            });
    }

    return plotData;
}
