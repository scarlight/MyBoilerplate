module.exports.register = function (Handlebars, options, parameters) {
    Handlebars.registerHelper('tsp1', function () {
        /**
         * @partial: {{ tsp1 }}
         * @result : [[tsp1]]

         */
        return '[[tsp1]] ';
    });
    Handlebars.registerHelper('tsp2', function (param1) {
        /**
         * @partial: {{ tsp2 "!!!!!!!!" }}
         * @result : [[tsp2]] !!!!!!!!

         */
        return '[[tsp2]] ' + param1;
    });
    Handlebars.registerHelper('tsp3', function (param1) {
        /**
         * @partial: {{ tsp3 !!!!!!!! }}
         * @result :
         Warning: Parse error on line 54:
         ...            {{ tsp3 !!!!!!!! }}
         -----------------------^
         Expecting 'CLOSE', 'CLOSE_UNESCAPED', 'STRING', 'INTEGER', 'BOOLEAN', 'OPEN_SEXPR', 'CLOSE_SEXPR', 'ID', 'DATA', 'SEP',

         */
        return '[[tsp3]] ' + param1;
    });
    Handlebars.registerHelper('tsp4', function (param1) {
        /**
         * @partial: {{ tsp4 no_quotes }}
         * @result : [[tsp4]] undefined

         */
        return '[[tsp4]] ' + param1;
    });
    Handlebars.registerHelper('tsp5', function (param1) {
        /**
         * @partial: {{ tsp5 "with_double_quotes" }}
         * @result : [[tsp5]] with_double_quotes

         */
        return '[[tsp5]] ' + param1;
    });
    Handlebars.registerHelper('tsp6', function (param1) {
        /**
         * @partial: {{ tsp6 'with_single_quotes' }}
         * @result : [[tsp6]] with_single_quotes

         */
        return '[[tsp6]] ' + param1;
    });
    Handlebars.registerHelper('tsp10', function (content) {
        /**
         * @partial: {{#tsp10 }} <p> see whats inside </p> {{/tsp10}}
         * @result :
           [[tsp10]]
           <p>see whats inside</p> --end--

         */
        return '[[tsp10]] '+ content.fn(this) +' --end--';
    });
    Handlebars.registerHelper('tsp12', function (param1, content) {
        /**
         * @partial: {{#tsp12 "Chicken soup for the soul"}} <div>Check what I have</div>  {{/tsp12}}
         * @result :
           [[tsp12]] Chicken soup for the soul,
           <div>Check what I have</div>--end--

         */
        return '[[tsp12]] '+ param1 + ', ' + content.fn(this) + ' --end--';
    });

    Handlebars.registerHelper('tsp14', function (param1, param2, content) {
        /**
         * @partial: {{#tsp14 "Husband" "Wife"}} <div>We just got married</div>  {{/tsp13}}
         * @result :
           [[tsp14]] Husband, Wife,
           <div>We just got married</div>--end--

         */
        return '[[tsp14]] '+ param1 + ', ' + param2 + ', ' + content.fn(this) + ' --end--';
    });

    Handlebars.registerHelper('tsp15', function (param1, content) {
        /**
         * ---
           #YFM style

           slug: index
           ---
         * @partial: {{#tsp15 slug}}<div>Hey, your shoe!</div>{{/tsp15}}
         * @result :
           [[tsp15]] index,
           <div>Hey, your shoe!</div>--end--

         */
        return '[[tsp15]] '+ param1 + ', ' + content.fn(this) + ' --end--';
    });

    Handlebars.registerHelper('tsp16', function (param1, content) {
        /**
         * global.{yml, json} is created.
           titles: Home page

         * @partial: {{#tsp16 global}}<div>{{titles}}</div>{{/tsp16}}
         * @result :
           [[tsp16]] Home page,
           <div></div>--end--

         */
        return '[[tsp16]] '+ param1.titles + ', ' + content.fn(this) + ' --end--';
    });

    Handlebars.registerHelper('tsp17', function (param1, content) {
        /**
         * global.{yml, json} is created.
           titles: Home page

         * @partial: {{#tsp17 global}}<div>{{this.titles}}</div>{{/tsp17}}
         * @result :
           [[tsp17]] Home page,
           <div></div>--end--

         */
        return '[[tsp17]] '+ param1.titles + ', ' + content.fn(this) + ' --end--';
    });
};
