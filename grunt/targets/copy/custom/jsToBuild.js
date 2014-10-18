module.exports = function (grunt, options) {

    'use strict';

    // return object
    var thisTarget = {
        files: [
            {
                expand: true,
                nonull: true,
                cwd: options.src.js + '/',
                src: [ '*.js' ],
                dest: options.build.js
            },
        ]
    };

    return thisTarget;
};
