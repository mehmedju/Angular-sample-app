(function (app) {
    'use strict';

    app.controller("historyModalCtrl", ['$scope', '$modalInstance', 'ticketType',
        function ($scope, $modalInstance, ticketType) {
            $scope.ticketType = ticketType;
            $scope.close = function () {
                $modalInstance.close();
            };

        }]);

})(angular.module('myApp'));