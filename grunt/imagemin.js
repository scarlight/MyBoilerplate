module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var imagemin = {

        minImages: require('./targets/imagemin/minImages.js')(grunt, options)  //send to dist folder

    };

    return imagemin;
};
