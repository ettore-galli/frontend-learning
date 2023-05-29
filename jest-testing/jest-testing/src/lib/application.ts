import { fetchOrder } from "./data";
import { total } from "./math";


function totalOrderQty(orderNumber: number): number {
    const order = fetchOrder(orderNumber);
    console.log("Order:", order.orderNumber, order.items);
    return total(order.items.map(row => row.quantity))
}

export { totalOrderQty }