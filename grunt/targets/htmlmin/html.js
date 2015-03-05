module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // dest:src object
    var distSrc = {};
    grunt.file.recurse(options.src.html, function(abspath, rootdir, subdir, filename){
        var src  = options.src.html + '/' + filename;
        var dist = options.dist.path + '/' + filename;

        distSrc[dist] = src; // reverse the file object src:dest
    });

    // return object
    var thisTarget = {

        options: {
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true
        },
        files: distSrc // support only 'destination': 'source' object format and array format is not working

    };

    return thisTarget;
};
