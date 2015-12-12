(function (app) {
    'use strict';

    app.factory('featureService', ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {

            function getNamesOfFeatures() {
                var deferred = $q.defer();

                $timeout(function () {
                    $http.get('../data/movies.json').success(function (data) {
                        deferred.resolve(data);
                    });
                }, 30);

                return deferred.promise;
            };

          
            return {
                getNamesOfFeatures: getNamesOfFeatures

            };
        }]);
})(angular.module('myApp'));