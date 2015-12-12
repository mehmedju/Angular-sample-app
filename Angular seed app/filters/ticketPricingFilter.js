(function (app) {
    'use strict';

    app.filter('msStartFrom', function () {
        return function (input, start) {
            var parsedStart = angular.isString(start) ?
                parseInt(start) :
                start;
            return input.slice(parsedStart);
        };
    });

})(angular.module('myApp'));