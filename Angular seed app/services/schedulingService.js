(function (app) {
    'use strict';

    app.service('scheduleService', function () {
        var allMultiSelectedFeatures = {};
        var feature = {};
        var auditorium = {};
        var date;

        return {
            getMultiSelectedFeatures: function() {
                return allMultiSelectedFeatures;
            },

            setMultiSelectedFeatures: function(value) {
                allMultiSelectedFeatures = value;
                return allMultiSelectedFeatures;
            },

            getFeature: function () {
                return feature;
            },

            setFeature: function (value) {
                feature = [value];
                return feature;
            },
            getAuditorium: function () {
                return auditorium;
            },

            setAuditorium: function (value) {
                auditorium = [value];
                return auditorium;
            },
            getPerformanceDate: function () {
                return date;
            },

            setPerformanceDate: function (value) {
                date = [value];
                return date;
            }
        };

    });
})(angular.module('myApp'));