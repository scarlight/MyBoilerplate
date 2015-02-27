module.exports.register = function (Handlebars, options, parameters) {
    Handlebars.registerHelper('footnoteCopyright', function () {
        if( 'documentation' === this.yfm.slug )
        {
            var d = new Date();
            var year = d.getFullYear();
            return 'Copyright <a class="txt-white" href="http:///www.richcodesign.com/" target="_blank">Rich Codesign</a> ' + year + '. All rights reserved.';
        }
    });
};
