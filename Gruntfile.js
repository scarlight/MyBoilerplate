/**
 * Node.js Documentation : http://nodejs.org/api/
 * Others to do : find a way using grunt to remove all php & html comment block when pushed as production code (wordpress)
 */
module.exports = function(grunt) {
/*      NOTE
    ┌───■■■■────────────────────────────────────────────────────────────────────────────────────────────────────────┐
    │   KIV DISCLAIMER: ADDED HERE JUST IN CASE WANT TO KNOW HOW TO READ DATA                                       │
    │   * http://stackoverflow.com/questions/23825753/node-js-fs-readfilesync-bad-arguments                         │
    │   * using synchronus IO method to halt script and wait for it to load;                                        │
    │   * var outputSrc = fs.readFileSync( 'grunt/include/gruntfile-src.js', 'utf-8'),                              │
    └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
*/

    'use strict';
    grunt.util.linefeed = '\n';       // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var path = require('path');

    require( 'time-grunt' )( grunt ); // measures the time each task takes
    require('load-grunt-config')( grunt, {

    /*  ┌───┬────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
        │   ├─ path to task.js files, defaults to grunt dir.                                                             │
        │   ├─ 'configPath' accepts a single path, we can have each task.js to require for their targets                 │
        │   └─ from the targets folder                                                                                   │
        │    ─ each task.js files actually returns its target:value back to Grunt                                        │
        └────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    */  configPath     : path.join(process.cwd(), 'grunt'),
        init           : true,                              // do auto grunt.initConfig
        data           : {                                  // data passed into config.
            bowerrc    : grunt.file.readJSON( '.bowerrc' ),
            banner     : '/*! <%= package.name %> - v<%= package.version %> - ' +
                         '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                         '<%= package.homepage ? "* " + package.homepage + "\\n" : "\\n*/\\n" %>' +
                         '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= package.author.name %>' +
                         '<%= package.license ? "\\n* Licensed under" + package.license + "( " + package.license.url + " ) */\\n" : "\\n*/\\n" %>',
            nodeModule : 'node_modules',

            // this paths are also suitable for source control.
            src : require('./grunt/include/path-src.js')( grunt ),
            // for debug and build processing for distribution folder.
            build : require('./grunt/include/path-build.js')( grunt ),
            // for distribution a.k.a production files.
            dist : require('./grunt/include/path-dist.js')( grunt ),
            // we going to use the same src files for wordpress development,
            wordpress : require('./grunt/include/path-wordpress.js')( grunt ),
            assemblePagesTarget : {},   // an assemble container for my workaround
            watchForDistribution : true, // watch task output to _dist or not
        },

    /*
        ┌───┬────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
        │   ├─ can optionally pass options to load-grunt-tasks/ jit-grunt. If set false,                                 │
        │   └─ it will disable auto loading tasks. (Use jit for slightly more performance boost)                         │
        └────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    */  jitGrunt : {
            staticMappings: {
                assemble : 'assemble',
                comments : 'grunt-stripcomments',
            }
        },

        postProcess : function(config) {} //can post process config object before it gets passed to grunt
    });

};