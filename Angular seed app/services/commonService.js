(function (app) {
    'use strict';

    app.factory('commonService', ['$q', '$timeout', '$http', '$templateCache',
        function ($q, $timeout, $http, $templateCache) {
            var datepickerTemplates = {};

            function getOverrideTemplates() {
                var deferred = $q.defer();
                deferred.resolve(datepickerTemplates);
                return deferred.promise;
            };

            function setOverrideTemplates() {
                $http.get("templates/bootstrap/datepicker/day.html").success(function (template) {
                    datepickerTemplates.dayTemplate = {
                        origin: $templateCache.get("template/datepicker/day.html"),
                        override: template
                    };
                });
                $http.get("templates/bootstrap/datepicker/month.html").success(function (template) {
                    datepickerTemplates.monthTemplate = {
                        origin: $templateCache.get("template/datepicker/month.html"),
                        override: template
                    };
                });
                $http.get("templates/bootstrap/datepicker/year.html").success(function (template) {
                    datepickerTemplates.yearTemplate = {
                        origin: $templateCache.get("template/datepicker/year.html"),
                        override: template
                    };
                });
            }

            function revertTemplates() {
                if (!datepickerTemplates.dayTemplate || !datepickerTemplates.monthTemplate || !datepickerTemplates.yearTemplate) {
                    return;
                }
                $templateCache.remove("template/datepicker/day.html");
                $templateCache.put("template/datepicker/day.html", datepickerTemplates.dayTemplate.origin);
                $templateCache.remove("template/datepicker/month.html");
                $templateCache.put("template/datepicker/month.html", datepickerTemplates.monthTemplate.origin);
                $templateCache.remove("template/datepicker/year.html");
                $templateCache.put("template/datepicker/year.html", datepickerTemplates.yearTemplate.origin);
            }

            return {
                setOverrideTemplates: setOverrideTemplates,
                getOverrideTemplates: getOverrideTemplates,
                revertTemplates: revertTemplates
            };
        }]);
})(angular.module('myApp'));