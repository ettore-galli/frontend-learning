
class OrderItem {
    item: string;
    quantity: number;

    constructor(item: string, quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }

}

class Order {
    orderNumber: number;
    items: OrderItem[];

    constructor(orderNumber: number, items: OrderItem[]) {
        this.orderNumber = orderNumber;
        this.items = items;
    }
}

const DATABASE = [
    new Order(1, [new OrderItem("mele", 3), new OrderItem("pere", 4)]),
    new Order(2, [new OrderItem("mele", 4), new OrderItem("banane", 2)]),
    new Order(3, [new OrderItem("pere", 4), new OrderItem("banane", 4)])
]

function fetchOrder(orderNumber: number): Order {
    console.log("Called *actual* fetchOrder")
    return DATABASE.filter(order => order.orderNumber === orderNumber)[0];
}

export { Order, OrderItem, fetchOrder }