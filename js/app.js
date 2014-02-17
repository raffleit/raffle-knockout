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
    self.randomNumber = ko.observable(-1);

    self.deltakere = ko.observableArray([
        new Deltaker("", undefined),
    ]);

    self.vinnere = ko.observableArray([]);

    self.addDeltaker = function () {
        self.deltakere.push(new Deltaker("", undefined));
    }

    self.fjernDeltaker = function (deltaker) {
        self.deltakere.remove(deltaker);
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

        var rand = function (min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        var logDeltakere = function (deltakere) {
            console.log("Deltakere: ", deltakere);
        }

        var weighedList = getWeighedList(self.deltakere());
        self.randomNumber(rand(0, weighedList.length));
        var vinner = weighedList[self.randomNumber()];
        logDeltakere(self.deltakere());
        console.log("Weighed list", weighedList);
        console.log("Vinner", vinner);
        vinner.antallLodd(vinner.antallLodd() - 1);

        logDeltakere(self.deltakere());

        self.vinnere.push(new Vinner(vinner.navn));
    }
}
ko.applyBindings(new DeltakerViewModel());