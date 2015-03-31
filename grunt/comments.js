module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var comments = {

        includePHP: require('./targets/comments/includePHP.js')(grunt, options)  //remove comments from the php files

    };

    return comments;
};
