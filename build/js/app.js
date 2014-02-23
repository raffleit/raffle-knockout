define(['knockout', 'jquery', 'underscore', 'trekkUtils', 'sammy'], function (ko, $, _, trekkUtils, Sammy) {
    "use strict";

    function Winner(navn) {
        var self = this;
        self.navn = navn;
    }

    function Deltaker(navn, antallLodd) {
        var self = this;
        self.navn = navn;
        self.antallLodd = ko.observable(antallLodd);
    }

    function DeltakerViewModel() {
        var self = this;

        self.chosenTabId = ko.observable();

        self.deltakere = ko.observableArray([]);
        self.winners = ko.observableArray([]);

        self.goToTab = function (tab) {
            location.hash = tab;
        };

        self.restoreFromLocalstorage = function () {
            var lagredeDeltakere = JSON.parse(localStorage.getItem("deltakere"));
            var lagredeVinnere = JSON.parse(localStorage.getItem("winners"));
            _.each(lagredeDeltakere, function (deltaker) {
                self.deltakere.splice(0, 0, new Deltaker(deltaker.navn, deltaker.antallLodd));
            });
            _.each(lagredeVinnere, function (vinner) {
                self.winners.splice(0, 0, new Winner(vinner.navn));
            });
        };
        self.restoreFromLocalstorage();

        self.isDrawable = function () {
            var totaltAntallLodd = _.reduce(self.deltakere(), function (memo, deltaker) {
                return memo + deltaker.antallLodd();
            }, 0);
            return totaltAntallLodd > 0;
        };

        self.addDeltakerFromForm = function (formElement) {

            var validateForm = function ($navn, $antallLodd) {
                var isNumber = function(n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };

                var valid = true;

                if ($navn.val().length === 0) {
                    $navn.closest('.form-group').addClass("has-error");
                    valid = false;
                }
                if (!isNumber($antallLodd.val()) || $antallLodd.val().length === 0) {
                    $antallLodd.closest('.form-group').addClass("has-error");
                    valid = false;
                }
                return valid;
            };

            var $navn = $(formElement).find("input[name='navn']");
            var $antallLodd = $(formElement).find("input[name='antallLodd']");

            if (validateForm($navn, $antallLodd)) {
                $(formElement).find(".has-error").removeClass("has-error");
                self.deltakere.splice(0, 0, new Deltaker($navn.val(), parseInt($antallLodd.val())));
                formElement.reset();
                $navn.focus();
                self.storeParticipants();
            }
        };

        self.removeParticipant = function (deltaker) {
            self.deltakere.remove(deltaker);
            self.storeParticipants();
        };

        self.draw = function () {
            var vinner = trekkUtils.trekkVinner(self.deltakere());

            vinner.antallLodd(vinner.antallLodd() - 1);
            self.winners.splice(0, 0, new Winner(vinner.navn));

            self.storeParticipants();
            self.storeWinners();
        };

        self.slideDown = function (elem) {
            $(elem).hide().slideDown();
        };

        self.storeParticipants = function () {
            localStorage.setItem("deltakere", ko.toJSON(self.deltakere));
        };

        self.storeWinners = function () {
            localStorage.setItem("winners", ko.toJSON(self.winners));
        };

        self.reset = function () {
            var reallyReset = confirm("This will wipe all participants and winners. Do you want to continue?");
            if (reallyReset) {
                self.deltakere([]);
                self.winners([]);
                localStorage.clear();
            }
        };
    }

    return DeltakerViewModel;
});