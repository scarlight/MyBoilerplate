// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

var cs = jQuery.noConflict();
cs(document).ready(function() {
    var thisSite = {
        config: {
            theWindow: cs(window),
            mainNav: cs('#COMPANYNAME-nav-wrp .sf-menu'),
        },

        documentAgent: function()  {
            var doc = document.documentElement;
            doc.setAttribute('data-useragent', navigator.userAgent);
        },

        mainNav: function(){
            var im = this;
            im.config.mainNav.superfish({
                delay:         600,
                animation:     {height:'show'},
                speed:         'fast',
                cssArrows:     false
            }).supersubs({
                minWidth        : 10,
                maxWidth        : 25,
                extraWidth      : 1
            });
        },

        windowResize: function(){
            var im = this;
            im.config.theWindow.bind('resize', function() {

            });
        },

        windowOnLoad: function(){
            var im = this;
            im.config.theWindow.load(function(){

            });
        },

        init: function(){
            var im = this;
            try{
                this.documentAgent();
                this.mainNav();
                this.windowResize();
                this.windowOnLoad();
            }
            catch(err) {
                console.log(err);
            }
        },
    };

    thisSite.init();
});
