(function (app) {
    'use strict';

    app.controller("startPageController", ['$scope', 'carouselService',
       function ($scope, carouselService) {

           carouselService.getSlideContent().then(function (data) {
               $scope.slideContent = data;
           });
       }]);

})(angular.module('myApp'));


