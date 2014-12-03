module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        src:
        [
            options.src.js + '/*.js',
      '!' + options.src.js + '/lib.js',
      '!' + options.src.js + '/modernizr.js'
        ]
    };

    return thisTarget;
};
