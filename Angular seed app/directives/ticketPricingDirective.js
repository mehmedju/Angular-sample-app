(function (app) {
    'use strict';

    app.directive('msFocusEditingElement', ['$timeout', function ($timeout) {
        return {
            scope: {
                msFocusMe: "=msFocusEditingElement"
            },
            link: function (scope, element, attrs) {
                var objectId = attrs.objectId;
                var objectType = attrs.objectType;

                scope.$watch("msFocusMe", function (value) {
                    if (value && objectType == value.type && value.id == objectId) {
                        $timeout(function () {
                            element[0].select();
                        });
                    }
                });

                //// set attribute value to '-1' on blur event:
                element.bind('blur', function () {
                    $timeout(function () {
                        scope.msFocusMe.id = -1;
                    });

                });
            }
        };
    }]);

    app.directive('msInCellFocus', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            link: function (scope, element, attrs) {
                var model = $parse(attrs.msInCellFocus);
                scope.$watch(model, function (value) {
                    if (value === true) {
                        $timeout(function () {
                            element[0].select();
                        });
                    }
                });
                // on blur event:
                element.bind('blur', function () {
                    scope.$apply(model.assign(scope, false));
                });
            }
        };
    }]);

    app.directive('msClearCellHighlighing', [function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {
                scope.$watch('editingMode', function (editingMode) {
                    ngModel.$render = function () {
                        element.val(ngModel.$viewValue);
                    };

                    if (editingMode && !scope.oldValue) {
                        scope.oldValue = ngModel.$viewValue;
                    }

                    if (!editingMode) {
                        if (scope.resetForm && scope.oldValue != ngModel.$viewValue) {
                            ngModel.$setViewValue(scope.oldValue);
                            ngModel.$render();
                        }
                        scope.oldValue = undefined;
                    }
                });
            }
        };
    }]);


})(angular.module('myApp'));

