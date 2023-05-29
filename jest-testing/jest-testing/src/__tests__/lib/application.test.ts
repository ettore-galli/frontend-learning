
import { totalOrderQty } from '../../lib/application'
import { Order, OrderItem } from '../../lib/data';

const mockOrder: Order = new Order(123, [new OrderItem("pere", 7), new OrderItem("banane", 4)]);

jest.mock('../../lib/data', () => {
    return {
        ...jest.requireActual('../../lib/data'),
        fetchOrder: (orderNumber: number) => mockOrder
    }
});

describe("Test totalOrderQty", () => {
    it("Esegue la somma delle quantità", () => {
        expect(totalOrderQty(1)).toEqual(11);
    })
});