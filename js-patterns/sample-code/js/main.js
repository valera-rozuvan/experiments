var app = angular
    .module('app', []);


app.controller(
    'control',
    function ($q) {
        var $ = angular.element;
        var output = document.getElementById('output');

        var def = $q.defer();
        var promise = def.promise;

        $(output).append('Init<br />');

        // promise
        //     .then(someOtherWork1)
        //     .then(someOtherWork2)
        //     .then(someOtherWork3);
        var p2 = promise.then(someOtherWork1);
        var p3 = p2.then(someOtherWork2);
        var p4 = p3.then(someOtherWork3, function () {
            $(output).append('p2 failed<br />');
        });

        var p5 = promise.then(function () {}, function () {
            $(output).append('Something went wrong!<br />');
        });

        $q.all([p3]).then(function () {
            $(output).append('All promise are done!<br />');
        }, function () {
            $(output).append(
                'At least 1 promise failed!<br />'
            );
        });

        // promise.then(someOtherWork1);
        // promise.then(someOtherWork2);
        // promise.then(someOtherWork3);

        $(output).append('Then are ready...<br />');

        bigWork(def);


        $(output).append('BigWork in progress...<br />');

        function someOtherWork1(val) {
            $(output).append('1<br />');
            $(output).append('val = ' + val + '<br />');

            return 'ret1';
        }
        function someOtherWork2(val) {
            $(output).append('2++<br />');

            JSON.parse('TY*&^Y*UHH*I(Y*OYI*(');

            // setTimeout(function () {
                $(output).append('2<br />');
                $(output).append('val = ' + val + '<br />');
            // }, 2000);

            return 'ret2';
        }
        function someOtherWork3(val) {
            $(output).append('3<br />');
            $(output).append('val = ' + val + '<br />');

            return 'ret3';
        }

        function bigWork(def) {
            setTimeout(function () {
                // does big work
                $(output).append('<br />In bigWork<br />');

                def.resolve(123);
                // def.reject(123);
           }, 2000);
        }
    }
);


