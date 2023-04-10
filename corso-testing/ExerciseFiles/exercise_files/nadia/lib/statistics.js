const { sum } = require("lodash");


function total(samples){
    return sum(samples)
}

function average(samples) {
    return total(samples) / samples.length
}

module.exports = {total, average};