(function (app) {
    'use strict';

    app.controller("ticketPricingModifiersCtrl", ['$scope', '$modal', 'ticketPricingService',
        function ($scope, $modal, ticketPricingService) {
            $scope.modifiers = ticketPricingService.getModifiers();

            $scope.showEditModifierModal = function (modifier, editMode) {
                var modalInstance = $modal.open({
                    templateUrl: '../views/partials/editModifierModal.html',
                    controller: 'editModifierCtrl',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        modifier: function () {
                            return modifier;
                        },
                        ticketClasses: function () {
                            return $scope.ticketClasses;
                        }
                    }
                });

                modalInstance.result.then(function (editedModifier) {
                    if (editMode) {
                        for (var i = 0; i < $scope.modifiers.length; i++) {
                            if ($scope.modifiers[i].$$hashKey === modifier.$$hashKey) {
                                $scope.modifiers[i] = angular.copy(editedModifier);
                                break;
                            }
                        }
                    }
                    else {
                        $scope.modifiers.push(editedModifier);
                    }
                });
            };

            $scope.addNewModifier = function () {
                var newModifier = {
                    prices: ticketPricingService.createEmptyPriceObject($scope.ticketClasses)
                };

                $scope.showEditModifierModal(newModifier);
            };

            $scope.deleteModifier = function (modifier) {
                var index = $scope.modifiers.indexOf(modifier);
                $scope.modifiers.splice(index, 1);
            };

            $scope.getModifierForTicketClass = function (ticketClass, modifier) {
                var matchingTicketClass = _.find(modifier.prices.ticketClasses, function (tc) {
                    return tc.id == ticketClass.id;
                });
                return matchingTicketClass;
            };
        }]);

})(angular.module('myApp'));