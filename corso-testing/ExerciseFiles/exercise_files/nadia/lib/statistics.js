const { sum } = require("lodash");

function total(samples) {
    return sum(samples)
}

function average(samples) {
    return module.exports.total(samples) / samples.length
}


function futureAverage(samples) {
    return new Promise((resolve, _) => {
        resolve(average(samples))
    })
}

module.exports = { total, average, futureAverage };