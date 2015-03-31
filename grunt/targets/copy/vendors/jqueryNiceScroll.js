module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        files: [
            { // #1
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/jquery.nicescroll/',
                src: [ 'jquery.nicescroll.min.js' ],
                dest: options.src.vendor + '/jquery.nicescroll/'
            }
        ]
    };

    return thisTarget;
};
