module.exports = function (grunt, options) {

    'use strict';

    // return object
    var thisTarget = {
        files: [
            {
                expand: true,
                nonull: true,
                cwd: options.src.vendor + '/modernizr/',
                src: [ 'modernizr.js' ],
                dest: options.src.js
            },
        ]
    };

    return thisTarget;
};