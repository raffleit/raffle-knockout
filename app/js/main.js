(function(){
    "use strict";
    require.config({
        "baseUrl" : "./js/",
        "paths": {
            "jquery": "libs/jquery/jquery.min",
            "knockout": "libs/knockout.js/knockout",
            "underscore": "libs/underscore/underscore"

        },
        "shim": {
            "jquery": {
                "exports": "jquery"
            },
            "knockout": {
                "exports": "ko"
            },
            "underscore": {
                "exports": "_"
            }
        }
    });
    define(['knockout', 'app'], function (ko,DeltakerViewModel) {
        ko.applyBindings(new DeltakerViewModel());
    });
})();