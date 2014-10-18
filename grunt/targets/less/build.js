module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var theLessFile =
    [
        options.src.less + '/*.less',
        options.src.less + '/theme.less'
    ];

    // return object
    var thisTarget = {
        options: {
            path:
            [
                options.src.less + '/bootstrap/less',
                options.src.lessOwn
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
                src: theLessFile,
                dest: options.build.css
            }
        ]
    };

    return thisTarget;
};
