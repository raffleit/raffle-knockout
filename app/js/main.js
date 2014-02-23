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

    define(['knockout', 'app', 'sammy'], function (ko, AppViewModel, Sammy) {
        var appViewModel = new AppViewModel();

        var md = window.matchMedia("(min-width: 970px) and (max-width: 1170px)").matches;
        var lg = window.matchMedia("(min-width: 1170px)").matches;

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
                } else if (this.params.tab === "Full") {
                    $drawingDiv.show();
                    $participantsDiv.show();
                }
            });

            this._checkFormSubmission = function (form) {
                return (false);
            };

            this.get('', function () {
                if (lg || md) {
                    this.app.runRoute('get', '#Full');
                } else {
                    this.app.runRoute('get', '#Participants');
                }
            });
        }).run();
        ko.applyBindings(appViewModel);
    });
})();