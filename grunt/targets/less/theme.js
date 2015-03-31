module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        options: {
            path:
            [
                options.src.lessImport + '/',
            ],
            strictMath: true,
            dumpLineNumbers: 'comments'
        },
        files: [
            {
                expand: true,
                ext: '.css',
                extDot: 'first',
                flatten: true,
                src: options.src.less + '/theme.less',
                dest: options.build.css
            }
        ]
    };

    return thisTarget;
};
