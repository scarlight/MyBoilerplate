module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        files: [
            { // #1 - jquery.spin.js has some examples (bower_components)
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/spinjs/',
                src: [ 'spin.js' ],
                dest: options.src.vendor + '/spinjs/'
            }
        ]
    };

    return thisTarget;
};
