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

    define(['knockout', 'app', 'sammy'], function (ko, DeltakerViewModel, Sammy) {
        var deltakerViewModel = new DeltakerViewModel();

        var xs = window.matchMedia("(max-width: 749px)").matches;
        var sm = window.matchMedia("(min-width: 750px) and (max-width: 969px)").matches;
        var md = window.matchMedia("(min-width: 970px) and (max-width: 1170px)").matches;
        var lg = window.matchMedia("(min-width: 1170px)").matches;

        new Sammy(function () {
            this.get('#:tab', function () {
                deltakerViewModel.chosenTabId(this.params.tab);
                if (this.params.tab === "Trekning") {
                    $("#deltakereDiv").hide();
                    $("#trekningDiv").show();
                } else if (this.params.tab === "Deltakere") {
                    $("#trekningDiv").hide();
                    $("#deltakereDiv").show();
                } else if (this.params.tab === "Full") {
                    $("#trekningDiv").show();
                    $("#deltakereDiv").show();
                }
            });

            this._checkFormSubmission = function (form) {
                return (false);
            };

            this.get('', function () {
                if (lg || md) {
                    this.app.runRoute('get', '#Full');
                } else {
                    this.app.runRoute('get', '#Deltakere');
                }
            });
        }).run();
        ko.applyBindings(deltakerViewModel);
    });
})();