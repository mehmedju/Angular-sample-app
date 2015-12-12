(function (app) {
    'use strict';

    app.controller("confirmationModalCtrl", ['$scope', '$modalInstance', 'options',
        function ($scope, $modalInstance, options) {
            $scope.options = options;

            $scope.ok = function () {
                $modalInstance.close();
            };

            $scope.cancel = function () {
                $modalInstance.dismiss();
            };

        }]);

})(angular.module('myApp'));