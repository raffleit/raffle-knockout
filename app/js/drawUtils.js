var _ = require('lodash');

var getWeighedList = function (participants) {
    var weighedList = [];
    for (var i = 0; i < participants.length; i++) {
        var participant = participants[i];
        for (var j = 0; j < participant.ticketCount(); j++) {
            weighedList.push(participant);
        }
    }
    return weighedList;
};

var drawWinner = function (participants) {
    var weighedList = getWeighedList(participants);
    var randomNum = Math.floor(Math.random() * weighedList.length);
    return weighedList[randomNum];
};

module.exports = {drawWinner: drawWinner};