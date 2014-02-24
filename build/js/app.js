define(['knockout', 'jquery', 'underscore', 'drawUtils'], function (ko, $, _, drawUtils) {
    "use strict";

    function Winner(name) {
        var self = this;
        self.name = name;
    }

    function Participant(name, ticketCount) {
        var self = this;
        self.name = name;
        self.ticketCount = ko.observable(ticketCount);
    }

    function AppViewModel() {
        var self = this;

        self.chosenTabId = ko.observable();

        self.participants = ko.observableArray([]);
        self.winners = ko.observableArray([]);

        self.goToTab = function (tab) {
            location.hash = tab;
        };

        self.restoreFromLocalstorage = function () {
            var storedParticipants = JSON.parse(localStorage.getItem("participants"));
            var storedWinners = JSON.parse(localStorage.getItem("winners"));
            _.each(storedParticipants, function (participant) {
                self.participants.splice(0, 0, new Participant(participant.name, participant.ticketCount));
            });
            _.each(storedWinners, function (winner) {
                self.winners.splice(0, 0, new Winner(winner.name));
            });
        };
        self.restoreFromLocalstorage();

        self.isDrawable = function () {
            var totaltticketCount = _.reduce(self.participants(), function (memo, participant) {
                return memo + participant.ticketCount();
            }, 0);
            return totaltticketCount > 0;
        };

        self.addParticipantFromForm = function (formElement) {
            var validateForm = function ($name, $ticketCount) {
                var isNumber = function(n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };

                var valid = true;

                if ($name.val().length === 0) {
                    $name.closest('.form-group').addClass("has-error");
                    valid = false;
                }
                if (!isNumber($ticketCount.val()) || $ticketCount.val().length === 0) {
                    $ticketCount.closest('.form-group').addClass("has-error");
                    valid = false;
                }
                return valid;
            };

            var $name = $(formElement).find("input[name='name']");
            var $ticketCount = $(formElement).find("input[name='ticketCount']");

            $(formElement).find(".has-error").removeClass("has-error");
            if (validateForm($name, $ticketCount)) {
                self.participants.splice(0, 0, new Participant($name.val(), parseInt($ticketCount.val())));
                formElement.reset();
                $name.focus();
                self.storeParticipants();
            }
        };

        self.removeParticipant = function (deltaker) {
            self.participants.remove(deltaker);
            self.storeParticipants();
        };

        self.draw = function () {
            var winner = drawUtils.drawWinner(self.participants());

            winner.ticketCount(winner.ticketCount() - 1);
            self.winners.splice(0, 0, new Winner(winner.name));

            self.storeParticipants();
            self.storeWinners();
        };

        self.slideDown = function (elem) {
            $(elem).hide().slideDown();
        };

        self.storeParticipants = function () {
            localStorage.setItem("participants", ko.toJSON(self.participants));
        };

        self.storeWinners = function () {
            localStorage.setItem("winners", ko.toJSON(self.winners));
        };

        self.reset = function () {
            var reallyReset = confirm("This will wipe all participants and winners. Do you want to continue?");
            if (reallyReset) {
                self.participants([]);
                self.winners([]);
                localStorage.clear();
            }
        };
    }

    return AppViewModel;
});