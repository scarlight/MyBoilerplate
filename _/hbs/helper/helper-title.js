module.exports.register = function (Handlebars, options, parameters) {
    Handlebars.registerHelper('title', function (){
        /*var output = '';
        for (var property in this.currentpage) {
            output += property + ': ' + this.currentpage[property]+'; \n';
        }
        return output;*/
        /*var start = "***************************************************************************Start of console.log***************************************************************************";
        var end = "***************************************************************************End of console.log***************************************************************************";
        console.log(start, this, end);*/

        // its complicated to change string to do obj notation : http://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
        if( 'index' === this.yfm.slug ){
            return this.settings.index.title;
        }
        else if( 'about-us' === this.yfm.slug ){
            return this.settings.about.title;
        }
        else {
            return this.settings.defaultTitle;
        }
    });
};
