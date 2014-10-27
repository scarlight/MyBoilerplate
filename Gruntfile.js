module.exports = function(grunt) {

    'use strict';
    grunt.util.linefeed = '\n';       // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // + add grunt include for html building
    // -> find a way using grunt to remove all php & html comment block when pushed as production code (wordpress)

    require( 'time-grunt' )( grunt ); // measures the time each task takes

    var path = require('path');

    require('load-grunt-config')( grunt, {
        /*
            # path to task.js files, defaults to grunt dir.
            # 'configPath' accepts a single path, we can have each task.js to require for their target from the targets folder
            # NOTE: each task.js files actually returns its target:value back to Grunt
        */
        configPath      : path.join(process.cwd(), 'grunt'),
        init            : true,                              // do auto grunt.initConfig
        data            : {                                  // data passed into config.
            bowerrc     : grunt.file.readJSON( '.bowerrc' ),
            banner      : '/*! <%= package.name %> - v<%= package.version %> - ' +
                          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                          '<%= package.homepage ? "* " + package.homepage + "\\n" : "\\n*/\\n" %>' +
                          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= package.author.name %>' +
                          '<%= package.license ? "\\n* Licensed under" + package.license + "( " + package.license.url + " ) */\\n" : "\\n*/\\n" %>',
            nodeModule  : 'node_modules',
            /*
                # we must provide key pair value therefore we can use anonymous self invoking function to return it.
                # (closure phenomenon - preserves local scope when otherwise with an added ability of using function)
            */
            src : (function(){ // this paths are also suitable for source control.
                var
                    grunt   = 'grunt',
                    dev     = '_',
                    html    = dev  + '/html',
                    font    = dev  + '/font',
                    image   = dev  + '/image',
                    js      = dev  + '/js',
                    less    = dev  + '/less',
                    lessOwn = less + '/own',
                    include = dev  + '/include',
                    vendor  = dev  + '/vendors', // like a christmas tree, you just grab the value for use!

                    hbs = (function(){            // we going to use handlebar.js with assemble to compile html
                        var path = dev  + '/hbs';
                        return {
                            path    : path,
                            data    : path + '/data',
                            layout  : path + '/layout',
                            page    : path + '/page',
                            partial : path + '/partial',
                            helper  : path + '/helper',
                            less    : path + '/less'
                        };
                    })();

                return {
                     // key : value
                    grunt   : grunt,
                    dev     : dev,
                    html    : html,
                    font    : font,
                    image   : image,
                    js      : js,
                    less    : less,
                    lessOwn : lessOwn,
                    include : include,
                    vendor  : vendor,
                    hbs     : hbs
                };
            })(),

            build : (function(){ // for debug and build processing for distribution folder.
                var
                    path    = '_build',
                    js      = path + '/js',
                    css     = path + '/css',
                    font    = path + '/fonts',
                    image   = path + '/images';

                return {
                    // key : value
                    path   : path,
                    js     : js,
                    css    : css,
                    font   : font,
                    image  : image
                };
            })(),

            dest : (function(){ // for distribution a.k.a production files.
                var
                    dist    = '_dest',
                    js      = dist + '/js',
                    css     = dist + '/css',
                    font    = dist + '/fonts',
                    image   = dist + '/images';

                return {
                    // key : value
                    dist   : dist,
                    js     : js,
                    css    : css,
                    font   : font,
                    image  : image,
                };
            })(),

            wordpress   : (function(){ // we going to use the same src files for wordpress development
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
            })(),

            assemblePagesTarget: {} // an assemble container for my workaround
        },

        /*
            can optionally pass options to load-grunt-tasks/ jit-grunt. If set false,
            it will disable auto loading tasks. (Use jit for slight performance boost)
        */
        jitGrunt: {
            assemble: 'assemble'
        },

        postProcess: function(config) {} //can post process config object before it gets passed to grunt
    });

};
