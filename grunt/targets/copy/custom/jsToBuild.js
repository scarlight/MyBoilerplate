module.exports = function (grunt, options) {

    'use strict';

    // return object
    var thisTarget = {
        files: [
            {
                expand: true,
                nonull: true,
                cwd: options.src.js + '/',
                src: [ '**/*.js', '**/*.js.map', '!_kiv/**' ],
                dest: options.build.js
            },
        ]
    };

    return thisTarget;
};
