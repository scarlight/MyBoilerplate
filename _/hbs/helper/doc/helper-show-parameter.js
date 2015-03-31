/**
 *
 *  EG:
    ---
    yfm:
        name: SHORTCODE NAME
        multiEnclosed: true/false
        desc: SHORTCODE DESCRIPTION
        shortcode:
        -
            structure: '[prefix_shortcode attributeOne="Lorem" attributeTwo="ipsum"]'
            parameter:
            -
                attr: attributeOne
                value: text/numeric/range/alphabet/alphanumeric
                desc: "ATTRIBUTES DESCRIPTION"
            -
                attr: attributeTwo
                value: text/numeric/range/alphabet/alphanumeric
                desc: "ATTRIBUTES DESCRIPTION"
        sample: refer to above shortcode structure/ SHOW ACTUAL SHORTCODE SAMPLE
    ---

    {{> shortcode_info SHORTCODE_FILE_NAME.yfm ~}} {{!-- partials can accept a second parameter, but thats about it --}}
 */
module.exports.register = function (Handlebars, options, parameters) {
    Handlebars.registerHelper('showParameter', function ( context, handlebarOption ){

        if( context != 'none' ){
            var
                tableStart = '<table class="table doc-table-parameter">',
                tableEnd = '</table>',
                rowHead =  '<tr>' +
                               '<th class="attribute"><span>Attribute</span></th>' +
                               '<th class="value"><span>Value</span></th>' +
                               '<th class="description"><span>Description</span></th>' +
                           '</tr>',
                rowValueStart = '<tr>', rowValueEnd = '</tr>', rowConstruct = rowHead, output = '';

            for (var i = 0; i < context.length; i++) {
                var list = context[i], col = rowValueStart;
                for (var key in list)
                {
                    if( key == 'attr' ) {
                        col += '<td class="attribute"><span> ' + list[key] + ' </span></td>';
                    }
                    else if( key == 'value' ) {
                        col += '<td class="value"><span>' + list[key] + '</span></td>';
                    }
                    else if( key == 'desc' ) {
                        col += '<td class="description">' + list[key] + '</td>';
                    }
                }
                col += rowValueEnd;
                rowConstruct += col;
            }

            output += tableStart + rowConstruct + tableEnd;

            return output;
        }
        else
        {
            return '<pre> none </pre>';
        }
    });
};
