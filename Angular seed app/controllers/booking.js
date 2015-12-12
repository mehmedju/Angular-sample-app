(function (app) {
    'use strict';

    app.controller("bookingCtrl", ['$scope', '$modal', 'bookingService', '$translate', '$filter', 'msConstants',
       function ($scope, $modal, bookingService, $translate, $filter, msConstants) {
           $scope.isTemplateFormVisible = false;


           $scope.$on('closeNewBookingForm', function () {
               $scope.isTemplateFormVisible = false;
           });

           bookingService.getMovies().then(function (data) {
               $scope.movies = data;
               $scope.moviesTable = angular.copy($scope.movies);
           });

           $scope.newTemplate = function () {
               $scope.isTemplateFormVisible = true;
               $scope.newBookingAddMode = true;
               $scope.$broadcast('contentOfSelectedRowInTable');
           };

           $scope.newEditTemplate = function (item, $index) {

               $scope.isTemplateFormVisible = true;
               $scope.selectedRow = $index;
               $scope.newBookingAddMode = false;
               $scope.contentOfSelectedRow = item;

               $scope.$broadcast('contentOfSelectedRowInTable');

           };
           $scope.sort = function (orderBy) {
               if ($scope.moviesTable.columnFilters) {
                   var columnFilters = $scope.moviesTable.columnFilters;
               }

               $scope.moviesTable = $filter('orderBy')($scope.moviesTable, orderBy, $scope.isClickedOnIcon);
               $scope.moviesTable.columnFilters = columnFilters || {};
           };

           $scope.setFilter = function (filter) {
               $scope.filteredItems = {
                   items: uniqueBy($scope.movies, function (x) { return x[filter]; }),
                   context: filter
               };
           };

           $scope.changeClassOnIcon = function () {
               $scope.isClickedOnIcon = !$scope.isClickedOnIcon;

           };

           $scope.selectByFilterItem = function (filters, context) {
               applyFilter(context, filters[context]);
           };

           function uniqueBy(arr, fn) {
               var unique = {};
               var distinct = [];
               arr.forEach(function (x) {
                   var key = fn(x);
                   if (!unique[key]) {
                       distinct.push(key);
                       unique[key] = true;
                   }
               });
               return distinct;
           }

           function applyFilter(context, item) {
               var tempArray = [];

               for (var i = 0, len = $scope.moviesTable.length; i < len; i++) {
                   for (var prop in $scope.moviesTable[i]) {
                       if (prop == context && $scope.moviesTable[i][prop] == item) {
                           tempArray.push($scope.moviesTable[i]);
                       }
                   }
               }
               $scope.moviesTable = tempArray;
           }

           $scope.clearFilters = function () {
               $scope.moviesTable = $scope.movies;
               $scope.filters = {};
               $scope.clearColumnFilters = true;
               $scope.searchFilter = null;
           };

           $scope.changeLanguage = function (langKey) {
               $translate.use(langKey);
           };

           //'ms-cc:columnFilterApplied'
           $scope.$on(msConstants.events.columnFilters, function (event, args) {
               $scope.isTemplateFormVisible = false;
               $scope.contentOfSelectedRow = undefined;
           });

           $scope.openBookingModal = function () {
               //var newMovie = {
               //    "id": 18,
               //    "feature": "Curious Case of Benjamin Button",
               //    "studio": {
               //        "name": "Sony",
               //        "address": "Studio Address"
               //    },
               //    "rating": "R",
               //    "sites": "North Point",
               //    "start_date": "2014-02-06T23:00:00.000Z",
               //    "end_date": "2014-04-06T22:00:00.000Z",
               //    "booking_terms": "Tiered 70/60/50"
               //};
               //$scope.moviesTable.push(newMovie);
               //return;
               var modalInstance = $modal.open({
                   templateUrl: '../views/partials/bookingModal.html',
                   controller: 'tagsDirectiveController',
                   backdrop: 'static'
               });
           };
           
           //#region Format functions
           $scope.formatDateFilter = function (item) {
               return $filter('date')(item, 'MMM, d yyyy');
           };

           $scope.formatSiteFilter = function (item) {
               if (!item) {
                   item = '';
               }
               return '^' + item + '^';
           };
           //#endregion
           
           //#region Additional table formatting
           ////$scope.customFiltering = function (filterPropertyValue, filterPropertyName) {
               
           ////    if (!filterPropertyName) {
           ////        return false;
           ////    }
           ////    var visibleItems = $filter('filter')($scope.moviesTable, $scope.tableFilter);
               
           ////    return _.find(visibleItems, function (tableItem) {
           ////        var formattedFilterValue = getDeepValue(tableItem, filterPropertyName);

           ////        switch (filterPropertyName) {
           ////            case 'release_date':
           ////                formattedFilterValue = $scope.formatDateFilter(formattedFilterValue);
           ////                break;
           ////            case 'sites':
           ////                formattedFilterValue = $scope.formatSiteFilter(formattedFilterValue);
           ////                break;
           ////        }

           ////        return filterPropertyValue.name == formattedFilterValue;
           ////    });
           ////};

           //function getDeepValue(obj, propertyName) {
           //    var parts = propertyName.split('.');

           //    if (parts.length <= 1) {
           //        return obj[propertyName];
           //    }

           //    var deepValue = obj;

           //    for (var i = 0; i < parts.length; i++) {
           //        deepValue = deepValue[parts[i]];
           //        if (!deepValue)
           //            break;
           //    }
           //    return deepValue;
           //}

           $scope.tableFilter = function (item) {
               return !$scope.searchFilter || item.feature.indexOf($scope.searchFilter) != -1;
           };
           //#endregion
       }]);

})(angular.module('myApp'));