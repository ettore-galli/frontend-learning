import { render } from '@testing-library/react';
import { Stars } from '../../../components/stars/stars';

describe('Test stars', () => {
    it("Renders correctly", () => {
        //expect(1 + 1 + 1).toEqual(2);
        const rendered = render(<Stars />);
        const element = rendered.getByText("*****");
        expect(element).toHaveTextContent("*****")

        const rendered7 = render(<Stars stars={7} />);
        const element7 = rendered7.container;
        const starsDivs = element7.getElementsByClassName("App");
        expect(starsDivs[0]).toContainHTML('<div class="App">*******</div>')
    })
})

describe