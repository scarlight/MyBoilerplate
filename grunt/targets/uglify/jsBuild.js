module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        options: {
            preserveComments: 'all',
            mangle: false,
            compress: true,
            beautify: false,
            report: 'min'
        },
        files: [
            {
                expand: true,
                ext: '.min.js',
                extDot: 'first',
                flatten: true,
                src: options.build.js + '/*.js',
                dest: options.dist.js
            }
        ]
    };

    return thisTarget;
};
