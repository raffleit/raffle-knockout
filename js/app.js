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

    self.deltakere = ko.observableArray([]);
    self.vinnere = ko.observableArray([]);

    self.hentFraLocalstorage = function () {
        var lagredeDeltakere = JSON.parse(localStorage.getItem("deltakere"));
        var lagredeVinnere = JSON.parse(localStorage.getItem("vinnere"));
        _.each(lagredeDeltakere, function (deltaker) {
            self.deltakere.splice(0, 0, new Deltaker(deltaker.navn, deltaker.antallLodd));
        });
        _.each(lagredeVinnere, function (vinner) {
            self.vinnere.splice(0, 0, new Vinner(vinner.navn));
        });
    }
    self.hentFraLocalstorage();

    self.isDrawable = function () {
        var totaltAntallLodd = _.reduce(self.deltakere(), function (memo, deltaker) {
            return memo + deltaker.antallLodd()
        }, 0);
        console.log(totaltAntallLodd);
        return totaltAntallLodd > 0;
    }

    self.addDeltakerFromForm = function (formElement) {
        var navn = formElement.elements["navn"].value;
        var antallLodd = formElement.elements["antallLodd"].value;
        self.deltakere.splice(0, 0, new Deltaker(navn, parseInt(antallLodd)));
        formElement.reset();
        formElement.elements["navn"].focus();
        self.lagreDeltakere();
    }

    self.fjernDeltaker = function (deltaker) {
        self.deltakere.remove(deltaker);
        self.lagreDeltakere();
    }

    self.trekk = function () {
        var getWeighedList = function (deltakere) {
            var weighedList = [];
            for (var i = 0; i < deltakere.length; i++) {
                var deltaker = deltakere[i];
                for (var j = 0; j < deltaker.antallLodd(); j++) {
                    weighedList.push(deltaker);
                }
            }
            return weighedList;
        }

        var weighedList = getWeighedList(self.deltakere());
        var randomNum = Math.floor(Math.random() * weighedList.length);
        var vinner = weighedList[randomNum];

        vinner.antallLodd(vinner.antallLodd() - 1);

        self.vinnere.splice(0, 0, new Vinner(vinner.navn));

        self.lagreDeltakere();
        self.lagreVinnere();
    }

    self.slideDown = function (elem) {
        $(elem).hide().slideDown()
    }

    self.lagreDeltakere = function () {
        localStorage.setItem("deltakere", ko.toJSON(self.deltakere));
    }

    self.lagreVinnere = function () {
        localStorage.setItem("vinnere", ko.toJSON(self.vinnere));
    }

    self.reset = function () {
        self.deltakere([]);
        self.vinnere([]);
        localStorage.clear();
    }
}


ko.applyBindings(new DeltakerViewModel());