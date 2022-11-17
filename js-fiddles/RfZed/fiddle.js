/*
 * Author: Valera Rozuvan
 * Date: 22.11.2013
 *
 *
 * The comma operator in JavaScript.
 *
 * Please explain the strange results of the code in this Fiddle.
 *
 *
 * More JS fiddles at: https://github.com/valera-rozuvan/js-fiddles
 */

window.jQuery.noConflict()

(function ($, undefined) {
    var x = 2, y = 4;

    $('#out').append(test(x, y));
    $('#out').append('<br />');
    $('#out').append(test((x, y)));

    function test() {
        var sum = 0;

        $.each(arguments, function (index, value) {
            sum += value;
        });

        return sum;
    }
}(window.jQuery));

return;
