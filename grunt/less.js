module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var less = {

        build: require('./targets/less/build.js')(grunt, options),

    };

    return less;
};
