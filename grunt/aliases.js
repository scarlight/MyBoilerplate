module.exports = function(grunt, options){

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var chalk = require('chalk');
    var wordpressOutput = false;

    /* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
       | # We shall auto generate a list of all the vendor targets for copy plugin, thus                               |
       |   minimizing labour, risk of typo & being human forgetting to add any new vendors.                            |
       | # Target name is the file name of the target ( recycling as much as possible )                                |
       ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */

    // return as task array
    var vendorLibrary = [
        // 'exec:gruntVersion',
        // 'exec:checkBowerPackages',
    ];
    grunt.file.recurse('grunt/targets/copy/vendors', function(abspath, rootdir, subdir, filename){
        var targetName = filename.replace('.js', '');
        vendorLibrary.push('copy:'+targetName);
    });
    // add additional task after 'copy' task
    vendorLibrary.push('concat');
    vendorLibrary.push('assemble:lessConfig');

    /*                                                      NOTE
       ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
       | # grunt.registerTask can be added here however by just returning                                              |
       |   key:value object, load-grunt-config will do it for us automatically.                                        |
       | # Unless you need something custom and not auto-generated                                                     |
       ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */

    return {
        'default'                  : 'watch',
        'prep'                     : vendorLibrary, // Skip this from watch option.atBegin, since it will prep everytime I toggle the watch
        // 'bankai'                : [  ], use 2 concurrent target array to complete faster
    };
};
