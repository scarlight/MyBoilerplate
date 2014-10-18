module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        files: [
            { // #1
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/font-awesome/css/',
                src: [ '*.min.css' ],
                dest: options.src.vendor + '/font-awesome/css/'
            },
            { // #2 - 1/4
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/font-awesome/fonts/',
                src: [ '*' ],
                dest: options.src.vendor + '/font-awesome/fonts/'
            },
            { // #3 - 2/4
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/font-awesome/fonts/',
                src: [ '*' ],
                dest: options.src.font
            },
            { // #4 - 3/4
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/font-awesome/fonts/',
                src: [ '*' ],
                dest: options.build.font
            },
            { // #4 - 4/4
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/font-awesome/fonts/',
                src: [ '*' ],
                dest: options.dest.font
            }
        ]
    };

    return thisTarget;
};
