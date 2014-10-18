module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var assemble = {
        options: { // optionally add a target level option to override task option
            data    : [ options.hbs.data + '/*.{yml,yaml,json}' ],
            helpers : [ options.hbs.helper + '/**/*.js' ],
            partials: [ options.hbs.partial + '/**/*.hbs' ],
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
        site: require('./targets/assemble/site.js')(grunt, options),
        less: require('./targets/assemble/less.js')(grunt, options)
    };

    return assemble;
};
