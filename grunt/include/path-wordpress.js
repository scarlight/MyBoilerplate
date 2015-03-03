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
        output    = false,
        website   = 'website_name',
        themename = 'theme_folder_name',
        path      = '../../../sites2/wordpress_area51/' + website + '/wp-content/themes/' + themename,
        js        = path + '/js',
        css       = path + '/css',
        font      = path + '/fonts',
        image     = path + '/images';

        return {
               // key : value
            output    : output,
            website   : website,
            themename : themename,
            path      : path,
            js        : js,
            css       : css,
            font      : font,
            image     : image
        };
};