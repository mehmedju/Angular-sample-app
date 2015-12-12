//Delete? Not used?
(function (app) {
    'use strict';

    app.controller("scheduleCtrl", ['$scope', 'bookingService',
      function ($scope, bookingService) {
          $scope.sites = [
              {
                  id: 1,
                  name: "Alpharetta Theater",
                  address: "Alpharetta 123",
                  city: "Atlanta",
                  state: "Georgia"
              },
             {
                 id: 2,
                 name: "Buckhead Amphitheater",
                 address: "Alpharetta 123",
                 city: "Atlanta",
                 state: "Georgia"
             },
             {
                 id: 3,
                 name: "San Fierro Grand Hall",
                 address: "San Andreas 123",
                 city: "San Andreas",
                 state: "San Andreas"
             }
          ];

          bookingService.getMoviesCollection().then(function (data) {
              $scope.movies = data;
          });

          $scope.removeSelectedSite = function (id) {
              var index = $scope.newSchedule.sites.indexOf(id);
              $scope.newSchedule.sites.splice(index, 1);
          };

          $scope.removeSelectedFeature = function (id) {
              var index = $scope.newSchedule.features.indexOf(id);
              $scope.newSchedule.features.splice(index, 1);
          };

          $scope.addNew = function() {
              $scope.newSchedule.sites.length = 0;
              var selected = _.find($scope.sites, function(s) {
                  return s.id == 2;
              });
              $scope.newSchedule.sites.push(selected);
          };
      }]);

})(angular.module('myApp'));