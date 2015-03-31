module.exports = function (grunt, options) {

    'use strict';
    // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js
    grunt.util.linefeed = '\n';

    var clean = {
        options: {
            force:true,
        },
        buildHtml         : { src: [ options.build.path      + '/*.html' ] },
        buildCss          : { src: [ options.build.css       + '/**/*'   ] },
        buildJs           : { src: [ options.build.js        + '/**/*'   ] },
        buildImage        : { src: [ options.build.image     + '/**/*'   ] },
        buildFont         : { src: [ options.build.font      + '/**/*'   ] },
        buildIncludes     : { src: [ options.build.include   + '/**/*'   ] },
        distHtml          : { src: [ options.dist.path       + '/*.html' ] },
        distCss           : { src: [ options.dist.css        + '/**/*'   ] },
        distJs            : { src: [ options.dist.js         + '/**/*'   ] },
        distImage         : { src: [ options.dist.image      + '/**/*'   ] },
        distFont          : { src: [ options.dist.font       + '/**/*'   ] },
        distIncludeFolder : { src: [ options.dist.include    + '/**/*'   ] },
        wpImage           : { src: [ options.wordpress.image + '/**/*'   ] },
        wpFont            : { src: [ options.wordpress.font  + '/**/*'   ] },
        wpCss             : { src: [ options.wordpress.css   + '/**/*'   ] },
        wpJs              : { src: [ options.wordpress.js    + '/**/*'   ] },
    };

    return clean;
};