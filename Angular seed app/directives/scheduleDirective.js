(function (app) {
    'use strict';

    app.directive('msTimepickerPropagateTabindex', ['$timeout', '$parse',
        function ($timeout, $parse) {
            return {

                link: function (scope, element, attrs) {
                    var tabindexArray = $parse(attrs.msTimepickerPropagateTabindex)(scope);

                    var inputs = element.find("input");
                    _.each(inputs, function (input, index) {
                        if (tabindexArray && tabindexArray[index]) {
                            angular.element(input).attr("tabindex", tabindexArray[index]);
                        }
                    });
                }
            };
        }]);

})(angular.module('myApp'));

