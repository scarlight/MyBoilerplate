module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        options: {
            jshintrc: options.src.grunt + '/.jshintrc'
        },
        src:
        [
            './Gruntfile.js',
            options.src.grunt + '/**/*.js'
        ]
    };

    return thisTarget;
};
