(function () {
    'use strict';

    var myApp = window.angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ms.common.controls', 'pascalprecht.translate', 'msGantt']);

    myApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', { templateUrl: '../views/startPage.html' });
        $routeProvider.when('/booking', { templateUrl: '../views/booking.html' });
        $routeProvider.when('/view3', { templateUrl: '../views/feature.html' });
        $routeProvider.when('/schedule', { templateUrl: '../views/schedule.html' });
        $routeProvider.when('/ticketPricing', { templateUrl: '../views/ticketPricing.html' });
        $routeProvider.otherwise({ redirectTo: '/view1' });
    }]);

    myApp.config(['$translateProvider', function ($translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en-us');
    }]);

    myApp.run(function ($rootScope, $translate, commonService) {
        commonService.setOverrideTemplates();
        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            commonService.revertTemplates();
            //set language to default for all routes except where translation is implemented(booking screen)
            if (next && next.indexOf("/booking") == -1) {
                $translate.use('en-us');
            }
        });
    });
})();