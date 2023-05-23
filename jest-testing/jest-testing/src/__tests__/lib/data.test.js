import { Order, OrderItem, fetchOrder } from '../../lib/data';

describe("Objects behave properly", () => {
    it("Can instantiate objects", () => {
        const oItem = new OrderItem("x", 1);
        const ord = new Order(1, [oItem]);
        expect(ord).toEqual({ "items": [{ "item": "x", "quantity": 1 }], "orderNumber": 1 })
    })
})


describe("Order fetch", () => {
    it("Order is fetched correctly", () => {
        expect(fetchOrder(1)).toEqual(new Order(1, [new OrderItem("mele", 3), new OrderItem("pere", 4)]));
    })
})