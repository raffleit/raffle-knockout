define(['knockout', 'jquery', 'underscore', 'trekkUtils', 'sammy'], function (ko, $, _, trekkUtils, Sammy) {
    "use strict";

    function Vinner(navn) {
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
        self.vinnere = ko.observableArray([]);

        self.goToTab = function (tab) {
            location.hash = tab;
        };

        self.hentFraLocalstorage = function () {
            var lagredeDeltakere = JSON.parse(localStorage.getItem("deltakere"));
            var lagredeVinnere = JSON.parse(localStorage.getItem("vinnere"));
            _.each(lagredeDeltakere, function (deltaker) {
                self.deltakere.splice(0, 0, new Deltaker(deltaker.navn, deltaker.antallLodd));
            });
            _.each(lagredeVinnere, function (vinner) {
                self.vinnere.splice(0, 0, new Vinner(vinner.navn));
            });
        };
        self.hentFraLocalstorage();

        self.isDrawable = function () {
            var totaltAntallLodd = _.reduce(self.deltakere(), function (memo, deltaker) {
                return memo + deltaker.antallLodd();
            }, 0);
            return totaltAntallLodd > 0;
        };

        self.addDeltakerFromForm = function (formElement) {

            var validateForm = function ($navn, $antallLodd) {
                var valid = true;

                if ($navn.val().length === 0) {
                    $navn.closest('.form-group').addClass("has-error");
                    valid = false;
                }
                if (isNaN($antallLodd.val())) {
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
                self.lagreDeltakere();
            }
        };

        self.fjernDeltaker = function (deltaker) {
            self.deltakere.remove(deltaker);
            self.lagreDeltakere();
        };

        self.trekk = function () {
            var vinner = trekkUtils.trekkVinner(self.deltakere());

            vinner.antallLodd(vinner.antallLodd() - 1);
            self.vinnere.splice(0, 0, new Vinner(vinner.navn));

            self.lagreDeltakere();
            self.lagreVinnere();
        };

        self.slideDown = function (elem) {
            $(elem).hide().slideDown();
        };

        self.lagreDeltakere = function () {
            localStorage.setItem("deltakere", ko.toJSON(self.deltakere));
        };

        self.lagreVinnere = function () {
            localStorage.setItem("vinnere", ko.toJSON(self.vinnere));
        };

        self.reset = function () {
            var reallyReset = confirm("This will wipe all participants and winners. Do you want to continue?");
            if (reallyReset) {
                self.deltakere([]);
                self.vinnere([]);
                localStorage.clear();
            }
        };
    }

    return DeltakerViewModel;
});