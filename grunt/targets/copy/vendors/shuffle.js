module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        files: [
            { // #1
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/shufflejs/dist/',
                src: [ 'jquery.shuffle.min.js' ],
                dest: options.src.vendor + '/shufflejs/'
            }
        ]
    };

    return thisTarget;
};
