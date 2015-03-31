module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var usebanner = {

        css: require('./targets/usebanner/css.js')(grunt, options)

    };

    return usebanner;
};
