module.exports = function ( grunt ) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    /*         NOTE
        ┌───┬──■■■■─────────────────────────────────────────────────────────────────────────────────────────────────────┐
        │   ├─ Just return key pair value, this data will be added back in gruntfile object notation construction       │
        │   └─ hence, no need anonymous self invoking function here because we will load module instead                 │
        │    ─ Module reference: http://nodejs.org/docs/v0.3.2/api/modules.html                                         │
        │    ─ (closure phenomenon - preserves local scope when otherwise with an added ability of using function)      │
        └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    */

    var
        dist    = '_dest',
        js      = dist + '/js',
        css     = dist + '/css',
        font    = dist + '/fonts',
        image   = dist + '/images',
        include = dist + '/include';

    return {
        // key  : value
        dist    : dist,
        js      : js,
        css     : css,
        font    : font,
        image   : image,
        include : include
    };
};