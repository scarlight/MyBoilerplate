module.exports = function (grunt, options) {

    'use strict';

    // return object
    var thisTarget = {
        files: [
            {
                expand: true,
                nonull: true,
                cwd: options.src.html + '/',
                src: [ '*.html' ],
                dest: options.build.path
            },
        ]
    };

    return thisTarget;
};
