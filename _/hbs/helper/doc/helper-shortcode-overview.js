module.exports.register = function (Handlebars, options, parameters) {
    Handlebars.registerHelper('shortcodeOverview', function ( shortcode, multiEnclosed, desc ){

        var type = multiEnclosed;
        if ( multiEnclosed )
        {
            type = 'Multi Enclosed Content';
        }
        else if( multiEnclosed == false )
        {
            type = 'Non-enclosed content';
        }

        var html = '<table class="doc-table-shortcode">' +
                        '<tr>' +
                            '<td rowspan="2"><h3>' + shortcode + '</h3></td>' +
                            '<td><span>Type</span></td>' +
                            '<td><span>Description</span></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td><em>' + type + '</em></td>' +
                            '<td><em>' + desc + '</em></td>' +
                        '</tr>' +
                    '</table><br>';
        return html;
    });
};
