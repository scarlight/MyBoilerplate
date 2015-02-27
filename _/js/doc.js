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

cs(document).ready(function(){

    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);
    // code goes here when document is ready

    var documentation = {

        nav: function(){
            var
                       link = cs('#doc-nav-wrp'),
                     link_a = link.find('a');
              link_a_length = link_a.length;
                    content = cs('#doc-body'),
                    sidebar = cs('#doc-sidebar-wrp'),
             sidebar_height = '',
            content_section = [];

            if( link.length > 0 )
            {
                link_a.on( 'click', function(e) {
                    e.preventDefault();
                    cs(window).scrollTo( cs(this).attr('href'), 500, { easing:'easeInOutCubic', axis:'y'} );
                    link_a.removeClass('current');
                    cs(this).addClass('current');
                });

                link_a.each( function(index) {
                    if( index === 0 ){
                        // first anchor add 'current' class
                        cs(this).addClass('current');
                        cs(window).scrollTo( cs(this).attr('href'), 500, { easing:'easeInOutCubic', axis:'y'} );
                    }

                    content_section[index] = cs(cs(this).attr('href'));
                });

                this._setNavHeight();
            }
        },

        _setNavHeight: function(){
            sidebar_height = sidebar.outerHeight();

            for (var i = content_section.length - 1; i >= 0; i--) {
                var section = content_section[i];

                if(section.outerHeight() < sidebar_height){
                    section.height(sidebar_height);
                }
            }
        },

        windowResize: function(){
            var im = this;
            function resized(){
                im._setNavHeight();
                clearTimeout(resizing);
            }

            var resizing;
            cs(window).on('resize', function(){
                clearTimeout(resizing);
                resizing = setTimeout(resized, 100);
            });
        },

        windowOnLoad: function(){
            cs(window).load(function(){

            });
        },

        init: function(){
            this.nav();
            this.windowResize();
            this.windowOnLoad();
        },
    };

    documentation.init();
});