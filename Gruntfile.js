module.exports = function ( grunt )
{
    'use strict';

    require( 'time-grunt' )( grunt ); // measures the time each task takes
    require( 'jit-grunt' )( grunt ); // A JIT(Just In Time) plugin loader for Grunt. Replacing load-grunt-tasks to improve performance

    // Force use of Unix newlines. Copied from Bootstrap Gruntfile.js
    grunt.util.linefeed = '\n';

    var chalk = require( 'chalk' );
    var wordpressOutput = false; // when set to true, uncomment watch:lessFile and optional to comment watch:quickDev as the html is still using the .css without .min

    // Project configuration
    grunt.initConfig(
    {
        // Metadata
        projectPath: grunt.file.readJSON( '_/dev/filepath.json' ),
        bowerrc: grunt.file.readJSON( '.bowerrc' ),
        pkg: grunt.file.readJSON( 'package.json' ),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "\\n*/\\n" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
            '<%= pkg.license ? "\\n* Licensed under" + pkg.license + "( " + pkg.license.url + " ) */\\n" : "\\n*/\\n" %>',

        // Task configuration
        jshint:
        {
            options:
            {
                jshintrc: '<%= projectPath.devJs %>/.jshintrc',
                reporter: require( 'jshint-stylish' )
            },
            grunt:
            {
                options:
                {
                    jshintrc: '<%= projectPath.grunt %>/.jshintrc'
                },
                src: [ 'Gruntfile.js', '<%= projectPath.grunt %>/*.js' ]
            },
            development:
            {
                src: [ '<%= projectPath.devJs %>/custom.js' ]
            },
            projectPath:
            {
                src: [ '<%= projectPath.dev %>/filepath.json' ]
            }
        },

        uglify:
        {
            customDev: //send to dev folder
            {
                options:
                {
                    preserveComments: true,
                    mangle: false,
                    compress: false,
                    beautify: true,
                    report: 'min'
                },
                files: [
                    {
                        expand: true, // set true to enable the following options.
                        ext: '.js',
                        extDot: 'first',
                        flatten: true, // remove all path parts from generated dest paths.
                        src: '<%= projectPath.devJs %>/custom.js',
                        dest: 'dev/js/'
                    }
                ]
            },
            customDevWp: //send to wordpress dev folder
            {
                options:
                {
                    preserveComments: true,
                    mangle: false,
                    compress: false,
                    beautify: true,
                    report: 'min'
                },
                files: [
                    {
                        expand: true,
                        ext: '.js',
                        extDot: 'first',
                        flatten: true, // flatten the path - sub directory is not used here
                        src: '<%= projectPath.devJs %>/custom.js',
                        dest: '<%= projectPath.wordpress %>/dev/js/'
                    }
                ]
            },
            customSrc: //send to src folder
            {
                options:
                {
                    preserveComments: false,
                    mangle: true,
                    compress: true,
                    report: 'min'
                },
                files: [
                    {
                        expand: true,
                        ext: '.min.js',
                        extDot: 'first',
                        flatten: true,
                        src: '<%= projectPath.devJs %>/custom.js',
                        dest: 'js/'
                    }
                ]
            },
            customSrcWp: // send all the way to wordpress dir
            {
                options:
                {
                    preserveComments: false,
                    mangle: true,
                    compress: true,
                    report: 'min'
                },
                files: [
                    {
                        expand: true,
                        ext: '.min.js',
                        extDot: 'first',
                        flatten: true, // flatten the path - sub directory is not used here
                        src: '<%= projectPath.devJs %>/custom.js',
                        dest: '<%= projectPath.wordpress %>/js/'
                    }
                ]
            },
            lib: //send to src folder
            {
                options:
                {
                    preserveComments: false,
                    mangle: false,
                    compress: true,
                    report: 'min'
                },
                files: [
                    {
                        expand: true,
                        ext: '.min.js',
                        extDot: 'first',
                        flatten: true,
                        src: 'dev/js/lib.js',
                        dest: 'js/'
                    }
                ]
            },
            wplib: // compress back into worpdress js/
            {
                options:
                {
                    preserveComments: false,
                    mangle: false,
                    compress: true,
                    report: 'min'
                },
                files: [
                    {
                        expand: true,
                        ext: '.min.js',
                        extDot: 'first',
                        flatten: true, // flatten the path - sub directory is not used here
                        src: '<%= projectPath.wordpress %>/dev/js/lib.js',
                        dest: '<%= projectPath.wordpress %>/js/'
                    }
                ]
            },
        },

        concat:
        {
            options:
            {
                separator: grunt.util.linefeed + ';',
                stripBanners: false,
                nonull: true,
            },
            lib:
            {
                src: [ '<%= projectPath.jsLib %>' ],
                dest: 'dev/js/lib.js'
            },
            wplib: // send all the way to wordpress dir
            {
                src: [ '<%= projectPath.jsLib %>' ],
                dest: '<%= projectPath.wordpress %>/dev/js/lib.js'
            }
        },

        less: //just do less compiling and leave cssmin to do its job better
        {
            development:
            {
                options:
                {
                    path: [ '<%= projectPath.devLess %>/bootstrap/less', '<%= projectPath.devOwn %>' ],
                    strictMath: true,
                    dumpLineNumbers: 'comments'
                },
                files: [
                    {
                        expand: true,
                        ext: '.css',
                        extDot: 'first',
                        flatten: true,
                        src: [ '<%= projectPath.devLess %>/*.less' ],
                        dest: 'dev/css/'
                    }
                ]
            },
            quickDev:
            {
                options:
                {
                    path: [ '<%= projectPath.devLess %>/bootstrap/less', '<%= projectPath.devOwn %>' ],
                    strictMath: true,
                    dumpLineNumbers: 'comments'
                },
                files: [
                    {
                        expand: true,
                        ext: '.css',
                        extDot: 'first',
                        flatten: true,
                        src: [ '<%= projectPath.devLess %>/*.less', '!<%= projectPath.devLess %>/theme.less' ],
                        dest: 'css/'
                    }
                ]
            },
            wordpress:
            {
                options:
                {
                    path: [ '<%= projectPath.devLess %>/bootstrap/less', '<%= projectPath.devOwn %>' ],
                    strictMath: true,
                    dumpLineNumbers: 'comments'
                },
                files: [
                    {
                        expand: true,
                        ext: '.css',
                        extDot: 'first',
                        flatten: true, // flatten the path - sub directory is not used here
                        src: [ '<%= projectPath.devLess %>/*.less' ],
                        dest: '<%= projectPath.wordpress %>/dev/css/'
                    }
                ]
            }
        },

        cssmin: //just do cssmin
        {
            production:
            {
                options:
                {
                    banner: '<%= banner %>',
                    keepSpecialComments: 0,
                    report: 'min'
                },
                files: [
                    {
                        expand: true,
                        ext: '.min.css',
                        extDot: 'first',
                        flatten: true,
                        src: [ 'dev/css/*.css' ],
                        dest: 'css/'
                    }
                ]
            },
            wordpress:
            {
                options:
                {
                    banner: '<%= banner %>',
                    keepSpecialComments: 0,
                    report: 'min'
                },
                files: [
                    {
                        expand: true,
                        ext: '.min.css',
                        extDot: 'first',
                        flatten: true, // flatten the path - sub directory is not used here
                        src: [ '<%= projectPath.wordpress %>/dev/css/*.css' ],
                        dest: '<%= projectPath.wordpress %>/css/'
                    }
                ]
            }
        },

        clean:
        {
            dist: []
        },

        concurrent: // maybe during file compression i can use this for development cause now this can slow me down
        {
            srcCompiling: [ 'less', 'javascript-concat' ],
            srcMinification: [ 'cssmin', 'ungligy' ],
            srcHinting: [ 'jshint:development', 'notify:jsFileDevelopment' ],
            notifyCompletion: [ 'notify:cssmin', 'notify:lessFile' ]
        },

        /* usebanner: //if a grunt plugin dont have a banner options for its task, then use this plugin to add banner to the dest file
        {
            cssfile:
            {
                options:
                {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files:
                {
                    src: [ 'dev/css/*.css', 'css/*.css', '!dev/css/theme.css', '!css/theme.min.css' ] // excluded because usebanner is prepending on every run
                }
            }
        }, */

        exec:
        {
            /* helloSimpson:
            {
                cmd: function ( firstName, lastName )
                {
                    var formattedName =
                    [
                        lastName.toUpperCase(),
                        firstName.toUpperCase()
                    ].join( ', ' );
                    return 'echo ' + formattedName;
                }
            }, */
            gruntVersion:
            {
                cmd: function ()
                {
                    return 'echo ' + this.version;
                }
            },
            checkVersion:
            {
                command: 'bower cache clean && bower list -r'
            }
        },

        devUpdate:
        {
            main:
            {
                options:
                {
                    updateType: 'report', //just report outdated packages
                    reportUpdated: false, //don't report already updated packages
                    semver: true, //use package.json semver rules when updating
                    packages:
                    { //what packages to check
                        devDependencies: true,
                        dependencies: true
                    },
                    packageJson: null //find package.json automatically
                }
            }
        },

        copy:
        {
            vendorJquery:
            {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/jquery/dist/',
                        src: [ '*.min.js' ],
                        dest: '<%= projectPath.devVendor %>/jquery'
                    },
                ]
            },
            vendorBootstrap:
            {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/',
                        src: [ 'bootstrap/less/**' ], // includes files within path and its sub-directories
                        dest: '<%= projectPath.devVendor %>'
                    },
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/bootstrap/dist/',
                        src: [ 'js/*.min.js' ],
                        dest: '<%= projectPath.devVendor %>/bootstrap'
                    },
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/bootstrap/dist/fonts/',
                        src: [ '*' ],
                        dest: 'fonts/'
                    }
                ]
            },
            vendorAnimateCSS:
            {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/',
                        src: [ 'animate-css/*.min.css' ],
                        dest: '<%= projectPath.devVendor %>'
                    }
                ]
            },
            vendorFontAwesome:
            {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/font-awesome/css/',
                        src: [ '*.min.css' ],
                        dest: '<%= projectPath.devVendor %>/font-awesome'
                    },
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/font-awesome/fonts/',
                        src: [ '*' ],
                        dest: 'fonts/'
                    }
                ]
            },
            vendorLessElement:
            {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/',
                        src: [ 'less-elements/*.less' ],
                        dest: '<%= projectPath.devVendor %>'
                    }
                ]
            },
            vendorGreensock:
            {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/greensock/src/minified/',
                        src: [ '**' ],
                        dest: '<%= projectPath.devVendor %>/greensock'
                    }
                ]
            },
            vendorCarouFredSel:
            {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/',
                        src: [ 'carouFredSel/*packed.js', 'carouFredSel/helper-plugins/*.js' ],
                        dest: '<%= projectPath.devVendor %>'
                    }
                ]
            },
            vendorJqueryEasing:
            {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/jquery.easing/js/',
                        src: [ 'jquery.easing.min.js' ],
                        dest: '<%= projectPath.devVendor %>/jquery.easing'
                    }
                ]
            },
            vendorHoverIntent:
            {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/',
                        src: [ 'jquery-hoverIntent/*.js' ],
                        dest: '<%= projectPath.devVendor %>'
                    }
                ]
            },
            vendorSuperfish:
            {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/superfish/dist/js/',
                        src: [ 'superfish.min.js', 'supersubs.js' ],
                        dest: '<%= projectPath.devVendor %>/superfish'
                    }
                ]
            },
            vendorPajinate:
            {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/',
                        src: [ 'pajinate/*.min.js' ],
                        dest: '<%= projectPath.devVendor %>'
                    }
                ]
            },
            vendorSlimbox2:
            {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/',
                        src: [ 'slimbox2/js/*.js' ],
                        dest: '<%= projectPath.devVendor %>'
                    },
                    {
                        expand: true,
                        nonull: true,
                        cwd: '<%= bowerrc.directory %>/slimbox2/css/',
                        src: [ '*.gif' ],
                        dest: 'images/'
                    }
                ]
            },
            // changing content needs a unique target and cannot combine with the above target
            // also each file that needs content change must have its file name hardcoded
            vendorSlimbox2CSSURL:
            {
                options:
                {
                    process: function ( content, srcpath )
                    {
                        return content.replace( /(url\()/gmi, 'url(../images/' );
                    }
                },
                nonull: true,
                files: [
                    {
                        src: [ '<%= bowerrc.directory %>/slimbox2/css/slimbox2.css' ],
                        dest: '<%= projectPath.devVendor %>/slimbox2/css/slimbox2.css',
                    },
                    {
                        src: [ '<%= bowerrc.directory %>/slimbox2/css/slimbox2-rtl.css' ],
                        dest: '<%= projectPath.devVendor %>/slimbox2/css/slimbox2-rtl.css',
                    }
                ]
            },
            fontsNImagesToWordpress:
            {
                files: [
                    { // copy fonts to wordpress font folder
                        expand: true,
                        nonull: true,
                        flatten: false, // do not flatten else all subdirectory files get spit out to the top level dest directory
                        cwd: 'fonts/',
                        src: [ '**' ],
                        dest: '<%= projectPath.wordpress %>/fonts/'
                    },
                    { // copy images to wordpress images folder
                        expand: true,
                        nonull: true,
                        flatten: false, // do not flatten else all subdirectory files get spit out to the top level dest directory
                        cwd: 'images/',
                        src: [ '**' ],
                        dest: '<%= projectPath.wordpress %>/images/'
                    }
                ]
            },
            wordpressOTC:
            {
                files: [
                    { // copy fonts to wordpress font folder
                        expand: true,
                        nonull: true,
                        flatten: false, // do not flatten else all subdirectory files get spit out to the top level dest directory
                        cwd: 'fonts/',
                        src: [ '**' ],
                        dest: '<%= projectPath.wordpress %>/fonts/'
                    },
                    { // copy images to wordpress images folder
                        expand: true,
                        nonull: true,
                        flatten: false, // do not flatten else all subdirectory files get spit out to the top level dest directory
                        cwd: 'images/',
                        src: [ '**' ],
                        dest: '<%= projectPath.wordpress %>/images/'
                    },
                    { // copy css to wordpress css folder
                        expand: true,
                        nonull: true,
                        flatten: false, // do not flatten else all subdirectory files get spit out to the top level dest directory
                        cwd: 'css/',
                        src: [ '**' ],
                        dest: '<%= projectPath.wordpress %>/css/'
                    },
                    { // copy js to wordpress js folder
                        expand: true,
                        nonull: true,
                        flatten: false, // do not flatten else all subdirectory files get spit out to the top level dest directory
                        cwd: 'js/',
                        src: [ '**' ],
                        dest: '<%= projectPath.wordpress %>/js/'
                    }
                ]
            }
        },

        watch:
        {
            options:
            {
                livereload: 35729,
                livereloadOnError:false,
                spawn: true // false may be prone to failing but its faster so toggle as needed. Found out false value behaves like block process and makes other process temporarily stuck EG: sublime text
            },
            // lessFile:
            // {
            //     files: [ '<%= projectPath.devLess %>/*.less' ], //to work with grunt-watch plugin just specify in array without files array format eg:src:['']
            //     tasks: [ 'less:development', 'cssmin:production', 'notify:lessFile', 'wordpress-css' ]
            // },
            quickDev:
            {
                files: [ '<%= projectPath.devLess %>/*.less' ],
                tasks: [ 'less:quickDev', 'notify:quickDev' ]
            },
            jsFileDevelopment:
            {
                files: [ '<%= projectPath.devJs %>/*.js' ],
                tasks: [ 'jshint:development', 'uglify:customDev', 'uglify:customSrc', 'notify:jsFileDevelopment', 'wordpress-js' ]
            },
            projectPath:
            {
                files: [ '<%= projectPath.dev %>/filepath.json' ],
                tasks: [ 'jshint:projectPath', 'concat:lib', 'uglify:lib', 'notify:projectPath', 'wordpress-js-lib' ]
            },
            html:
            {
                files: [ '**/*.html', 'fonts/**', '**/*.{png,jpg,jpeg,gif,webp,svg}' ],
                tasks: [ 'notify:reload' ]
            },
            fontsNImages:
            {
                files: [ 'fonts/**', '**/*.{png,jpg,jpeg,gif,webp,svg}' ],
                tasks: [ 'wordpress-font-images' ]
            },
            wordpress:
            {
                files: [ '<%= projectPath.wordpress %>/**/*.html',
                         '<%= projectPath.wordpress %>/fonts/**',
                         '<%= projectPath.wordpress %>/**/*.php',
                         '<%= projectPath.wordpress %>/**/*.{png,jpg,jpeg,gif,webp,svg}',
                         '<%= projectPath.wordpress %>/**/*.css',
                         '<%= projectPath.wordpress %>/**/*.js'
                        ],
                tasks: [ 'notify:wpreload' ]
            },
            gruntfile:
            {
                options:
                {
                    reload: true
                },
                files: [ 'Gruntfile.js', '<%= projectPath.grunt %>/*.js' ],
                tasks: [ 'jshint:grunt', 'notify:gruntfile' ]
            }
        },

        notify:
        {
            lessFile:
            {
                options:
                {
                    title: 'TASK: less:development, cssmin:production, wordpress-css',
                    message: 'LESS to CSS build done.'
                }
            },
            quickDev:
            {
                options:
                {
                    title: 'TASK: less:quickDev',
                    message: 'LESS to CSS build done.'
                }
            },
            jsFileDevelopment:
            {
                options:
                {
                    title: 'TASK: jshint:development, uglify:customDev, uglify:customSrc, wordpress-js',
                    message: 'Run completed.'
                }
            },
            projectPath:
            {
                options:
                {
                    title: 'TASK: jshint:projectPath, concat:lib, uglify:lib, wordpress-js-lib',
                    message: 'Run completed.'
                }
            },
            wordpressfontNImages:
            {
                options:
                {
                    title: 'TASK: wordpress-font-images',
                    message: 'Added fonts and images to wordpress directory.'
                }
            },
            reload:
            {
                options:
                {
                    title: 'TASK: Livereload',
                    message: 'Website reloaded'
                }
            },
            wpreload:
            {
                options:
                {
                    title: 'TASK: Livereload',
                    message: 'Wordpress site reloaded'
                }
            },
            gruntfile:
            {
                options:
                {
                    title: 'TASK: jshint:grunt',
                    message: 'Gruntfile.js reloaded.'
                }
            }
        }
    } );

    // Default task
    grunt.registerTask( 'default', [ 'watch' ] );
    grunt.registerTask( 'prep', [ 'exec', 'copy' ] );
    grunt.registerTask( 'compile-less', [ 'less', 'cssmin', 'notify:lessFile' ] );

    grunt.registerTask( 'wordpress-css', function ()
    {
        if ( !wordpressOutput )
        {
            grunt.log.writeln( chalk.red.bold( 'TASK-NOTICE: wordpress option is FALSE, TASK:wordpress-css will not run.' ) );
        }
        else
        {
            grunt.task.run(
                [
                    'less:wordpress', 'cssmin:wordpress', 'notify:wpreload'
                ]
            );
        }
    } );

    grunt.registerTask( 'wordpress-js', function ()
    {
        if ( !wordpressOutput )
        {
            grunt.log.writeln( chalk.red.bold( 'TASK-NOTICE: wordpress option is FALSE, TASK:wordpress-js will not run.' ) );
        }
        else
        {
            grunt.task.run(
                [
                    'uglify:customDevWp', 'uglify:customSrcWp', 'notify:wpreload'
                ]
            );
        }
    } );

    grunt.registerTask( 'wordpress-js-lib', function ()
    {
        if ( !wordpressOutput )
        {
            grunt.log.writeln( chalk.red.bold( 'TASK-NOTICE: wordpress option is FALSE, TASK:wordpress-js-lib will not run.' ) );
        }
        else
        {
            grunt.task.run(
                [
                    'concat:wplib', 'uglify:wplib', 'notify:wpreload'
                ]
            );
        }
    } );

    grunt.registerTask( 'wordpress-font-images', function ()
    {
        if ( !wordpressOutput )
        {
            grunt.log.writeln( chalk.red.bold( 'TASK-NOTICE: wordpress option is FALSE, TASK:wordpress-font-images will not run.' ) );
        }
        else
        {
            grunt.task.run(
                [
                    'copy:fontsNImagesToWordpress', 'notify:wordpressfontNImages', 'notify:wpreload'
                ]
            );
        }
    } );

};
