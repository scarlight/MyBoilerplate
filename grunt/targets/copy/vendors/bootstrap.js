module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        files: [
            { // #1
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/bootstrap/less/',
                /*
                    includes files within path and its sub-directories
                 */
                src: [ '**' ],
                dest: options.src.vendor + '/bootstrap/less/'
            },
            { // #2
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/bootstrap/dist/js/',
                /*
                    keep 'src' to files & folder match as any path in 'src' will auto expand in 'dest',
                    but declaring directly in 'dest' is clearer & gives alternative path structure
                */
                src: [ '*.min.js' ],
                dest: options.src.vendor + '/bootstrap/js/'
            },
            { // #3 - 1/4
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/bootstrap/dist/fonts/',
                src: [ '*' ],
                dest: options.src.vendor + '/bootstrap/fonts/'
            },
            { // #4 - 2/4
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/bootstrap/dist/fonts/',
                src: [ '*' ],
                dest: options.src.font
            },
            {  // #5 - 3/4
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/bootstrap/dist/fonts/',
                src: [ '*' ],
                dest: options.build.font
            },
            {  // #6 - 4/4
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/bootstrap/dist/fonts/',
                src: [ '*' ],
                dest: options.dest.font
            }
        ]
    };

    return thisTarget;
};
