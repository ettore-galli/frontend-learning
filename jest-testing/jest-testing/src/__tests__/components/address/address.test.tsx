import { render } from '@testing-library/react';
import { Address } from '../../../components/address/address';



describe('Test address', () => {
    let originalLocation: Location;

    beforeAll(() => {
        originalLocation = window.location;
    })

    afterAll(() => {
        Object.defineProperty(window, 'location', originalLocation)
    })

    it("Renders correctly", () => {

        Object.defineProperty(window, 'location', { value: { href: "https://my.web.address.xyz" } })

        const rendered = render(<Address />);

        const element = rendered.getByText("You are here: https://my.web.address.xyz");
        expect(element).toHaveTextContent("You are here")


    })
})

