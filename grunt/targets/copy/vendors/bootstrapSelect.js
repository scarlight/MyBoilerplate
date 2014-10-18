module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        files: [
            { // #1
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/bootstrap-select/dist/js/',
                src: [ '*.min.js' ],
                dest: options.src.vendor + '/bootstrap-select/js/'
            },
            { // #2
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/bootstrap-select/dist/css/',
                src: [ '*.min.css' ],
                dest: options.src.vendor + '/bootstrap-select/css/'
            },
            { // #3
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/bootstrap-select/less/',
                src: [ 'bootstrap-select.less' ],
                dest: options.src.vendor + '/bootstrap-select/less/'
            }
        ]
    };

    return thisTarget;
};
