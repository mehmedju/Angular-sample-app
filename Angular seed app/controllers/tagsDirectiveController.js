(function (app) {
    'use strict';

    app.controller("tagsDirectiveController", ['$scope', 'tagsService', '$modalInstance', '$modal', function ($scope, tagsService, $modalInstance, $modal) {

        tagsService.getAllFeatures().then(function (data) {
            $scope.features = data;
        });
        $scope.isModalVisible = false;
        $scope.tagsCollection = [];
        $scope.insertedTag = {};

        $scope.addFeature = function () {
            $scope.doubleInput = false;

            angular.forEach($scope.tagsCollection, function (item) {
                if (item == $scope.insertedTag.name) {
                    $scope.doubleInput = true;
                    $scope.insertedTag = {};
                };
            });
            if (!$scope.doubleInput && $scope.insertedTag.name && $scope.insertedTag.name.name) {

                $scope.tagsCollection.push($scope.insertedTag.name);
                $scope.insertedTag = '';
            }
            $scope.insertedTag = {};
        };

        $scope.openDatepicker = function ($event, datePickerInstance) {
            $event.preventDefault();
            $event.stopPropagation();

            showActiveDatePicker(datePickerInstance);
        };

        function showActiveDatePicker(datePicker) {
            for (var prop in $scope.datepickers) {
                $scope.datepickers[prop] = false;
                if (prop === datePicker) {
                    $scope.datepickers[prop] = true;
                }
            }
        };

        $scope.datepickers = {
            openedReleaseDate: false,
            openedStartDate: false,
            openedEndDate: false
        };

        $scope.openFeatureModal = function () {

            var modalInstance = $modal.open({
                templateUrl: '../views/partials/featureModal.html',
                controller: 'tagsDirectiveController',
                backdrop: 'static'
            });
        };

        $scope.close = function () {
            $modalInstance.close();
        };
    }]);
})(angular.module('myApp'));