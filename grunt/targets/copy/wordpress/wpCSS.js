module.exports = function (grunt, options) {

    'use strict';

    // return object
    var thisTarget = {
        files: [
            {
                expand: true,
                nonull: true,
                cwd: options.dist.css + '/',
                src: [ '*.css' ],
                dest: options.wordpress.css
            }
        ]
    };

    return thisTarget;
};
