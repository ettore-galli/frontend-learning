import { render } from '@testing-library/react';
import { Stars } from '../../../components/stars/stars';

describe('Test stars', () => {
    it("Renders correctly", () => {
        //expect(1 + 1 + 1).toEqual(2);
        const rendered = render(<Stars />);
        const element = rendered.getByText("*****");
        expect(element).toHaveTextContent("*****")
    })
})