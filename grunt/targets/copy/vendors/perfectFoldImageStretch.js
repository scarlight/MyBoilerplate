module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        files: [
            { // #1
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/perfect-fold-image-stretch/',
                src: [ 'perfect.fold.1.2.1.js' ],
                dest: options.src.vendor + '/perfect-fold-image-stretch/'
            }
        ]
    };

    return thisTarget;
};
