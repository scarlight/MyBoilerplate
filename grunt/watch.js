module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var buildTask = (function(){
        var buildOutput = true; // to build folder actually, not a build routine/ sub routine
        if( buildOutput ) {
            return {
                copyHtml           : 'newer:copy:htmlToBuild',
                copyJs             : 'newer:copy:jsToBuild',
                copyImage          : 'newer:copy:imageToBuild',
                copyFont           : 'newer:copy:fontToFolder',
                copyIncludes       : 'newer:copy:includeToFolder',
                lessPreprocess     : 'newer:less:build',
                hintJs             : 'jshint:jsSrc',
                commentPhp         : 'newer:comments:includePHP',
                cleanHtml          : 'clean:buildHtml',
                cleanCss           : 'clean:buildCss',
                cleanJs            : 'clean:buildJs',
                cleanImage         : 'clean:buildImage',
                cleanFont          : 'clean:buildFont',
                cleanIncludeFolder : 'clean:buildIncludes',
            };
        } else {
            return {
                copyHtml           : '',
                copyJs             : '',
                copyImage          : '',
                copyFont           : '',
                copyIncludes       : '',
                lessPreprocess     : '',
                hintJs             : '',
                commentPhp         : '',
                cleanHtml          : '',
                cleanCss           : '',
                cleanJs            : '',
                cleanIncludeFolder : '',
                cleanImage         : ''
            };
        }
    })();

    var distTask = (function(){
        var distOutput = options.watchForDistribution;
        if( distOutput ) {
            return {
                minHtml            : 'newer:htmlmin:html',
                minCss             : 'newer:cssmin:productionCss',
                minImage           : 'newer:imagemin:minImages',
                uglifyJs           : 'newer:uglify:jsBuild',
                copyIncludes       : 'newer:copy:includeToFolder',
                cleanHtml          : 'clean:distHtml',
                cleanCss           : 'clean:distCss',
                cleanJs            : 'clean:distJs',
                cleanImage         : 'clean:distImage',
                cleanFont          : 'clean:distFont',
                cleanIncludeFolder : 'clean:distIncludeFolder'
            };
        } else {
            return {
                minHtml            : '',
                minCss             : '',
                minImage           : '',
                uglifyJs           : '',
                copyIncludes       : '',
                cleanHtml          : '',
                cleanCss           : '',
                cleanJs            : '',
                cleanIncludeFolder : '',
                cleanImage         : '',
                cleanFont          : ''
            };
        }
    })();

    var wpTask = (function(){
        var wpOutput = options.wordpress.output;
        if( wpOutput ) {
            return {
                wpFiles    : options.wordpress.path + '/**/*',
                copyImage  : 'newer:copy:wpImage',
                copyFont   : 'newer:copy:wpFont',
                copyCss    : 'newer:copy:wpCss',
                copyJs     : 'newer:copy:wpJs',
                cleanImage : 'clean:wpImage',
                cleanFont  : 'clean:wpFont',
                cleanCss   : 'clean:wpCss',
                cleanJs    : 'clean:wpJs',
            };
        }
        else {
            return {
                wpFiles    : options.dist.path + '/**/*', // cannot return empty path for livereload, just add a double to make it work
                copyImage  : '',
                copyFont   : '',
                copyCss    : '',
                copyJs     : '',
                cleanImage : '',
                cleanFont  : '',
                cleanCss   : '',
                cleanJs    : '',
            };
        }
    })();

    var additionalTask = (function(){
        var additionalOutput = true;
        if( additionalOutput ){
            return {
                concatLibJs : 'concat:vendorLibrary',
                assembleLessConfig : 'newer:assemble:lessConfig',
            };
        } else {
            return {
                concatLibJs : '',
                assembleLessConfig : '',
            };
        }
    })();
/*                                           !!! IMPORTANT NOTE !!!
    ┌────────────────────────────────────────■■■■■■■■■■■■■■■■■■■■■■─────────────────────────────────────────────────┐
    │   IN DESIGNATED LOCATIONS, WATCH ON FIRST RUN MUST HAVE AT LEAST 1 FILE TO WATCH ELSE ANY CHANGES WILL NOT    │
    │   TRIGGER THE WATCH. CURRENT IDEAL CHOICE OF FILE: index.html                                                 │
    └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
*/  var watch = {

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
                options.build.path + '/**/*', /* 'include' & 'font' folder will livereload twice as both _build & _dist receives the new change */
                options.dist.path + '/**/*',  /* 'include' & 'font' folder will livereload twice as both _build & _dist receives the new change */
                wpTask.wpFiles,
            ],
        },

        gruntFiles: {
            options: {
                reload: true,
            },
            files: [ './Gruntfile.js', options.src.grunt + '/**/*.js' ],
            tasks: [ 'jshint:gruntFiles' ]
        },

    /*                                             #0 TASK IN SEQUENCE
        ┌──────────────────────────────────────────■■■■■■■■■■■■■■■■■■■──────────────────────────────────────────────────┐
        │   refer: https://github.com/gruntjs/grunt-contrib-watch/issues/25                                             │
        │   Due to the refered problem, add task sequentially in the array. Name the target a bit more collective       │
        └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    */  html: {
            files: [ options.src.html + '/*.html' ],
            tasks: [
                buildTask.cleanHtml,
                buildTask.copyHtml,           /* [#1] SOURCE MONITORING : copy html from _ to _build                                 */
                distTask.cleanHtml,
                distTask.minHtml              /* [#2] BUILD MONITORING  : once src html is updated, do a minified version into _dist */
            ]
        },

        css: {
            files: [ options.src.less + '/**/*.less' ],
            tasks: [
                buildTask.cleanCss,
                buildTask.lessPreprocess,     /* [#1] SOURCE MONITORING : preprocess less from _ to _build                  */
                distTask.cleanCss,
                distTask.minCss,              /* [#2] BUILD MONITORING  : when css build files updated, cssmin to _dist/css */
                wpTask.copyCss                /* [#2] BUILD MONITORING  : copy the min css from dist to wordpress/css       */
            ]
        },

        js: {
            files: [ options.src.js + '/*.js' ],
            tasks: [
                buildTask.hintJs,
                buildTask.cleanJs,            /* [#1] SOURCE MONITORING : copy js from _ to _build                       */
                buildTask.copyJs,             /* [#1] SOURCE MONITORING : copy js from _ to _build                       */
                distTask.cleanJs,
                distTask.uglifyJs,            /* [#2] BUILD MONITORING  : uglify the _build/js into _dist/js             */
                wpTask.cleanJs,
                wpTask.copyJs                 /* [#2] BUILD MONITORING  : copy the uglified JS from dist to wordpress/js */
            ]
        },

        image: {
            files: [ options.src.image + '/**/*.{png,jpg,jpeg,gif,webp,svg}' ],
            tasks: [
                buildTask.cleanImage,
                buildTask.copyImage,          /* [#1] SOURCE MONITORING : copy image from _ to _build              */
                wpTask.cleanImage,
                wpTask.copyImage,             /* [#1] SOURCE MONITORING : copy image from _ to wordpress/image     */
                distTask.cleanImage,
                distTask.minImage             /* [#2] BUILD MONITORING  : minify the images inside _build to _dist */
            ]
        },

    /*                                                [#1] SOURCE MONITORING
        ┌─────────────────────────────────────────────■■■■■■■■■■■■■■■■■■■■■■────────────────────────────────────────────┐
        │                                                       -                                                       │
        └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    */  font: {
            files: [ options.src.font + '/**' ],
            tasks: [
                buildTask.cleanFont,
                distTask.cleanFont,
                buildTask.copyFont,           /* [#1] SOURCE MONITORING : copy font from _/font to _build/fonts & _dist/fonts (no special operation needed, but should be split to individual copy task if there is any) */
                wpTask.cleanFont,
                wpTask.copyFont               /* [#1] SOURCE MONITORING : copy font from _/font to wordpress/fonts (no special operation needed)                                                                         */
            ]
        },

        includeFolder: {
            files: [ options.src.include + '/**/*', '!' + options.src.include + '/kiv/**' ],
            tasks: [
                buildTask.cleanIncludeFolder,
                buildTask.copyIncludes,       /* [#1] SOURCE MONITORING : copy php/files from _/include to _build/include & _dist/include (no special operation needed, but should be split to individual copy task if there is any) */
                buildTask.commentPhp          /* [#2] DIST MONITORING   : remove comments from php files in the include folder                                                                                                       */
            ]
        },

        vendorLib: {
            files: [ options.src.grunt + '/targets/concat/*.js' ],
            tasks: [
                additionalTask.concatLibJs // when changed, concat a new file to src. Don't need jsHint as its being concatenated unrecognizable
            ]
        },

        lessConfig: {
            files: [ options.src.hbs.less + '/lessConfig.hbs' ],
            tasks: [
                additionalTask.assembleLessConfig // compile out a less configuration from set.yml.
            ]
        },

    /*                                                [#2] BUILD MONITORING
        ┌─────────────────────────────────────────────■■■■■■■■■■■■■■■■■■■■■─────────────────────────────────────────────┐
        │                                                       -                                                       │
        └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    */
    };

/*
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
    │   ASSEMBLE TASK : Create individual assemble targets for (page) so that watch could fire task individualy.    │
    │   SOLVED        : Page task compiles separately corresponding to its file change, whilst                      │
    │                   layout, data, helper & partial will initialize a re-compile for all the pages               │
    │   WHERE         : See the below self invoking function for this watch.                                        │
    └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    We shall create individual assemble targets for the watch then append to 'var watch' before its returned to grunt.    */
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