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

    var watchDest = (function(){
        var
            htmlTask,
            lessCompile,
            jsCompile,
            includeFolder,
            imageTask;

        if( options.watchForDistribution ) {
            htmlTask      = 'newer:htmlmin:html';
            lessCompile   = 'newer:cssmin:productionCSS';
            jsCompile     = 'newer:uglify:jsBuild';
            includeFolder = 'newer:copy:includeToFolder';
            imageTask     = 'newer:imagemin:minImages';
        } else {
            htmlTask      = '';
            lessCompile   = '';
            jsCompile     = '';
            includeFolder = '';
            imageTask     = '';
        }

        return {
            htmlTask      : htmlTask,
            lessCompile   : lessCompile,
            jsCompile     : jsCompile,
            includeFolder : includeFolder,
            imageTask     : imageTask
        };
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
                options.build.path + '/**/*', /* 'include' & 'font' folder will livereload twice as both _build & _dest receives the new change */
                options.dest.dist + '/**/*',  /* 'include' & 'font' folder will livereload twice as both _build & _dest receives the new change */
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
                'newer:copy:htmlToBuild', /* #1 [■] SOURCE MONITORING : copy html from _ to _build                                 */
                watchDest.htmlTask        /* #2 [■] BUILD MONITORING  : once src html is updated, do a minified version into _dest */
            ]
        },

        lessCompile: {
            files: [ options.src.less + '/**/*.less' ],
            tasks: [
                'newer:less:build',    /* #1 [■] SOURCE MONITORING : preprocess less from _ to _build                  */
                watchDest.lessCompile, /* #2 [■] BUILD MONITORING  : when css build files updated, cssmin to _dest/css */
                wordpressTask.wpCSS    /* #2 [■] BUILD MONITORING  : copy the min css from dest to wordpress/css       */
            ]
        },

        jsCompile: {
            files: [ options.src.js + '/*.js' ],
            tasks: [
                'jshint:jsSrc',
                'newer:copy:jsToBuild', /* #1 [■] SOURCE MONITORING : copy js from _ to _build                       */
                watchDest.jsCompile,    /* #2 [■] BUILD MONITORING  : uglify the _build/js into _dest/js             */
                wordpressTask.wpJS      /* #2 [■] BUILD MONITORING  : copy the uglified JS from dest to wordpress/js */
            ]
        },

        imageTask: {
            files: [ options.src.image + '/**/*.{png,jpg,jpeg,gif,webp,svg}' ],
            tasks: [
                'newer:copy:imageToBuild', /* #1 [■] SOURCE MONITORING : copy image from _ to _build              */
                wordpressTask.wpImage,     /* #1 [■] SOURCE MONITORING : copy image from _ to wordpress/image     */
                watchDest.imageTask        /* #2 [■] BUILD MONITORING  : minify the images inside _build to _dest */
            ]
        },

    /*                                             #1 [■] SOURCE MONITORING [■]
        ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        |                                                       -                                                       |
        ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */

        fontToBuild: {
            files: [ options.src.font + '/**' ],
            tasks: [
                'newer:copy:fontToFolder', /* #1 [■] SOURCE MONITORING : copy font from _/font to _build/fonts & _dest/fonts (no special operation needed, but should be split to individual copy task if there is any) */
                wordpressTask.wpFont       /* #1 [■] SOURCE MONITORING : copy font from _/font to wordpress/fonts (no special operation needed)                                                                         */
            ]
        },

        includeFolder: {
            files: [ options.src.include + '/**/*', '!' + options.src.include + '/kiv/**' ],
            tasks: [
                'newer:copy:includeToFolder', /* #1 [■] SOURCE MONITORING : copy php/files from _/include to _build/include & _dest/include (no special operation needed, but should be split to individual copy task if there is any) */
                'newer:comments:includePHP'   /* #2 [■] DEST MONITORING   : remove comments from php files in the include folder                                                                                                       */
            ]
        },

        vendorLibToSrc: {
            files: [ options.src.grunt + '/targets/concat/*.js' ],
            tasks: [
                'concat' // when changed, concat a new file to src. Don't need jsHint as its being concatenated unrecognizable
            ]
        },

        assembleLessConfig: {
            files: [ options.src.hbs.less + '/lessConfig.hbs' ],
            tasks: [
                'newer:assemble:lessConfig' // compile out a less configuration from set.yml.
            ]
        },

        /*
            # WORKAROUND: Create individual assemble targets (page) for watch to fire task individualy.
            # SOLVED    : Page task compiles separately corresponding to its file change, whilst
                          layout, data, helper & partial will initialize a re-compile for all the pages
            # WHERE     : See the below self invoking function for this watch.
        */

    /*                                             #2 [■] BUILD MONITORING [■]
        ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        |                                                       -                                                       |
        ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */
    };

    // We shall create individual assemble targets for the watch then append to 'var watch' before its returned to grunt.
    (function(){
        for (var target in options.assemblePagesTarget) {
            var
                watchFile = [ options.assemblePagesTarget[target] ],
                watchTask = [ 'assemble:'+target ],
                watchTargetParams = {
                    files: watchFile,
                    tasks: watchTask
                };

                // lets make the target name a little better with camelCase style
                var str = target;
                var arr = str.split('');
                var theTarget = '';
                for (var i = 0; i < arr.length; i++) {
                    if( i === 0){
                        theTarget += 'assemble';
                        theTarget += arr[i].toUpperCase();
                    }
                    else {
                        theTarget += arr[i];
                    }
                }
                watch[theTarget] = watchTargetParams;
        }
    })();

    return watch;
};