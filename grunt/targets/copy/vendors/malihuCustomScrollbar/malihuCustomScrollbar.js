module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    /*
        might need to manually add a wrapper function for jquery no conflict to work
        for plugin examples usages download the package from https://github.com/malihu/malihu-custom-scrollbar-plugin/archive/master.zip
    */

    // return object
    var thisTarget = {
        files: [
            { // #1
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/malihu-custom-scrollbar-plugin/',
                src: [ 'jquery.mCustomScrollbar.concat.min.js' ],
                dest: options.src.vendor + '/malihu-custom-scrollbar/js/'
            },
            { // #2 - 1/2
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/malihu-custom-scrollbar-plugin/',
                src: [ 'mCSB_buttons.png' ],
                dest: options.src.vendor + '/malihu-custom-scrollbar/images/'
            },
            { // #3 - 2/2
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/malihu-custom-scrollbar-plugin/',
                src: [ 'mCSB_buttons.png' ],
                dest: options.build.image
            }
        ]
    };

    return thisTarget;
};
