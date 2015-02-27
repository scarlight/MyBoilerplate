module.exports.register = function (Handlebars, options, parameters) {
    Handlebars.registerHelper('showAnatomy', function ( options ){
        return '<pre class="line-numbers"><code class="language-markup">' + options.fn(this) + '</code></pre>';
    });
};
