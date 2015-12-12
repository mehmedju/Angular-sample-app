(function (app) {
    'use strict';

    app.directive('scheduleCalender', ['$timeout', '$parse', '$filter',
        function ($timeout, $parse, $filter) {
            return {
                require: "datepicker",
                priority: 1,
                link: function (scope, element, attrs) {
                    var daysWithPerformances = $parse(attrs.scheduleCalender)(scope);

                    highlightDays();

                    function daysMode(tbody) {
                        var days = tbody.find("button");
                        _.each(days, function (day) {
                            var $day = angular.element(day);
                            var formatedDate = $filter('date')($day.scope().dt.date, 'yyyyMMdd');

                            if (_.contains(daysWithPerformances, formatedDate)) {
                                $day.find("div").css('display', 'block');
                            }
                        });
                    }

                    function monthsMode(tbody) {
                        var months = tbody.find("button");
                        _.each(months, function (month) {
                            var $month = angular.element(month);
                            var formatedDate = $filter('date')($month.scope().dt.date, 'yyyyMM');

                            var monthWithPerformances = _.find(daysWithPerformances, function (day) {
                                return day.substring(0, 6) == formatedDate;
                            });
                            if (monthWithPerformances) {
                                $month.find("div").css('display', 'block');
                            }

                        });
                    }

                    function yearsMode(tbody) {
                        var years = tbody.find("button");
                        _.each(years, function (year) {
                            var $year = angular.element(year);
                            var formatedDate = $filter('date')($year.scope().dt.date, 'yyyy');

                            var yearWithPerformances = _.find(daysWithPerformances, function (day) {
                                return day.substring(0, 4) == formatedDate;
                            });
                            if (yearWithPerformances) {
                                $year.find("div").css('display', 'block');
                            }

                        });
                    }

                    function highlightDays() {
                        $timeout(function () {
                            var tbody = element.find("tbody");

                            if (!tbody || !tbody.scope()) {
                                return;
                            }
                            var mode = tbody.scope().$parent.datepickerMode;
                            switch (mode) {
                                case 'day':
                                    daysMode(tbody);
                                    break;
                                case 'month':
                                    monthsMode(tbody);
                                    break;
                                case 'year':
                                    yearsMode(tbody);
                                    break;
                                default:
                                    console.warn("Unknown mode?");
                            }
                        }, 0);
                    }

                    element.bind("click", function () {
                        highlightDays();
                    });
                }
            };
        }]);
})(angular.module('myApp'));

