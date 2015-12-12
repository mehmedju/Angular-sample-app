module.exports = function(grunt) {

grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

    gitclone: {

            cloneAngularSeedApp: {
                options: {
                    repository: 'https://git.assembla.com/ncr-backoffice-and-pos.2.git',
                    branch: 'master',
                    directory: 'Angular seed app'
                }
            },

            cloneUIKit: {
                options: {
                    repository: 'https://git.assembla.com/ncr-backoffice-and-pos.UIKit.git',
                    branch: 'master',
                    directory: 'Angular seed app/documentation'
                    }
            }
    },

    karma: {

            unit: {
                configFile: 'Angular seed app/karma.ms-cc.conf.js',
                runnerPort: 9999,
                singleRun: true,
                browsers: ['Chrome']
            }
    },

    connect: {
        server: {
            options: {
                port: 8800,
                hostname: "127.0.0.1",
                keepalive: true,
                open: true,
                debug: false,
                directory: null
            }
        }
    },

    less: {
            development: {
                options: {
                    paths: ["Angular seed app/app/css/"]
                },
                files: {
                    "msApp.css": "Angular seed app/documentation/less/styles.less"
                }
            },
            production: {
                options: {
                    paths: ["Angular seed app/app/css"]

                }
            }
    },

    concat: {

            options: {
                separator: ';'
            },

            jsFromDocumentation: {
                 src: ['Angular seed app/documentation/dist/js/*.js'],
                 dest: 'msApp.js'
            },

            MsCommonControlsFromDocumentation: {
                src: [
				'Angular seed app/documentation/dist/js/ms-common-controls/msCommonControls.js', 
				'Angular seed app/documentation/dist/js/ms-common-controls/msCommonService.js', 
				'Angular seed app/documentation/dist/js/ms-common-controls/**/*.js', 
				'!Angular seed app/documentation/dist/js/ms-common-controls/test/**', 
				'!Angular seed app/documentation/dist/js/ms-common-controls/karma.ms-cc.conf.js'
				],
                dest: 'msCommonControls.js'
            },

            fontsFromDocumentation: {
                 src: ['Angular seed app/documentation/dist/fonts/*.eot','Angular seed appdocumentation/dist/fonts/*.svg','Angular seed appdocumentation/dist/fonts/*.ttf','Angular seed appdocumentation/dist/fonts/*.woff'],
                 dest: 'Angular seed app/app/fonts/msApp.ttf'
            },

            controllers:{
                src: ['Angular seed app/controllers/*.js'],
                dest: 'controllers.js'

            },
            services:{
                src: ['Angular seed app/services/*.js'],
                dest: 'services.js'

            },
            filters:{
                src: ['Angular seed app/filters/*.js'],
                dest: 'filters.js'

            },
            directives:{
                src: ['Angular seed app/directives/*.js'],
                dest: 'directives.js'

            }


    },

    uglify: {

            jsFromDocumentation:{
                src: ['msCommonControls.js'],
                dest: 'Angular seed app/app/js/',
                expand: true,
                ext: '.min.js'
            },
            MsCommonControlsFromDocumentation: {
                src: ['msApp.js'],
                dest: 'Angular seed app/app/js/',
                expand: true,
                ext: '.min.js'
            },
            controllers:{
                src: [ 'controllers.js' ],
                dest: 'Angular seed app/app/js/',
                expand: true,
                ext: '.js'
            },
            services:{
                src: [ 'services.js' ],
                dest: 'Angular seed app/app/js/',
                expand: true,
                ext: '.js'
            },
            filters:{
                src: [ 'filters.js' ],
                dest: 'Angular seed app/app/js/',
                expand: true,
                ext: '.js'
            },
            directives:{
                src: [ 'directives.js' ],
                dest: 'Angular seed app/app/js/',
                expand: true,
                ext: '.js'
            }


    },

    cssmin: {

            cssFromDocumentation:{
                expand: true,
                src: ['msApp.css'],
                dest: 'Angular seed app/app/css/',
                ext: '.min.css'
            }

    },

    clean: {

            cleanMsApp:{
                src: [ 'msApp.js','msApp.css' ,'msCommonControls.js'],
                expand: true
            },

            cleanDocumentationFolder:{
                 cwd: 'Angular seed app/documentation',
                 src:[ '**'],
                 expand: true
            },

            cleanTempFolder:{
                 cwd: 'temp',
                 src:[ '**'],
                 expand: true
            },
            cleanAllJsFiles:{
                src:[ 'controllers.js','services.js','directives.js','filters.js'],
                expand: true
            },
            cleanPackageFolder: {
                cwd: 'Angular seed app/packages',
                src: ['**'],
                expand: true
            },
			cleanGitFolder: {
                cwd: 'Angular seed app/.git',
                src: ['**'],
                expand: true
            },
			cleanGitIgnoreFile: {
                cwd: 'Angular seed app/',
                src: ['.gitignore'],
                expand: true
            }

    },

    copy: {

            UIKit: {
                   cwd:'Angular seed app/documentation',
                   src: ['**'],
                   dest: 'temp/',
                   expand:true
            },

            UIKitIntoDocumentation: {
                  cwd:'temp',
                  src: ['**'],
                  dest: 'Angular seed app/documentation/',
                  expand:true
            },

            controllers:{

                src: ['controllers.js'],
                dest: 'Angular seed app/app/js',
                expand:true

            },
            
            filesFromPackages: {
                cwd: 'Angular seed app/packages',
                src: ['**/*.min.js'],
                dest: 'Angular seed app/app/packages',
                expand: true
            },

            viewsFromDocumentationBootstrap: {
                cwd: 'Angular seed app/documentation/dist/views/templates/bootstrap',
                src: ['**/*.html'],
                dest: 'Angular seed app/app/templates/bootstrap',
                expand: true
        },

            viewsFromDocumentationNcrControlls: {
                cwd: 'Angular seed app/documentation/dist/views/templates/ms-controls',
                src: ['**/*.html'],
                dest: 'Angular seed app/app/templates/ms-controls',
                expand: true
            },
            karmaFromDocumentationMsControls: {
                cwd: 'Angular seed app/documentation/dist/js/ms-common-controls',
                src: ['karma.ms-cc.conf.js'],
                dest: 'Angular seed app',
                expand: true
            },
            
            UnitTestsOfFilterDirectiveFromDocumentationMsControls: {
                cwd: 'Angular seed app/documentation/dist/js/ms-common-controls/test/filterByColumn',
                src: ['filterByColumnControllerTest.js'],
                dest: 'Angular seed app/test/unit/ms-common-controls/filterByColumn/',
                expand: true
            },
			UnitTestsOfTagsDirectiveFromDocumentationMsControls: {
                cwd: 'Angular seed app/documentation/dist/js/ms-common-controls/test/tags',
                src: ['tagsControllerTest.js'],
                dest: 'Angular seed app/test/unit/ms-common-controls/tags/',
                expand: true
            },
			UnitTestsOfTypeAheadDirectiveFromDocumentationMsControls: {
                cwd: 'Angular seed app/documentation/dist/js/ms-common-controls/test/typeAhead',
                src: ['typeaheadDropdownControllerTest.js'],
                dest: 'Angular seed app/test/unit/ms-common-controls/typeAhead/',
                expand: true
            },
			CustomCssFromDocumentationMsControls: {
                cwd: 'Angular seed app/documentation/dist/css/msCommon',
                src: ['**/*.css'],
                dest: 'Angular seed app/app/css',
                expand: true
            },
			CustomVendorJsFromDocumentation: {
                cwd: 'Angular seed app/documentation/dist/js',
                src: ['vendor/*'],
                dest: 'Angular seed app/app/js',
                expand: true
            },
			DocumentationFromUIKitToLocal: {
				cwd:'../UIKit/dist',                  
                src: ['**'],
                dest: 'Angular seed app/documentation/dist',
                expand:true
			}
    },

    watch: {
            files: ['**/*.js','**/*.css'],
            tasks: ['concat:cssFromDocumentation','concat:jsFromDocumentation','concat:fontsFromDocumentation','uglify:jsFromDocumentation','cssmin:cssFromDocumentation','clean:cleanMsApp'],
            options: {
                     dateFormat: function(time) {
                         grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                         grunt.log.writeln('Waiting for more changes...');
                     }
            }

    },
	
	tags: {
        build: {
            options: {
                scriptTemplate: '	<script src="{{ path }}"></script>',
                linkTemplate: '	<link rel="stylesheet" href="{{ path }}"/>',
                openTag:   '<!-- references -->',
                closeTag:  '    <!-- end -->'
            },
            src: [
			    'Angular seed app/app/packages/**/*.min.js', 
				'Angular seed app/app/js/vendor/angular-translate.js',
				'Angular seed app/app/js/vendor/*.js',
				'Angular seed app/app/js/*.js',			
			    'Angular seed app/app/css/*.css',
			    'Angular seed app/app/css/gantt/gantt.css',
			    'Angular seed app/app/css/gantt/gantt-classes-overrides.css'
            ],
            dest: 'Angular seed app/app/index.html'
        }
    },

    version: {

               SeedAppVersion: {
                   src: ['Angular seed app/package.json']

               },

               UIKItVersion: {
                   src: ['Angular seed app/documentation/package.json']

               }
    },
	
	replace: {
	  index: {
		src: ['Angular seed app/app/index.html'],            
		overwrite: true, 
		replacements: [{
		  from: /(<script|<link rel).*(><\/script>|css"\/>)/g,
		  to: function (matchedWord, index, fullText, regexMatches) {			
			//console.log("Match", matchedWord, index, regexMatches);
			var replacedMatch = matchedWord.replace(/\\/g,"/");
			//console.log("Replace with: " + replacedMatch);
			return replacedMatch;
		  }
		}]
	  }
	}

});

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-bower-install');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-script-link-tags');
	grunt.loadNpmTasks('grunt-text-replace');


    grunt.registerTask('ms-install', '', ['gitclone:cloneAngularSeedApp','gitclone:cloneUIKit', 'less', 'concat:jsFromDocumentation', 'uglify:jsFromDocumentation', 'cssmin:cssFromDocumentation', 'clean:cleanMsApp','copy:viewsFromDocumentationBootstrap','copy:viewsFromDocumentationNcrControlls','concat:controllers', 'concat:services', 'concat:filters', 'concat:directives', 'uglify:controllers', 'uglify:services', 'uglify:filters', 'uglify:directives', 'clean:cleanAllJsFiles', 'copy:filesFromPackages','copy:CustomCssFromDocumentationMsControls','copy:CustomVendorJsFromDocumentation','tags','replace:index','clean:cleanGitIgnoreFile','karma', 'connect']);
    
	grunt.registerTask('ms-update', 'Trigger full process of getting files, running ALL tasks and cleaning workspace, from REMOTE server(needs credentials for GIT repository)', 
	['clean:cleanDocumentationFolder', 'gitclone:cloneUIKit', 'less', 'concat:jsFromDocumentation', 'concat:MsCommonControlsFromDocumentation', 'uglify:jsFromDocumentation', 'uglify:MsCommonControlsFromDocumentation', 'cssmin:cssFromDocumentation', 'clean:cleanMsApp', 'copy:viewsFromDocumentationBootstrap', 'copy:viewsFromDocumentationNcrControlls', 'copy:karmaFromDocumentationMsControls', 'copy:UnitTestsOfFilterDirectiveFromDocumentationMsControls','copy:UnitTestsOfTagsDirectiveFromDocumentationMsControls','copy:UnitTestsOfTypeAheadDirectiveFromDocumentationMsControls','copy:CustomCssFromDocumentationMsControls','copy:CustomVendorJsFromDocumentation','tags','replace:index','clean:cleanDocumentationFolder']);
    
	grunt.registerTask('ms-local', 'Trigger full process of getting files, running ALL tasks and cleaning workspace, but from LOCAL UIKit folder', 
	['clean:cleanDocumentationFolder', 'copy:DocumentationFromUIKitToLocal', 'less', 'concat:jsFromDocumentation', 'concat:MsCommonControlsFromDocumentation', 'uglify:jsFromDocumentation', 'uglify:MsCommonControlsFromDocumentation', 'cssmin:cssFromDocumentation', 'clean:cleanMsApp', 'copy:viewsFromDocumentationBootstrap', 'copy:viewsFromDocumentationNcrControlls', 'copy:karmaFromDocumentationMsControls', 'copy:UnitTestsOfFilterDirectiveFromDocumentationMsControls','copy:UnitTestsOfTagsDirectiveFromDocumentationMsControls','copy:UnitTestsOfTypeAheadDirectiveFromDocumentationMsControls','copy:CustomCssFromDocumentationMsControls','copy:CustomVendorJsFromDocumentation','tags','replace:index','clean:cleanDocumentationFolder']);
    
	grunt.registerTask('ms', 'Execute Grunt tasks on local files(concat, minify, clean, injecting references)', 
	['concat:controllers','concat:services','concat:filters','concat:directives','uglify:controllers','uglify:services','uglify:filters','uglify:directives','clean:cleanAllJsFiles','copy:filesFromPackages','tags','replace:index']);
	
    grunt.registerTask('ms-ui', '',['concat:cssFromDocumentation','concat:jsFromDocumentation','concat:fontsFromDocumentation','uglify:jsFromDocumentation','cssmin:cssFromDocumentation','clean:cleanMsApp']);
    
	grunt.registerTask('ms-karma', '',['karma']);
    
	grunt.registerTask('ms-serve', '',['connect']);
    
	grunt.registerTask('ms-watch', '',['connect','watch']);
    
	grunt.registerTask('ms-version', '',['version:SeedAppVersion']);

    grunt.registerTask('msDocs-install', '',['copy:UIKit','clean:cleanDocumentationFolder','gitclone:cloneUIKit','copy:UIKitIntoDocumentation','clean:cleanTempFolder']);
    
	grunt.registerTask('msDocs-ui', '', ['less','concat:jsFromDocumentation','concat:fontsFromDocumentation','uglify:jsFromDocumentation','cssmin:cssFromDocumentation','clean:cleanMsApp']);
    
	grunt.registerTask('msDocs-update', '',['copy:UIKit','clean:cleanDocumentationFolder','gitclone:cloneUIKit','copy:UIKitIntoDocumentation','clean:cleanTempFolder','less','concat:jsFromDocumentation','concat:fontsFromDocumentation','uglify:jsFromDocumentation','cssmin:cssFromDocumentation','clean:cleanMsApp']);
    
	grunt.registerTask('ms-run', '',['connect']);
    
	grunt.registerTask('msDocs-version', '', ['version:UIKItVersion']);
	
	grunt.registerTask('ms-replace', '', ['replace:index']);
   
}; 