(function (app) {
    'use strict';

    app.controller("editModifierCtrl", ['$scope', '$modal', '$modalInstance', 'modifier', 'ticketClasses', 'ticketPricingService', 
        function ($scope, $modal, $modalInstance, modifier, ticketClasses, ticketPricingService) {
            $scope.selectedExperience = [];
            
            $scope.isVisible = true;
            $scope.ticketClasses = ticketClasses;
            $scope.modifier = angular.copy(modifier);
            $scope.experienceCollection = ticketPricingService.getExperiences();
            
            var editMode = modifier.name ? true : false;
            if (editMode) {
                var exp = _.find($scope.experienceCollection, function(ec) {
                    return ec.name === modifier.experience;
                });
                if (exp) {
                    $scope.selectedExperience.push(exp);
                }
            }

            $scope.closeModal = function () {
                $modalInstance.dismiss();
            };
            
            $scope.addModifier = function () {
                $modalInstance.close($scope.modifier);
            };

            $scope.manageExperiences = function () {
                $scope.isVisible = false;
                var modalInstance = $modal.open({
                    templateUrl: '../views/partials/manageExperiencesModal.html',
                    controller: 'manageExperiencesModalCtrl',
                    backdrop: 'static',
                    size: 'lg'
                });

                modalInstance.result.then(function (editedExp) {
                    $scope.isVisible = true;
                    $scope.selectedExperience.push(editedExp);
                }, function () {
                    $scope.isVisible = true;
                });
            };

            $scope.$watchCollection('selectedExperience', function (newVal) {
                if (newVal.length && newVal[0]) {
                    angular.extend($scope.modifier, newVal[0]);
                    $scope.modifier.experience = newVal[0].name;
                }
            });
        }]);

})(angular.module('myApp'));