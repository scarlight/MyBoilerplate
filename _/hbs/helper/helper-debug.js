module.exports.register = function (Handlebars, options, parameters) {
    Handlebars.registerHelper('debug', function (optionalValue){
        console.log("Current Context");
        console.log("=================================================");
        console.log(this);

        if (optionalValue) {
            console.log("Value");
            console.log("=================================================");
            console.log(optionalValue);
        }
    });
};