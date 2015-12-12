module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            //libraries:
            'app/packages/AngularJS.Core.1.2.14/content/scripts/angular.min.js',
            'app/packages/AngularJS.Core.1.2.14/content/scripts/angular-mocks.js',
            'app/packages/AngularJS.Route.1.2.14/content/scripts/angular-route.min.js',
            'app/packages/underscore.js.1.5.2/Content/Scripts/underscore.min.js',
            'app/js/vendor/angular-translate.js',
            'app/js/vendor/*.js',
            
            //scripts
            'app/js/msCommonControls.min.js',

            //specs
            'test/unit/ms-common-controls/**/*.js'
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
