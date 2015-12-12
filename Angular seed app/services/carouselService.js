(function (app) {
    'use strict';

    app.factory('carouselService', ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {

            function getSlideContent() {
                var deferred = $q.defer();

                $timeout(function () {
                    $http.get('../data/startPageContent.json').success(function (data) {
                        deferred.resolve(data);
                    });
                }, 30);

                return deferred.promise;
            };
            return {
                getSlideContent: getSlideContent,

            };
        }]);
})(angular.module('myApp'));