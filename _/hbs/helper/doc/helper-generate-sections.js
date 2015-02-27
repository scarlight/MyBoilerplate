module.exports.register = function (Handlebars, options, parameters) {
    Handlebars.registerHelper('docGenerateSections', function ( handlebarOption ){
        var html = '';
        for (var i = 0; i < handlebarOption.sections.length; i++) {

            html += '<section id="' + handlebarOption.sections[i].anchorID + '">' +
                    '{{>' + handlebarOption.sections[i].sectionPartial + ' ~}}' +
                    '</section>';
        }

        return html;
    });
};
