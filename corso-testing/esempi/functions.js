function total(samples) {
    return samples.reduce((acc, cur) => acc + cur, 0);
}

function willSum(samples) {
    return new Promise((resolve) => {
        resolve(total(samples));
    });
}

function totalizer(samples, sumFunction) {
    setImmediate(() => console.log(sumFunction(samples)));
}

function callbackNotCalled(callback) {
    setImmediate(callback, "X"); // Disable in order to make the test fail
    _ = callback;
}

function average(samples) {
    // return total(samples) / samples.length
    return module.exports.total(samples) / samples.length
}

function futureAverage(samples) {
    return new Promise((resolve, _) => {
        resolve(average(samples))
    })
}

module.exports = {
    total,
    average,
    futureAverage,
    willSum,
    totalizer,
    callbackNotCalled
};


