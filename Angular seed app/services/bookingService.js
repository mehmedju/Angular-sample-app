(function (app) {
    'use strict';

    app.factory('bookingService', ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {

            function getMovies() {
                var deferred = $q.defer();

                $timeout(function () {
                    $http.get('../data/movies.json').success(function (data) {
                        deferred.resolve(data);
                    });
                }, 30);

                return deferred.promise;
            };

            function getFeatures() {
                var deferred = $q.defer();

                $timeout(function () {
                    $http.get('../data/features.json').success(function (data) {
                        deferred.resolve(data);
                    });
                }, 30);

                return deferred.promise;
            };

            function getStudios() {
                var deferred = $q.defer();

                $timeout(function () {
                    $http.get('../data/studios.json').success(function (data) {
                        deferred.resolve(data);
                    });
                }, 30);

                return deferred.promise;
            };

            function getRatings() {
                var deferred = $q.defer();

                $timeout(function () {
                    $http.get('../data/ratings.json').success(function (data) {
                        deferred.resolve(data);
                    });
                }, 30);

                return deferred.promise;
            };
            
            function getMoviesCollection() {
                var deferred = $q.defer();

                $timeout(function () {
                    $http.get('../data/moviesCollection.json').success(function (data) {
                        deferred.resolve(data);
                    });
                }, 30);

                return deferred.promise;
            };

            return {
                getMovies: getMovies,
                getFeatures:getFeatures,
                getStudios: getStudios,
                getRatings: getRatings,
                getMoviesCollection: getMoviesCollection
            };
        }]);
})(angular.module('myApp'));