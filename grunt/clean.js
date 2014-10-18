module.exports = function (grunt, options) {

    'use strict';
    // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js
    grunt.util.linefeed = '\n';

    var clean = {
        removeNodeModules : {
            src: [
                      options.nodeModule + '/**/*',
                '!' + options.nodeModule + '/grunt',
                '!' + options.nodeModule + '/load-grunt-config',
                '!' + options.nodeModule + '/grunt-contrib-clean',
            ]
        }
    };

    return clean;
};
