module.exports = function (grunt, options) {

    'use strict';
    // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js
    grunt.util.linefeed = '\n';

    var concurrent = {
        srcCompiling: [ 'less', 'javascript-concat' ],
        srcMinification: [ 'cssmin', 'ungligy' ],
        srcHinting: [ 'jshint:development', 'notify:jsFileDevelopment' ],
        notifyCompletion: [ 'notify:cssmin', 'notify:lessFile' ]
    };

    return concurrent;
};
