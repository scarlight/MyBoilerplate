module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        files: [
            { // #1
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/slimbox2/js/',
                src: [ '*.js' ],
                dest: options.src.vendor + '/slimbox2/js/'
            },
            { // #2 - 1/2
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/slimbox2/css/',
                src: [ '*.gif' ],
                dest: options.src.vendor + '/slimbox2/images/'
            },
            { // #3 - 2/2
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/slimbox2/css/',
                src: [ '*.gif' ],
                dest: options.build.image
            }
        ]
    };

    return thisTarget;
};
