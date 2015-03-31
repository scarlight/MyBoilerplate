module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        files: [
            { // #1
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/superfish/dist/js/',
                src: [ 'superfish.min.js', 'supersubs.js' ],
                dest: options.src.vendor + '/superfish/'
            }
        ]
    };

    return thisTarget;
};
