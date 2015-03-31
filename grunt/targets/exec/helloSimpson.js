module.exports = function (grunt, options) {

    'use strict';
    grunt.util.linefeed = '\n'; // Force use of Unix newlines. Copied unashamedly from Bootstrap Gruntfile.js

    // return object
    var thisTarget = {
        cmd: function ( firstName, lastName )
        {
            var formattedName =
            [
                lastName.toUpperCase(),
                firstName.toUpperCase()
            ].join( ', ' );
            return 'echo ' + formattedName;
        }
    };

    return thisTarget;
};
