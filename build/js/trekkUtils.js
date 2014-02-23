define(['underscore'], function (_) {
    "use strict";

    var getWeighedList = function (deltakere) {
        var weighedList = [];
        for (var i = 0; i < deltakere.length; i++) {
            var deltaker = deltakere[i];
            for (var j = 0; j < deltaker.antallLodd(); j++) {
                weighedList.push(deltaker);
            }
        }
        return weighedList;
    };

    var trekkVinner = function (deltakere){
        var weighedList = getWeighedList(deltakere);
        var randomNum = Math.floor(Math.random() * weighedList.length);
        return weighedList[randomNum];
    };


    return {
        trekkVinner: trekkVinner
    };
});