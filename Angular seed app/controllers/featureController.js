(function (app) {
    'use strict';

    app.controller("featureCtrl", ['$scope', 'featureService', '$filter',
      function ($scope, featureService, $filter) {
          $scope.valueOfItem = {};
          $scope.isClickedOnIcon = false;

          featureService.getNamesOfFeatures().then(function (data) {
              $scope.namesOfMovies = data;
              $scope.featuresTable = angular.copy($scope.namesOfMovies);
          });

          $scope.markRow = function (item) {
              $scope.valueOfItem = item;
          };

          $scope.changeClassOnIcon = function () {
              $scope.isClickedOnIcon = !$scope.isClickedOnIcon;
          };

          $scope.applyFilter = function () {
              var filteredCollection = $filter('filter')($scope.namesOfMovies, $scope.searchFeature);

              $scope.featuresTable.length = 0;
              _.each(filteredCollection, function(item) {
                  $scope.featuresTable.push(angular.copy(item));
              });
          };

          $scope.resetFilter = function () {
              $scope.searchFeature = '';
              $scope.clearColumnFilters = true;
              $scope.featuresTable = angular.copy($scope.namesOfMovies);
          };

          $scope.sort = function (orderBy) {
              if ($scope.featuresTable.columnFilters) {
                  var columnFilters = $scope.featuresTable.columnFilters;
              }

              $scope.featuresTable = $filter('orderBy')($scope.featuresTable, orderBy, $scope.isClickedOnIcon);
              $scope.featuresTable.columnFilters = columnFilters || {};
          };

          $scope.saveFeature = function () {
              var newFeature = {
                  "id": 2,
                  "feature": "Her",
                  "studio": "Sony",
                  "rating": "R",
                  "sites": "Marietta",
                  "start_date": "2013-12-20T23:00:00.000Z",
                  "end_date": "2014-02-06T22:00:00.000Z",
                  "release_date": "2013-12-20",
                  "booking_terms": "Tiered 70/60/50"
              };
              $scope.namesOfMovies.push(newFeature);
              $scope.featuresTable.push(newFeature);
              
          };
      }]);

})(angular.module('myApp'));