(function (app) {
    'use strict';

    app.factory('tagsService', ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {

            function getAllFeatures() {
                var deferred = $q.defer();

                $timeout(function () {
                    $http.get('../data/tagsFeatures.json').success(function (data) {
                        deferred.resolve(data);
                    });
                }, 30);

                return deferred.promise;
            };      
            return {
                getAllFeatures: getAllFeatures

            };
        }]);
})(angular.module('myApp'));