(function (app) {
    'use strict';

    app.controller("schedulePreviewPricingModalCtrl", ['$scope', '$modalInstance',
        function ($scope, $modalInstance) {

            $scope.cancel = function () {
                $modalInstance.dismiss();
            };

        }]);

})(angular.module('myApp'));