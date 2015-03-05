module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    /*
    NOTE:
        Building the files object dynamically: you cannot group the option files:[{expand: true, nonull: true}]
        outside the files array as it wont work that way. http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
    */

    /*
    var wordpressOTC = {
        files: [
            { // copy fonts to wordpress font folder
                expand: true,
                nonull: true,
                flatten: false, // do not flatten else all subdirectory files get spit out to the top level dist directory
                cwd: 'fonts/',
                src: [ '**' ],
                dest: options.worpdress.path + '/fonts/'
            },
            { // copy images to wordpress images folder
                expand: true,
                nonull: true,
                flatten: false, // do not flatten else all subdirectory files get spit out to the top level dist directory
                cwd: 'images/',
                src: [ '**' ],
                dest: options.worpdress.path + '/images/'
            },
            { // copy css to wordpress css folder
                expand: true,
                nonull: true,
                flatten: false, // do not flatten else all subdirectory files get spit out to the top level dist directory
                cwd: 'css/',
                src: [ '**' ],
                dest: options.worpdress.path + '/css/'
            },
            { // copy js to wordpress js folder
                expand: true,
                nonull: true,
                flatten: false, // do not flatten else all subdirectory files get spit out to the top level dist directory
                cwd: 'js/',
                src: [ '**' ],
                dest: options.worpdress.path + '/js/'
            }
        ]
    };
    */

    // return as object
    var copy = {};

/* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
   | # Skip manually declaring like other task. Its alot to declare manually.                                      |
   | # We shall auto generate a list of all the vendor targets for copy plugin, thus minimizing labour, risk of    |
   |   typo & being human forgetting to add any new vendors.                                                       |
   | # Target name is the file name of the target ( recycling as much as possible )                                |
   ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */

    grunt.file.recurse( 'grunt/targets/copy/vendors', function(abspath, rootdir, subdir, filename ) {
        var targetPath = abspath.replace(/(^grunt)/gmi, '.');  // expected path ./targets/copy/vendor/$.js
        var targetName = filename.replace('.js', '');
              // target : value
       copy[targetName] = require(targetPath)(grunt, options);
    });

/* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
   | # Other custom tasks                                                                                          |
   | # Now automatically add other copy:target from the 'custom' folder to be appended to this return object.      |
   ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */


    grunt.file.recurse( 'grunt/targets/copy/custom', function(abspath, rootdir, subdir, filename ) {
        var targetPath = abspath.replace(/(^grunt)/gmi, '.'); // expected path ./targets/copy/custom/$.js
        var targetName = filename.replace('.js', '');
               // target : value
        copy[targetName] = require(targetPath)(grunt, options);
    });

/* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
   | # Wordpress related tasks                                                                                     |
   | # Now automatically add other copy:target from the 'custom' folder to be appended to this return object.      |
   ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */

    if( options.wordpress.output ) {

        grunt.file.recurse( 'grunt/targets/copy/wordpress', function(abspath, rootdir, subdir, filename ) {
            var targetPath = abspath.replace(/(^grunt)/gmi, '.'); // expected path ./targets/copy/wordpress/$.js
            var targetName = filename.replace('.js', '');
                   // target : value
            copy[targetName] = require(targetPath)(grunt, options);
        });

    }

    return copy;

    // add csspie
    // add modernizer
    // add more of the crossbrowser helper js
    // should try https://github.com/alvarotrigo/fullPage.js also available from bower when search scroll
    // should try http://imakewebthings.com/jquery-waypoints/#shortcuts-examples
};
