/*
 * Author: Valera Rozuvan
 * Date: 11.11.2013
 *
 *
 * A simple example that demonstrates cross-domain AJAX.
 *
 * Retrieve the list of latest articles from Hacker News, and display it
 * to the user.
 *
 *
 * More JS fiddles at: https://github.com/valera-rozuvan/js-fiddles
 */

jQuery(document).ready(function () {
    /**
     * jQuery.ajax mid - CROSS DOMAIN AJAX
     * ---
     * @author James Padolsey (http://james.padolsey.com)
     * @version 0.11
     * updated 12-JAN-10
     * ---
     * NOTE: Read the README!
     * ---
     * @info http://goo.gl/NsC3rE
     */
    jQuery.ajax = (function (_ajax) {
        var protocol = location.protocol,
            hostname = location.hostname,
            exRegex = RegExp(protocol + '//' + hostname),
            YQL = 'http' +
                (/^https/.test(protocol) ? 's': '') +
                '://query.yahooapis.com/v1/public/yql?callback=?',
            query = 'select * from html where url="{URL}" and xpath="*"';

        function isExternal(url) {
            return !exRegex.test(url) && /:\/\//.test(url);
        }

        return function (o) {
            var url = o.url;

            if (
                /get/i.test(o.type) &&
                !/json/i.test(o.dataType) &&
                isExternal(url)
            ) {
                // Manipulate options so that JSONP-x request is made to YQL
                o.url = YQL;
                o.dataType = 'json';

                o.data = {
                    q: query.replace(
                        '{URL}',
                        url +
                        (
                            o.data
                            ?
                            (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
                            :
                            ''
                        )
                    ),
                    format: 'xml'
                };

                // Since it's a JSONP request
                // complete === success
                if (!o.success && o.complete) {
                    o.success = o.complete;
                    delete o.complete;
                }

                o.success = (function (_success) {
                    return function (data) {
                        var re = /<script[^>]+?\/>|<script(.|s)*?\/script>/gi;

                        if (_success) {
                            // Fake XHR callback
                            _success.call(
                                this,
                                {
                                    responseText: (data.results[0] || '')
                                        // YQL screws with <script>s
                                        // Get rid of them
                                        .replace(re, '')
                                },
                                'success'
                            );
                        }
                    };
                }(o.success));
            }

            return _ajax.apply(this, arguments);
        };
    }(jQuery.ajax));

    (function ($) {
        $.ajax({
            url: 'https://news.ycombinator.com/',
            type: 'GET',
            success: function (res) {
                var headline = $(res.responseText).find('td.title a');

                $.each(headline, function (index, value) {
                    $('#out').append(
                        (index + 1) + ': ' + $(value).html() + '<br />'
                    );
                });
            }
        });
    }(jQuery));
});
