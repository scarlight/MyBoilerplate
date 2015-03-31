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
        theGrunt    = 'grunt',
        dev         = '_',
        html        = dev  + '/html',
        font        = dev  + '/font',
        image       = dev  + '/image',
        js          = dev  + '/js',
        less        = dev  + '/less',
        lessImport  = less + '/include',
        include     = dev  + '/include',
        vendor      = dev  + '/vendors', // like a christmas tree, you just grab the value for use!

        path        = dev  + '/hbs',
        hbs         = {                  // we going to use handlebar.js with assemble to compile html
            path    : path,
            data    : path + '/data',
            layout  : path + '/layout',
            page    : path + '/page',
            partial : path + '/partial',
            helper  : path + '/helper',
            less    : path + '/less'
        };

    return {
        // key     : value
        grunt      : theGrunt,
        dev        : dev,
        html       : html,
        font       : font,
        image      : image,
        js         : js,
        less       : less,
        lessImport : lessImport,
        include    : include,
        vendor     : vendor,
        hbs        : hbs
    };

};