
function myFunction(x) {
    return (x + 1) * (x - 1);
}

function useMyFunction(x) {
    return myFunction(x);
    //return module.exports.myFunction(x);
}

class Functions {
    aFunction(x) {
        return (x + 1) * (x - 1);
    }
    useFunction(x) {
        return this.aFunction(x)
    }
}

module.exports = { myFunction, useMyFunction, Functions };



