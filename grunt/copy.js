module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

/*      NOTE
    ┌───■■■■────────────────────────────────────────────────────────────────────────────────────────────────────────┐
    │   ┌─ Building the files object dynamically: you cannot group the option files:[{expand: true, nonull: true}]  │
    │   └─ outside the files array as it wont work that way.                                                        │
    │    ─ REFER: http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically                        │
    └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
*/  // return as object
    var copy = {};
/*
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
    │    ─ Skip manually declaring like other task. Its alot to declare manually.                                   │
    │   ┌─ We shall auto generate a list of all the vendor targets for copy plugin, thus minimizing labour,         │
    │   └─ risk of typo & being human forgetting to add any new vendors.                                            │
    │    ─ Target name is the file name of the target ( recycling as much as possible )                             │
    └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
*/  grunt.file.recurse( 'grunt/targets/copy/vendors', function(abspath, rootdir, subdir, filename ) {
        var targetPath = abspath.replace(/(^grunt)/gmi, '.');  // expected path ./targets/copy/vendor/$.js
        var targetName = filename.replace('.js', '');
              // target : value
       copy[targetName] = require(targetPath)(grunt, options);
    });

/*
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
    │    ─ Other custom tasks                                                                                       │
    │    ─ Now automatically add other copy:target from the 'custom' folder to be appended to this return object.   │
    └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
*/  grunt.file.recurse( 'grunt/targets/copy/custom', function(abspath, rootdir, subdir, filename ) {
        var targetPath = abspath.replace(/(^grunt)/gmi, '.'); // expected path ./targets/copy/custom/$.js
        var targetName = filename.replace('.js', '');
               // target : value
        copy[targetName] = require(targetPath)(grunt, options);
    });
/*
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
    │    ─ Wordpress related tasks                                                                                  │
    │    ─ Now automatically add other copy:target from the 'custom' folder to be appended to this return object.   │
    └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
*/  if( options.wordpress.output ) {

        grunt.file.recurse( 'grunt/targets/copy/wordpress', function(abspath, rootdir, subdir, filename ) {
            var targetPath = abspath.replace(/(^grunt)/gmi, '.'); // expected path ./targets/copy/wordpress/$.js
            var targetName = filename.replace('.js', '');
                   // target : value
            copy[targetName] = require(targetPath)(grunt, options);
        });

    }

/*   TODOS
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
    │    ─ add csspie                                                                                               │
    │    ─ add modernizer                                                                                           │
    │    ─ add more of the crossbrowser helper js                                                                   │
    │    ─ should try https://github.com/alvarotrigo/fullPage.js also available from bower when search scroll       │
    │    ─ should try http://imakewebthings.com/jquery-waypoints/#shortcuts-examples                                │
    └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
*/  return copy;
};
