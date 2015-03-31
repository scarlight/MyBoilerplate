module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var htmlmin = {

        html: require('./targets/htmlmin/html.js')(grunt, options),

    };

    return htmlmin;
};
