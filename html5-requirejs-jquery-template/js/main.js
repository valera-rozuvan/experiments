/**
 * "Rules of Optimization:
 *     Rule 1: Don't do it.
 *     Rule 2 (for experts only): Don't do it yet.”
 *
 * ~ Michael A. Jackson
 */

(function () {
  'use strict';

  require.config({
    baseUrl: 'js',
    paths: {
      jquery: 'vendor/jquery/jquery.min'
    }
  });

  require(['jquery', 'animate'], function ($) {
    $.noConflict();
  });
}).call(this);
