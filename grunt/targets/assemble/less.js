module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        options:{
            ext: '.less',
        },
        files: [
            {
                expand: true,
                nonull: true,
                flatten: true,
                cwd: options.hbs.page + '/less/',
                src: [ 'lessConfig.hbs' ],
                dest: options.src.lessOwn
            }
        ]
    };

    return thisTarget;
};
