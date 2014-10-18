module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        files: [
            {
                expand: true,
                flatten: true,
                src: options.build.image + '/**/*.{png,jpg,jpeg,gif,webp,svg}',
                dest: options.dest.image
            }
        ]
    };

    return thisTarget;
};
