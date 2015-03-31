module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var concat = {

        options: {
            separator: grunt.util.linefeed + ';',
            stripBanners: false,
            nonull: true,
        },

        vendorLibrary: require('./targets/concat/vendorLibrary.js')(grunt, options)

    };

    return concat;
};

