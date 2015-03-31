module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var exec = {
        // helloSimpson: require('./targets/exec/helloSimpson.js')(grunt, options),
        gruntVersion: require('./targets/exec/gruntVersion.js')(grunt, options),
        checkBowerPackages:  require('./targets/exec/checkBowerPackages.js')(grunt, options),
    };

    return exec;
};
