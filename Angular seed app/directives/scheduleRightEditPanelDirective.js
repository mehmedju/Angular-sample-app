(function (app) {
    'use strict';

    app.directive('focusInput', ['$timeout',
        function ($timeout) {
            return {
                scope: {
                    focusInput: '='
                },
                link: function (scope, element, attrs) {

                    function focusFn() {
                        $timeout(function () {
                            document.getElementById("scheduleDate").focus();
                        });
                    }

                    element.bind('click', function () {
                        var submitButton = element.hasClass("btn-success") && attrs.type == 'submit';
                        if (submitButton) focusFn();
                    });

                    if (attrs.focusInput.length > 0) {
                        scope.$watch('focusInput', function () {
                            focusFn();
                            scope.focusInput = false;
                        });
                    }
                }
            };
        }]);

})(angular.module('myApp'));

