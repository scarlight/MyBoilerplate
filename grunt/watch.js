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
                lessTemplate       : 'less:template', // no need 'newer' as its already has fine grained control
                lessTheme          : 'less:theme',    // no need 'newer' as its already has fine grained control
                lessDoc            : 'less:doc',      // no need 'newer' as its already has fine grained control
                hintJs             : 'jshint:jsSrc',
                commentPhp         : 'newer:comments:includePHP',
                cleanHtml          : options.needCleanTask ? 'clean:buildHtml'     : '',
                cleanCss           : options.needCleanTask ? 'clean:buildCss'      : '',
                cleanJs            : options.needCleanTask ? 'clean:buildJs'       : '',
                cleanImage         : options.needCleanTask ? 'clean:buildImage'    : '',
                cleanFont          : options.needCleanTask ? 'clean:buildFont'     : '',
                cleanIncludeFolder : options.needCleanTask ? 'clean:buildIncludes' : '',
            };
        } else {
            return {
                copyHtml           : '',
                copyJs             : '',
                copyImage          : '',
                copyFont           : '',
                copyIncludes       : '',
                lessTemplate       : '',
                lessTheme          : '',
                lessDoc            : '',
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
                cleanHtml          : options.needCleanTask ? 'clean:distHtml'          : '',
                cleanCss           : options.needCleanTask ? 'clean:distCss'           : '',
                cleanJs            : options.needCleanTask ? 'clean:distJs'            : '',
                cleanImage         : options.needCleanTask ? 'clean:distImage'         : '',
                cleanFont          : options.needCleanTask ? 'clean:distFont'          : '',
                cleanIncludeFolder : options.needCleanTask ? 'clean:distIncludeFolder' : '',
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
                cleanImage : options.needCleanTask ? 'clean:wpImage' : '',
                cleanFont  : options.needCleanTask ? 'clean:wpFont'  : '',
                cleanCss   : options.needCleanTask ? 'clean:wpCss'   : '',
                cleanJs    : options.needCleanTask ? 'clean:wpJs'    : '',
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

        lessTemplate: {
            files: [ options.src.less + '/template.less', options.src.lessImport + '/**/*.less', '!' + options.src.lessImport + '/custom-bootstrap.less', '!' + options.src.lessImport + '/doc-includes.less' ],
            tasks: [
                // buildTask.cleanCss,           // need to fine grain template.css only
                buildTask.lessTemplate,       /* [#1] SOURCE MONITORING : preprocess template.less from _ to _build         */
                // distTask.cleanCss,            // need to fine grain template.css only
                distTask.minCss,              /* [#2] BUILD MONITORING  : when css build files updated, cssmin to _dist/css */
                wpTask.copyCss                /* [#2] BUILD MONITORING  : copy the min css from dist to wordpress/css       */
            ]
        },

        lessTheme: {
            files: [ options.src.less + '/theme.less', options.src.lessImport + '/custom-bootstrap.less', options.src.vendor + '/bootstrap/less/**/*.less' ],
            tasks: [
                // buildTask.cleanCss,           // need to fine grain theme.css only
                buildTask.lessTheme,          /* [#1] SOURCE MONITORING : preprocess theme.less from _ to _build            */
                // distTask.cleanCss,            // need to fine grain theme.css only
                distTask.minCss,              /* [#2] BUILD MONITORING  : when css build files updated, cssmin to _dist/css */
                wpTask.copyCss                /* [#2] BUILD MONITORING  : copy the min css from dist to wordpress/css       */
            ]
        },

        lessDoc: {
            files: [ options.src.less + '/doc.less', options.src.lessImport + '/doc-includes.less' ],
            tasks: [
                // buildTask.cleanCss,           // need to fine grain doc.css only
                buildTask.lessDoc,            /* [#1] SOURCE MONITORING : preprocess doc.less from _ to _build              */
                // distTask.cleanCss,            // need to fine grain doc.css only
                distTask.minCss,              /* [#2] BUILD MONITORING  : when css build files updated, cssmin to _dist/css */
                wpTask.copyCss                /* [#2] BUILD MONITORING  : copy the min css from dist to wordpress/css       */
            ]
        },

        js: {
            files: [ options.src.js + '/**/*.js' ],
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