module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            'app/packages/AngularJS.Core.1.2.14/content/scripts/angular.min.js',
            'app/packages/AngularJS.Core.1.2.14/content/scripts/angular-mocks.js',
            'app/packages/AngularJS.Route.1.2.14/content/scripts/angular-route.min.js',
            'app/packages/underscore.js.1.5.2/Content/Scripts/underscore.min.js',
            'app/js/angular-translate.js',
            //jquery needed for bootstrap
            'app/packages/jQuery.2.1.0/Content/Scripts/jquery-2.1.0.min.js',
            //msApp needed for bootstrap-ui directives
            'app/js/msApp.min.js',
            'app/js/app.js',
            'controllers/startPageController.js',
            'test/unit/startPage.js',
            'test/unit/**/*.js'

        ],

        exclude: [
//      'app/lib/angular/angular-loader.js',
//      'app/lib/angular/*.min.js',
//      'app/lib/angular/angular-scenario.js'
        ],

        //autoWatch: true,
        singleRun: true,

        browsers: ['Chrome'],

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-htmlfile-reporter'
        ],

        junitReporter: {
            outputFile: 'test-results.xml',
            suite: ''
        },

        colors: true,

        reporters: ['progress', 'junit', 'html'],

        htmlReporter: {
            outputFile: 'test-results.html'
        }
    });
};
