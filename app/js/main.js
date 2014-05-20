(function () {
    "use strict";
    require.config({
        "baseUrl": "./js/",
        "paths": {
            "jquery": "libs/jquery/jquery.min",
            "knockout": "libs/knockout.js/knockout",
            "underscore": "libs/underscore/underscore",
            "sammy": "libs/sammy/lib/sammy"
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
            },
            "sammy": {
                "exports": "sammy"
            }
        }
    });

    define(['knockout', 'app', 'sammy', 'hammer'], function (ko, AppViewModel, Sammy) {
        var appViewModel = new AppViewModel();

        var $participantsDiv = $("#participantsDiv");
        var $drawingDiv = $("#drawingDiv");

        new Sammy(function () {
            this.get('#:tab', function () {
                appViewModel.chosenTabId(this.params.tab);
                if (this.params.tab === "Drawing") {
                    $participantsDiv.hide();
                    $drawingDiv.show();
                } else if (this.params.tab === "Participants") {
                    $drawingDiv.hide();
                    $participantsDiv.show();
                }
            });

            this._checkFormSubmission = function (form) {
                return (false);
            };

            this.get('', function () {
                this.app.runRoute('get', '#Participants');
            });
        }).run();
        ko.applyBindings(appViewModel);
    });
})();