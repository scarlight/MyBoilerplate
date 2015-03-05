module.exports = function (grunt, options) {

    'use strict';

    // return object
    var thisTarget = {
        files: [
            {
                expand: true,
                nonull: true,
                cwd: options.dist.js + '/',
                src: [ '*.js' ],
                dest: options.wordpress.js
            }
        ]
    };

    return thisTarget;
};
