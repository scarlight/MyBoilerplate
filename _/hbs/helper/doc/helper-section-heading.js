/**
 * ---
 * yfm:
 *     slug  : lowercase_slug
 *     title : Lorem Ipsum
 *     desc  : |
 *         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci reiciendis ratione officia alias velit culpa!
 * ---
 * Handlebar example:
 * {{{ sectionHeading partial_filename.yfm.title partial_filename.yfm.desc }}}
 */
module.exports.register = function (Handlebars, options, parameters) {
    Handlebars.registerHelper('sectionHeading', function ( title, desc ){
        var html = '<div class="page-header">' +
                       '<h2>' +
                            title +
                       '</h2>' +
                       '<hr>' +
                   '</div>' +
                   '<p>' +
                        desc +
                  '</p>';
        return html;
    });
};
