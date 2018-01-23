'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['app/js/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },

        browserify: {
            dist: {
                files: {
                    'build/app.js': ['app/js/app.js', 'app/js/drawUtils.js', 'app/js/main.js']
                }
            }
        },

        copy: {
            files: {
                cwd: 'app',
                src: ['css/**/*', '**/*.png', '**/*.html', '**/*.webapp'],
                dest: 'build',
                expand: true
            }
        },

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['app/index.html']
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['htmlhint', 'jshint', 'browserify', 'copy']);
};