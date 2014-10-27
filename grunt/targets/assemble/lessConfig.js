module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        options:{
            ext: '.less',
            postprocess: function(src) {
                return require('js-prettify').css(src, {
                    /* jshint ignore:start */
                    'indent_char': '',
                    'indent_level': 0
                    /* jshint ignore:end */
                });
            }
        },
        files: [
            {
                expand: true,
                nonull: true,
                flatten: true,
                cwd: options.src.hbs.less + '/',
                src: [ 'lessConfig.hbs' ],
                dest: options.src.lessOwn
            }
        ]
    };

    return thisTarget;
};