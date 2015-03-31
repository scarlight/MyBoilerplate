module.exports = function (grunt, options) {

    'use strict';

    // return object
    var thisTarget = {
        files: [
            {
                expand: true,
                nonull: true,
                cwd: options.src.font + '/',
                src: [ '*' ],
                dest: options.wordpress.font
            }
        ]
    };

    return thisTarget;
};
