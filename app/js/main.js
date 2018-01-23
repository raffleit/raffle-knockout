var AppViewModel = require('./app');
var ko = require('knockout');
var $ = require('jquery');
global.jQuery = $;
var Sammy = require('sammy');

var appViewModel = new AppViewModel();

var $participantsDiv = $("#participantsDiv");
var $drawingDiv = $("#drawingDiv");

$.sammy(function () {
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