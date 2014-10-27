module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var wordpressTask = (function(){
        if( options.wordpress.output ) {
            return {
                wpWatch : options.wordpress.path + '/**/*',
                wpImage : 'newer:copy:wpImage',
                wpFont  : 'newer:copy:wpFont',
                wpCSS   : 'newer:copy:wpCSS',
                wpJS    : 'newer:copy:wpJS',
            };
        }
        else {
            return {
                wpWatch : options.dest.dist + '/**/*', // cannot return empty path for livereload, just add a double to make it work
                wpImage : '',
                wpFont  : '',
                wpCSS   : '',
                wpJS    : '',
            };
        }
    })();

/*                  !!! IMPORTANT NOTE !!!
    ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    | IN DESIGNATED LOCATIONS, WATCH ON FIRST RUN MUST HAVE |
    | AT LEAST 1 FILE TO WATCH ELSE ANY CHANGES WILL NOT    |
    | TRIGGER THE WATCH. IDEAL CHOICE OF FILE: index.html   |
    ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/
    var watch = {

        livereload: {
            /*
                Doing a specific livereload target is preferable compared to a global livereload option since
                we are just interested to only livereload destination files & not just any file that has changed
            */
            options: {
                /*
                    Default false, when reload is set to true, changes to "ANY" of the watched files will trigger the watch task to restart.
                */
                reload: false,
                livereload: 35729,
                livereloadOnError:false,
                /*
                    # spawn:false may be prone to failing but its faster so toggle as needed.
                    # Found out false value behaves like block process and makes other process temporarily stuck EG: sublime text
                */
                spawn: true
            },
            files: [
                options.build.path + '/**/*',
                options.dest.dist + '/**/*',
                wordpressTask.wpWatch,
            ],
        },

        gruntFiles: {
            options: {
                reload: true,
            },
            files: [ './Gruntfile.js', options.src.grunt + '/**/*.js' ],
            tasks: [ 'jshint:gruntFiles' ]
        },

    /*                                             #0 [■] TASK IN SEQUENCE [■]
        ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        | refer: https://github.com/gruntjs/grunt-contrib-watch/issues/25                                               |
        | Due to the refered problem, add task sequentially in the array. Name the target a bit more collective         |
        ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */

        htmlTask: {
            files: [ options.src.html + '/*.html' ],
            tasks: [
                'newer:copy:htmlToBuild',     /* #1 [■] SOURCE MONITORING : copy html from _ to _build                                 */
                'newer:htmlmin:html'          /* #2 [■] BUILD MONITORING  : once src html is updated, do a minified version into _dest */
            ]
        },

        lessCompile: {
            files: [ options.src.less + '/**/*.less' ],
            tasks: [
                'newer:less:build',           /* #1 [■] SOURCE MONITORING : preprocess less from _ to _build                  */
                'newer:cssmin:productionCSS', /* #2 [■] BUILD MONITORING  : when css build files updated, cssmin to _dest/css */
                wordpressTask.wpCSS           /* #2 [■] BUILD MONITORING  : copy the min css from dest to wordpress/css       */
            ]
        },

        jsCompile: {
            files: [ options.src.js + '/*.js' ],
            tasks: [
                'jshint:jsSrc',
                'newer:copy:jsToBuild',       /* #1 [■] SOURCE MONITORING : copy js from _ to _build                       */
                'newer:uglify:jsBuild',       /* #2 [■] BUILD MONITORING  : uglify the _build/js into _dest/js             */
                wordpressTask.wpJS            /* #2 [■] BUILD MONITORING  : copy the uglified JS from dest to wordpress/js */
            ]
        },

        imageTask: {
            files: [ options.src.image + '/**/*.{png,jpg,jpeg,gif,webp,svg}' ],
            tasks: [
                'newer:copy:imageToBuild',    /* #1 [■] SOURCE MONITORING : copy image from _ to _build              */
                wordpressTask.wpImage,        /* #1 [■] SOURCE MONITORING : copy image from _ to wordpress/fonts     */
                'newer:imagemin:minImages'    /* #2 [■] BUILD MONITORING  : minify the images inside _build to _dest */
            ]
        },

    /*                                             #1 [■] SOURCE MONITORING [■]
        ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        |                                                       -                                                       |
        ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */

        fontToBuild: {
            files: [ options.src.font + '/**' ],
            tasks: [
                'newer:copy:fontToFolder',    /* #1 [■] SOURCE MONITORING : copy font from _/font to _build/fonts & _dest/fonts (no special operation needed) */
                wordpressTask.wpFont          /* #1 [■] SOURCE MONITORING : copy font from _/font to wordpress/fonts (no special operation needed)            */
            ]
        },

        vendorLibToSrc: {
            files: [ options.src.grunt + '/targets/concat/*.js' ],
            tasks: [
                'concat' // when changed, concat a new file to src. Don't need jsHint as its being concatenated unrecognizable
            ]
        },

        assembleLessConfig: {
            files: [ options.src.hbs.page + '/less/lessConfig.hbs' ],
            tasks: [
                'newer:assemble:less' // compile out a less configuration from settings.yaml
            ]
        },

    /*                                             #2 [■] BUILD MONITORING [■]
        ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        |                                                       -                                                       |
        ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */

        assembleHtml: {
            files: [ options.src.hbs + '/**/*', '!' + options.src.hbs.page + '/lessConfig/less.hbs' ],
            tasks: [
                'newer:assemble:site' // compile into html
            ]
        },
    };

    return watch;
};
