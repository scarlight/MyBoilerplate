module.exports = function (grunt, options) {

    'use strict';

    // return object
    var thisTarget = {
        files: [
            {
                expand: true,
                nonull: true,
                cwd: options.src.include + '/',
                src: [ '**/*', '!kiv/**' ],
                dest: options.build.include
            },
            {
                expand: true,
                nonull: true,
                cwd: options.src.include + '/',
                src: [ '**/*', '!kiv/**' ],
                dest: options.dest.include
            },
        ]
    };

    return thisTarget;
};
