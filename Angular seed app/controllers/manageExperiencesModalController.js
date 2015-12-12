(function (app) {
    'use strict';

    app.controller("manageExperiencesModalCtrl", ['$scope', '$modal', '$modalInstance', 'ticketPricingService', 'notificationService',
        function ($scope, $modal, $modalInstance, ticketPricingService, notificationService) {
            var defaultIcon = 'img/experiences/imax.png';
            $scope.selectedExperience = [];
            $scope.editingExperience = {};
            $scope.category = {};

            $scope.experienceCollection = ticketPricingService.getExperiences();

            $scope.getIconNameFromUrl = function (url) {
                if (!url) {
                    return '';
                }
                return url.split('/').pop();
            };

            $scope.$watchCollection('selectedExperience', function (exp) {
                $scope.editingExperience = exp.length > 0 ? angular.copy(exp[0]) : { smallIcon: defaultIcon };
                switch ($scope.editingExperience.category) {
                    case 'Fe/Au':
                        $scope.category.feature = true;
                        $scope.category.auditorium = true;
                        break;
                    case 'Feat':
                        $scope.category.feature = true;
                        $scope.category.auditorium = false;
                        break;
                    case 'Aud':
                        $scope.category.feature = false;
                        $scope.category.auditorium = true;
                        break;
                    default:
                        $scope.category.feature = false;
                        $scope.category.auditorium = false;
                        break;
                }
            });

            $scope.closeModal = function () {
                $modalInstance.dismiss();
            };

            $scope.apply = function (closeModal) {
                if ($scope.selectedExperience.length > 0) {
                    for (var i = 0; i < $scope.experienceCollection.length; i++) {
                        if ($scope.experienceCollection[i].$$hashKey === $scope.selectedExperience[0].$$hashKey) {
                            $scope.editingExperience.category = resolveCategory();
                            $scope.experienceCollection[i] = angular.copy($scope.editingExperience);
                            break;
                        }
                    }
                    $scope.selectedExperience.length = 0;

                } else {
                    //Properly validate here..
                    if (!$scope.editingExperience.name) {
                        notificationService.showModal('Information', 'Select existing experience or create new one!', 'Ok');
                        return;
                    }
                    
                    $scope.editingExperience.category = resolveCategory();
                    ticketPricingService.addExperience($scope.editingExperience);
                }
                if (closeModal) {
                    $modalInstance.close($scope.editingExperience);
                }
            };

            $scope.deleteExperience = function () {
                if (!$scope.editingExperience) {
                    return;
                }
                ticketPricingService.deleteExperience($scope.editingExperience);
                $scope.selectedExperience.length = 0;
            };

            $scope.clearForm = function () {
                $scope.selectedExperience.length = 0;
            };

            function resolveCategory() {
                if ($scope.category.feature && $scope.category.auditorium) {
                    return 'Fe/Au';
                }
                if ($scope.category.feature && !$scope.category.auditorium) {
                    return 'Feat';
                }
                if (!$scope.category.feature && $scope.category.auditorium) {
                    return 'Aud';
                }
                return 'N/A';
            }
        }]);

})(angular.module('myApp'));