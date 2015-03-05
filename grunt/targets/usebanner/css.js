module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        options: {
            position: 'top',
            banner: '<%= banner %>'
        },
        files: {
            src:
            [
                options.dist.css + '/*.css'
            ]
        }
    };

    return thisTarget;
};
