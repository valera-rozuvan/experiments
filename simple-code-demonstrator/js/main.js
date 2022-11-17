/**
 * "Rules of Optimization:
 *     Rule 1: Don't do it.
 *     Rule 2 (for experts only): Don't do it yet.”
 *
 * ~ Michael A. Jackson
 */

(function () {
    require.config({
        baseUrl: 'js',
        paths: {
            jquery: 'vendor/jquery/jquery.min'
        }
    });

    require(['jquery'], function ($) {
        $.noConflict();

        $('#button_01').click(function () {
            $('#textarea_01').val('!!!!!!!!!!!!!!!!!!!!!!!!!\n\n\nHello, world!');
        });

        $('#password_edit_id').on('input', function (a, b, c) {
            $('#password_out').text(this.value);
        });

        $('#hash_edit_id').on('input', function (a, b, c) {
            $('#hash_out').text(this.value);
        });
    });
}).call(this);
