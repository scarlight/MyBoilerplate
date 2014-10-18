module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var jshint = {

        // all javascript file should adhere to this hint file standard except 'gruntFiles' that will override in its target level
        options: {
            jshintrc: options.src.js + '/.jshintrc',
            reporter: require( 'jshint-stylish' )
        },
        jsSrc: require('./targets/jshint/jsSrc.js')(grunt, options), // do jshint on project $.js
        gruntFiles: require('./targets/jshint/gruntFiles.js')(grunt, options) // do jshint on Gruntfile.js & every JS file in grunt folder

    };

    return jshint;
};
