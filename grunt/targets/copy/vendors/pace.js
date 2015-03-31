module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        files: [
            { // #1
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/pace/',
                src: [ 'pace.min.js' ],
                dest: options.src.vendor + '/pace/'
            },
            { // #2
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/pace/',
                src: [ 'themes/**/*' ],
                dest: options.src.vendor + '/pace/'
            }
        ]
    };

    return thisTarget;
};
