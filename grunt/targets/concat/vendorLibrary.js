module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    var vendorLibrary =
    [
        // options.src.vendor + '/jquery/jquery.min.js',
        // options.src.vendor + '/jquery.easing/jquery.easing.min.js',
        // options.src.vendor + '/bootstrap/js/bootstrap.min.js',
        // options.src.vendor + '/bootstrap-select/bootstrap-select.min.js',
        // options.src.vendor + '/carouFredSel/helper-plugins/jquery.ba-throttle-debounce.min.js',
        // options.src.vendor + '/carouFredSel/helper-plugins/jquery.mousewheel.min.js', // malihu custom scroller also has this, so toggle when needed
        // options.src.vendor + '/carouFredSel/helper-plugins/jquery.touchSwipe.min.js',
        // options.src.vendor + '/carouFredSel/helper-plugins/jquery.transit.min.js',
        // options.src.vendor + '/carouFredSel/jquery.carouFredSel-6.2.1-packed.js',
        // options.src.vendor + '/greensock/TweenMax.min.js',
        // options.src.vendor + '/jquery.scrollTo/jquery.scrollTo.min.js',
        // options.src.vendor + '/jquery-cycle2/jquery.cycle2.min.js',
        // options.src.vendor + '/jquery-hoverIntent/jquery.hoverIntent.js',
        // options.src.vendor + '/superfish/supersubs.js',
        // options.src.vendor + '/superfish/superfish.min.js',
        // options.src.vendor + '/malihu-custom-scrollbar/js/jquery.mCustomScrollbar.concat.min.js',
        // options.src.vendor + '/pajinate/jquery.pajinate.min.js',
        // options.src.vendor + '/perfect-fold-image-stretch/perfect.fold.1.2.1.js',
        // options.src.vendor + '/slimbox2/js/slimbox2.js',
        // options.src.vendor + '/spinjs/spin.js',
        // options.src.vendor + '/jquery-disablescroll/jquery.disablescroll.min.js',
        // options.src.vendor + '/pace/pace.min.js', OBVIOUSLY LOAD THIS AS THE FIRST SCRIPT IN DOM.
        // options.src.vendor + '/shufflejs/jquery.shuffle.min.js',
        // options.src.vendor + '/jquery.nicescroll/jquery.nicescroll.min.js',
        // options.src.vendor + '/jquery-form/jquery.form.js', // for jquery.validation plugin to use the ajaxSubmit feature in this plugin
        // options.src.vendor + '/jquery.validation/jquery.validate.min.js',
        // options.src.vendor + '/jquery.validation/additional-methods.min.js',
        // options.src.vendor + '/google-code-prettify/prettify.js',
        // options.src.vendor + '/google-code-prettify/lang-css.js',
        // options.src.vendor + '/google-code-prettify/lang-basic.js',
        // options.src.vendor + '/google-code-prettify/lang-sql.js',
        // options.src.vendor + '/google-code-prettify/lang-wiki.js',
        // options.src.vendor + '/google-code-prettify/lang-yaml.js',
        // options.src.vendor + '/prism/prism.js',
        // options.src.vendor + '/prism/plugins/highlight-keywords/prism-highlight-keywords.min.js',
        // options.src.vendor + '/prism/plugins/line-highlight/prism-line-highlight.min.js', // prism-line-highlight.css
        // options.src.vendor + '/prism/plugins/line-numbers/prism-line-numbers.min.js', // get the css prism-line-numbers.css
        // options.src.vendor + '/prism/plugins/...more',
        // options.src.vendor + '/website-smoothscroll/credit.js',
        // Please add modernizr.js separately as the first script to load. It suppose to lay out what it has detected for subsequent usage.
    ];

    // return object
    var thisTarget = {
        src: vendorLibrary,
        dest: options.src.js + '/lib.js'
    };

    return thisTarget;
};
