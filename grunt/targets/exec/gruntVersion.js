module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        cmd: function ()
        {
            return 'echo ' + this.version;
        }
    };

    return thisTarget;
};