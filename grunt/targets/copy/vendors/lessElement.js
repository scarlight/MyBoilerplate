module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        files: [
            { // #1
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/less-elements/',
                src: [ '*.less' ],
                dest: options.src.vendor + '/less-elements/'
            }
        ]
    };

    return thisTarget;
};
