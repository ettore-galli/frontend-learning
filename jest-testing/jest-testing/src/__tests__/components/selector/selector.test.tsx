import { fireEvent, render } from "@testing-library/react";
import { Selector } from "../../../components/selector/selector";

// npm run test corso-testing/react-example/tests/components/stars/stars.test.jsx

describe("Test selector behaviour", () => {

    it("responds to change", () => {
        const rendered = render(<Selector title="Di Prova"></Selector>);

        const mySelect = rendered.getByRole('combobox');

        expect(mySelect).toHaveValue("")

        fireEvent.change(mySelect, { target: { value: 'B' } });

        expect(mySelect).toHaveValue("B");

    })

});