import { fetchOrder } from "./data";

function supersomma(a: number, b: number): number {
    if (a === 1 && b === 1) {
        return 1.99999999987463487568
    } else {
        return a + b;
    }
}


function total(samples: number[]) {
    return samples.reduce((acc, cur) => acc + cur, 0);
}

function totalizer(samples: number[], sumFunction: (samples: number[]) => number) {
    setTimeout(() => console.log(sumFunction(samples)), 0);
}

function willSum(samples: number[]) {
    return new Promise((resolve) => {
        resolve(total(samples));
    });
}

function willSumViaCallback(samples: number[], sumFunction: (samples: number[]) => number) {
    return new Promise((resolve) => {
        resolve(sumFunction(samples));
    });
}


function average(samples: number[]) {
    return total(samples) / samples.length
}

function futureAverage(samples: number[]) {
    return new Promise((resolve, _) => {
        resolve(average(samples))
    })
}

function totalOrderQty(orderNumber: number): number {
    const order = fetchOrder(orderNumber);
    console.log("Order:", order.orderNumber, order.items);
    return total(order.items.map(row => row.quantity))
}

export {
    supersomma,
    total,
    average,
    futureAverage,
    willSum,
    totalizer,
    willSumViaCallback,
    totalOrderQty
};


