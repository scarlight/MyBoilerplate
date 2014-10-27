module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    /*
        removed newer:{option:{override:...}}} (https://github.com/tschaub/grunt-newer/pull/35)
        wanted less to re-compile when import file is newer, but it compiles everything and takes up to 3 sec to complete before a livereload
    */
    var less = {

        build: require('./targets/less/build.js')(grunt, options),

    };

    return less;
};
