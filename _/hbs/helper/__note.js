module.exports.register = function (Handlebars, options, parameters) {
    Handlebars.registerHelper('testing1', function () {
        /*
            {{ testing1 }}
        */
        return 'AAAAAAAAAAAAAAAAAAAAA';
    });
    Handlebars.registerHelper('testing2', function (helperOptions, context) {
        /*
            {{ testing2 }}
        */
        return 'BBBBBBBBBBBBBBBB';
    });
    Handlebars.registerHelper('testing3', function (helperOptions, context, parameters) {
        /*
            {{ testing3 "!!!!!!!!" }}
        */
        return 'CCCCCCCCCCCCCCCCCCC'+helperOptions;
    });
    Handlebars.registerHelper('testing4', function (helperOptions, context, parameters) {
        /*
            {{ testing4 }}
        */
        return 'DDDDDDDDDDDDDDDDDDD';
    });
    Handlebars.registerHelper('testing5', function (context) {
        /*
            {{#testing5 }} <p> </p> {{/testing5}}
        */
        return 'DDD-----'+ context.fn(this) +'----DDDDDDDDD';
    });
    Handlebars.registerHelper('testing6', function (context, helperOptions) {
        /*
            {{#testing6 "Chicken soup for the soul"}}  {{/testing6}}
        */
        return 'EEE-----'+ helperOptions +'----EEEEEEE';
    });
    Handlebars.registerHelper('testing7', function (attr, content) {
        /*
            {{#testing7 "The rain main"}} <div></div>  {{/testing7}}
        */
        return 'EEE-----'+ attr +'----EEEEEEE'+ content.fn(this);
    });

    Handlebars.registerHelper('testing8', function (attr, attr2, content) {
        /*
            {{#testing8 "The rain main" "rain man sings"}} <div></div>  {{/testing8}}
        */
        return 'EEE-----'+ attr +'----EEEEEEE'+'----GGGG----'+ attr2 + '----GGGG'+ content.fn(this);
    });

    Handlebars.registerHelper('testing9', function (attr, content) {
        /*
            ---
            #YFM style

            slug: index
            ---

            {{#testing9 slug}} <div></div>  {{/testing9}}
        */
        return 'EEE-----'+ attr +'----EEEEEEE'+ content.fn(this);
    });

    Handlebars.registerHelper('testing10', function (attr, content) {
        /*
            global.{yml, json} is created.
            titles: Home page

            {{#testing10 global}} <div>{{slug}}</div>  {{/testing10}}
        */
        return 'EEE-----'+ attr.titles +'----EEEEEEE'+ content.fn(this);
    });
};
