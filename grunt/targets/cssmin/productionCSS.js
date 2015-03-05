module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        options: {
            /*
                skip below, its for CSS only, 'usebanner' plugin is better
                (good for any file, manage any banners from single place)
            */
            // banner: '<%= banner %>',
            keepSpecialComments: 0,
            report: 'min'
        },
        files: [
            {
                expand: true,
                ext: '.min.css',
                extDot: 'first',
                flatten: true,
                src:
                [
                    options.build.css + '/*.css'
                ],
                dest: options.dist.css
            }
        ]
    };

    return thisTarget;
};
