module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    /*
        to change the file content you need a unique target so that you can create a unique 'options' for it,
        also each file name must be hardcoded unless you dont care and just need all files to be processed
    */

    // return object
    var thisTarget = {
        options:
        {
            process: function ( content, srcpath )
            {
                return content.replace( /(url\((?!("|\s"|"\s)data\:image\/png\;base64))/gmi, 'url(../images/' );
            }
        },
        files: [
            { // #4
                expand: true,
                nonull: true,
                cwd: options.bowerrc.directory + '/malihu-custom-scrollbar-plugin/',
                src: [ 'jquery.mCustomScrollbar.css' ],
                dest: options.src.vendor + '/malihu-custom-scrollbar/css/'
            }
        ]
    };

    return thisTarget;
};
