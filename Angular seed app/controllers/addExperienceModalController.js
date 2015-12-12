(function (app) {
    'use strict';

    app.controller("addExperienceCtrl", ['$scope', '$modalInstance',
        function ($scope, $modalInstance) {

            $scope.closeModal = function () {
                $modalInstance.dismiss();
            };
        }]);

})(angular.module('myApp'));