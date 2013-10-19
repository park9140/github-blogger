module.exports = function (grunt) {
    'use strict';

    var buildFile = require('./config/build.js');

    // Project configuration.
    grunt.initConfig({
        // bower configurations
        bower: {
            install: {
                command: 'install'
            },
            copy: {
                command: 'copy',
                source: 'vendor',
                destination: 'output/build'
            }
        },
        // Clean up all non-watched files
        clean: {
            output: 'output'
        },
        //Join all less files from all source directories into one file
        // for compilation simplification
        concat: {
            less: {
                src: ['src/**/*.less'],
                dest: 'output/build/css/main-concat.less'
            }
        },
        //Copy all client source to output directory
        copy: {
            src: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**'],
                    dest: 'output/build',
                    filter: 'isFile'
                }]
            }
        },
        htmlbuild: {
            index: {
                src: 'output/package/index.html',
                dest: 'output/package/index.html',
                options: {
                    beautify: false,
                    relative: true,
                    scripts: {
                        main: 'output/package/main.js'
                    },
                    styles: {
                        main: 'output/package/css/main.css'
                    }
                }
            }
        },
        // Lint all non-generated javascript files
        jshint: {
            options: {jshintrc: '.jshintrc'},
            app: {
                src: [
                    '**/*.js',
                    '!node_modules/**/*.js',
                    '!output/**/*.js',
                    '!vendor/**/*.js'
                ]
            }
        },
        // Test runner
        karma: {
            ci: {
                browsers: ['PhantomJS'],
                singleRun: true
            },
            debug: { //only use through grunt debug. This will not work on its own.
                autoWatch: true,
                browsers: ['Chrome']
            },
            options: { //shared options
                autoWatch: false,
                configFile: 'config/karma.conf.js',
                runnerPort: 9101
            }
        },
        less: {
            dev: {
                options: {
                    yuicompress: grunt.option('production') ? 'compact' : 'expanded'
                },
                files: [{
                    src: ['<%= concat.less.dest %>'],
                    dest: 'output/build/css/main.css'
                }]
            }
        },
        requirejs: {
            compile: {
                options: grunt.option('production') ? buildFile : grunt.util._.extend(buildFile, {
                    modules: [{
                        name: 'main'
                    }],
                    optimize: 'none'
                })
            }
        },
        // Watch for file changes to run lint, build and test tasks
        watch: {
            debug: {
                files: [
                    'src/**/*.js',
                    'test/**/*.js'
                ],
                options: {
                    interrupt: true,
                    atBegin: true
                },
                tasks: ['jshint', 'package']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-bower-tasks');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-karma');

    // Default task.
    grunt.registerTask('default', 'Build and run live tests and packaging', ['watch']);

    // build task
    grunt.registerTask('build-ci', 'Simple call that runs jshint, and karma client tests as a single run, use --production for minified packaging', ['jshint', 'package', 'karma:ci']);
    grunt.registerTask('debug', 'Standard workflow for debugging tests and watching', ['karma:debug']);
    grunt.registerTask('get_build_files', 'build step that migrates unpackaged source to build output directory to prepare for packaging', ['clean', 'copy', 'bower:install', 'bower:copy']);
    grunt.registerTask('package-css', 'Concatenate all less files to one file then less compile.', ['concat:less', 'less']);
    grunt.registerTask('generateHtml', 'Conditionally generate html', function () {
        if (grunt.option('production')) {
            grunt.task.run('htmlbuild');
        }
    });
    grunt.registerTask('package', 'Generate build package, use --production for minified packaging', ['get_build_files', 'package-css', 'requirejs', 'generateHtml']);
};
