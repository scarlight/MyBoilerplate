module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var assemble = {
        options: { // optionally add a target level option to override task option
            data    : [ options.src.hbs.data + '/*.{yml,yaml,json}' ],
            helpers : [ options.src.hbs.helper + '/**/*.js' ],
            partials: [ options.src.hbs.partial + '/**/*.hbs' ],
            ext     : '.html',
            engine  : 'handlebars',
            postprocess: function(src) { //refer: https://github.com/assemble/assemble/commit/6c564b68796e2cf2f7704e7e6373df760d1079aa
                return require('js-prettify').html(src, {
                    /* refer: http://www.jshint.com/docs/ */
                    /* jshint ignore:start */
                    'indent_inner_html'     : false,
                    'indent_size'           : 4,
                    'indent_char'           : ' ',
                    'brace_style'           : 'collapse',
                    'indent_scripts'        : 'normal',
                    'wrap_line_length'      : 0,
                    'preserve_newlines'     : true,
                    'max_preserve_newlines' : 1,
                    'unformatted'           : [ 'a', 'code', 'pre', 'span' ],
                    'end_with_newline'      : false
                    /* jshint ignore:end */
                });
            }
        },
        lessConfig: require('./targets/assemble/lessConfig.js')(grunt, options),
        // more target to be added. See below.
    };

/* ┌─────────────────────── WORKAROUND : REFER https://github.com/assemble/assemble/issues/451 ───────────────────────┐
   ├───┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
   │   └─ Currently grunt-newer is not working as intended & all the pages are assembling when just one is modified.  │
   │   ┌─ So Im going to create A TARGET FOR EACH PAGE to be watched by 'watch plugin', therefore 'newer plugin' is   │
   │   └─ not needed for assemble anymore. EACH TARGET will be prefixed according site type. EG: mainSiteWhatPage     │
   │    ─ For partials, layout, helpers or data that has been changed, use sitePrefixAll to recompile everything.     │
   └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
*/ (function(){
    /*
        ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
        │   mainSite All - (data, layout, partial, helper) excluding page & less                                      │
        └─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    */  var sitePrefix = 'mainSite';
        var all = {
            files: [
                {
                    expand: true,
                    nonull: true,
                    flatten: true,
                    cwd: options.src.hbs.page + '/', // compile only page/**/*.hbs therefore avoid using '**/*' meaning ANY extension.
                    src: [ '**/*.hbs' ],
                    dest: options.src.html
                }
            ]
        };
        // a target for all page compilation
        assemble[sitePrefix+'All'] = all;
        // add to Gruntfile.js later use for watch.
        options.assemblePagesTarget[sitePrefix+'All'] = [
                                                            options.src.hbs.path + '/**/*',
                                                            '!' + options.src.hbs.page + '/**/*',
                                                            '!' + options.src.hbs.less + '/**/*'
                                                        ];

    /*
        ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
        │   mainSite - Each Page                                                                                      │
        └─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    */  grunt.file.recurse(options.src.hbs.page, function(abspath, rootdir, subdir, filename){
            // abspath  --- : _/hbs/page/about/about.hbs
            // rootdir  --- : _/hbs/page
            // subdir   --- : about
            // filename --- : about.hbs

            // lets make the target name a little better with camelCase style
            var str = subdir;
            var arr = str.split('');
            var camelCaseTarget = '';
            for (var i = 0; i < arr.length; i++) {
                if( i === 0){
                    camelCaseTarget += sitePrefix;
                    camelCaseTarget += arr[i].toUpperCase();
                }
                else {
                    camelCaseTarget += arr[i];
                }
            }

            var targetValue = {
                files: [
                    {
                        expand: true,
                        nonull: true,
                        flatten: true,
                        cwd: options.src.hbs.page + '/' + subdir + '/',
                        src: [ filename ],
                        dest: options.src.html
                    }
                ]
            };
            // an individual target for each respective page
            assemble[ camelCaseTarget ] = targetValue;
            // add to Gruntfile.js later use for watch
            options.assemblePagesTarget[ camelCaseTarget ] = options.src.hbs.page + '/' + subdir + '/' + filename;
        });
    })();

    return assemble;
};