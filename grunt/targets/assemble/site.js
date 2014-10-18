module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        files: [
            {
                expand: true,
                nonull: true,
                flatten: true,
                cwd: options.hbs.page + '/',
                src: [ '**/*.hbs', '!less/*.hbs' ],
                dest: options.src.html
            }
        ]
    };

    return thisTarget;
};
