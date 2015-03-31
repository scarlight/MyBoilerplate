module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        files: [
            { // #1
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/prism/',
                src: [ 'prism.js' ],
                dest: options.src.vendor + '/prism/'
            },
            { // #2
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/prism/plugins/',
                src: [ '**/*' ],
                dest: options.src.vendor + '/prism/plugins/'
            },
            { // #3
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/prism/themes/',
                src: [ '**/*' ],
                dest: options.src.vendor + '/prism/themes/'
            }
        ]
    };

    return thisTarget;
};