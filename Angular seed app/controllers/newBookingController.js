(function (app) {
    'use strict';

    app.controller("newBookingController", ['$scope', 'bookingService',
       function ($scope, bookingService) {
           $scope.newBooking = {};

           bookingService.getFeatures().then(function (data) {
               $scope.featuremodels = data;
           });
           bookingService.getStudios().then(function (data) {
               $scope.studios = data;
           });
           bookingService.getRatings().then(function (data) {
               $scope.ratings = data;
           });
           
           $scope.$on('contentOfSelectedRowInTable', function (contentOfSelectedRow) {
            
               if ($scope.newBookingAddMode) {
                   $scope.newBooking = {};
                   $scope.newBooking.endDate = new Date();
                   $scope.newBooking.releaseDate = new Date();
                   $scope.newBooking.startDate = new Date();

               } else {

                   $scope.newBooking.releaseDate = new Date($scope.contentOfSelectedRow.release_date);
                   $scope.newBooking.startDate = new Date($scope.contentOfSelectedRow.start_date);
                   $scope.newBooking.endDate = new Date($scope.contentOfSelectedRow.end_date);
                   $scope.newBooking.feature = $scope.contentOfSelectedRow.feature;
                   $scope.newBooking.studio = $scope.contentOfSelectedRow.studio;
                   $scope.newBooking.site = $scope.contentOfSelectedRow.sites;
                   $scope.newBooking.booking = $scope.contentOfSelectedRow.booking_terms;
                   $scope.newBooking.rating = $scope.contentOfSelectedRow.rating;
               }
           });

           $scope.reset = function () {
               if ($scope.selectedRow)
                    $scope.selectedRow.index = -1;
               clearForm();
               $scope.$emit('closeNewBookingForm');
           };
           $scope.book = function (shouldClose) {
               var releaseDate = new Date($scope.newBooking.releaseDate);
               var releaseDateString = releaseDate.getFullYear() + '-' + ('0' + (releaseDate.getMonth() + 1)).slice(-2) + '-' + ('0' + releaseDate.getDate()).slice(-2);

               if ($scope.addForm.$valid) {
                   var inserted = {
                       id: $scope.moviesTable.length + 1,
                       feature: $scope.newBooking.feature.name,
                       studio: $scope.newBooking.studio.name,
                       release_date: releaseDateString,
                       rating: $scope.newBooking.rating,
                       sites: $scope.newBooking.site,
                       start_date: $scope.newBooking.startDate,
                       end_date: $scope.newBooking.endDate,
                       booking_terms: $scope.newBooking.booking
                   };
                   $scope.moviesTable.push(inserted);
                   for (var i = 0; i < $scope.featuremodels.length; i++) {
                       if ($scope.featuremodels[i].name === inserted.feature) {
                           $scope.featuremodels.splice(i, 1);
                       }
                   }
                   clearForm();
                   if (shouldClose) {
                       $scope.$emit('closeNewBookingForm');
                   }
               } else {
                   // If for, is invalid, show errors
                   $scope.addForm.submitted = true;
               }
           };

           $scope.save = function () {
               $scope.selectedRow.index = -1;
               var releaseDate = new Date($scope.newBooking.releaseDate);
               var releaseDateString = releaseDate.getFullYear() + '-' + ('0' + (releaseDate.getMonth() + 1)).slice(-2) + '-' + ('0' + releaseDate.getDate()).slice(-2);

               if ($scope.addForm.$valid) {
                   $scope.contentOfSelectedRow.release_date = releaseDateString;
                   $scope.contentOfSelectedRow.start_date = $scope.newBooking.startDate;
                   $scope.contentOfSelectedRow.end_date = $scope.newBooking.endDate;
                   $scope.contentOfSelectedRow.rating = $scope.newBooking.rating;
                   $scope.contentOfSelectedRow.sites = $scope.newBooking.site;
                   $scope.contentOfSelectedRow.booking_terms = $scope.newBooking.booking;
                   $scope.reset();

               } else {

                   $scope.addForm.submitted = true;


               }
           };

           function clearForm() {
               $scope.newBooking = {};
               $scope.addForm.submitted = false;
           };

           $scope.showDatepicker = function ($event, datePickerInstance) {
               $event.preventDefault();
               $event.stopPropagation();

               showActiveDatePicker(datePickerInstance);
           };

           $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MMMM-dd', 'dd.MM.yyyy', 'shortDate'];
           $scope.format = $scope.formats[0];

           function showActiveDatePicker(datePicker) {
               for (var prop in $scope.datepickers) {
                   $scope.datepickers[prop] = false;
                   if (prop === datePicker) {
                       $scope.datepickers[prop] = true;
                   }
               }
           };

           $scope.delete = function() {
               for (var i = 0; i < $scope.moviesTable.length; i++) {
                   if ($scope.moviesTable[i].feature == $scope.newBooking.feature) {
                       $scope.moviesTable.splice(i, 1);
                       break;
                   }
               }
           };

           $scope.datepickers = {
               openedReleaseDate: false,
               openedStartDate: false,
               openedEndDate: false
           };
           $scope.datePickerOptions = {
               "show-weeks":"'false'"
           };
       }]);

})(angular.module('myApp'));