module.exports.register = function (Handlebars, options, parameters) {
    Handlebars.registerHelper('debug', function (optionalValue){
        console.log("Args: Handlebars");
        console.log("==v===============================================");

        var handlebarsArr = [];
        for (var j = 0; j < Handlebars.length; j++) {
            handlebarsArr = Handlebars[j];
        }
        for (var hdb_item in handlebarsArr)
        {
            /**
             * uncomment this to view the output,
             * it can be really long if theres a lot being assembled.
             */
            // console.log(handlebarsArr[hdb_item]);
        }

        console.log("Args: options");
        console.log("==v===============================================");
        /**
         * uncomment this to view the output,
         * it can be really long if theres a lot being assembled.
         */
        // console.log(options);

        console.log("Args: parameters");
        console.log("==v===============================================");
        /**
         * uncomment this to view the output,
         * it can be really long if theres a lot being assembled.
         */
        // console.log(parameters);

        console.log("Current Context");
        console.log("==v===============================================");
        // console.log(this);

        if (optionalValue) {
            console.log("Value");
            console.log("==v===============================================");
            // console.log(optionalValue);
        }
    });
};