module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var cssmin = {

        productionCSS: require('./targets/cssmin/productionCSS.js')(grunt, options)

    };

    return cssmin;
};
