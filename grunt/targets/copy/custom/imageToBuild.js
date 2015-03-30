module.exports = function (grunt, options) {

    'use strict';

    // return object
    var thisTarget = {
        files: [
            {
                expand: true,
                nonull: true,
                cwd: options.src.image + '/',
                src: [ '**/*' ],
                dest: options.build.image
            },
        ]
    };

    return thisTarget;
};
