# JEST TESTING

<https://www.linkedin.com/learning/node-js-testing-and-code-quality-14003857/cleaning-your-codebase?autoplay=true>

## Nozioni di base

### Motivo

Scelta di jest: standard di React, disponibile con create-react-app

### Discovery e posizionamento dei test

- [filename].test.[js|ts|jsx|tsx] vicino al file da testare

oppure:

- Cartella __test__ all'interno di src

<https://create-react-app.dev/docs/running-tests/#filename-conventions>

### Test di funzioni

## Semplici test ed utilizzo di base

### Come avviare i test

```shell
# Avvio di tutti i test
npm test

# Avvio di un solo test
npm test -- jest-testing/jest-testing/src/__tests__/lib/math.test.tsx
```

### Semplice test di funzione

```typescript
// definizione
function supersomma(a: number, b: number): number {
    if (a === 1 && b === 1) {
        return 1.99999999987463487568
    } else {
        return a + b;
    }
}


export { supersomma }

// test
import { supersomma } from '../../lib/math';

describe("Test somma", () => {
    it("Esegue la somma", () => {
        expect(supersomma(1, 2)).toEqual(3);
    })
    it("Esegue 1 + 1", () => {
        expect(supersomma(1, 1)).toEqual(1.999999999874635);
    })
})


```

### Test di codice asincrono - callback

<https://jestjs.io/docs/asynchronous>

- La funzione callback riceve done
- Occorre richiamare done per indicare la fine del test

```typescript

// definizione

function total(samples: number[]) {
    return samples.reduce((acc, cur) => acc + cur, 0);
};

function totalizer(samples: number[], sumFunction: (samples: number[]) => number) {
    setTimeout(() => console.log(sumFunction(samples)), 0);
};

// test

describe("Test totalizer", () => {
    it("Richiama la somma", (done) => {
        totalizer([1, 2], (samples: number[]) => {
            try {
                expect(samples).toEqual([1, 2])
                return done();
            } catch (err) {
                return done(error)
            }
        })
    })
});

```

### Test di codice asincrono - promise

```typescript
...
 await expect(willSum([1, 2])).resolves.toEqual(3);
...
```

### Test di codice asincrono - async-await

```typescript
...
    const result = await willSum([1, 2]);
    expect(result).toEqual(3);
...
```

## Tecniche di mock

### Funzione mock (sostitutivo)

<https://jestjs.io/docs/mock-functions#using-a-mock-function>

```typescript

jest.fn()
jest.fn((...)=>...) // Con implementazione

// definizione

function willSumViaCallback(samples: number[], sumFunction: (samples: number[]) => number) {
    return new Promise((resolve) => {
        resolve(sumFunction(samples));
    });
}

// test

describe("Test totaliser mock", () => {
    it("La callback è richiamata correttamente", () => {
        const mockCallback = jest.fn()
        willSumViaCallback([1, 2], mockCallback);
        expect(mockCallback.mock.calls).toHaveLength(1);
        expect(mockCallback.mock.calls).toEqual([[[1, 2]]]);
    })
});

```

### Mock di un modulo

```typescript

// definizione: data.ts
function fetchOrder(orderNumber: number): Order {
    console.log("Called *actual* fetchOrder")
    return DATABASE.filter(order => order.orderNumber === orderNumber)[0];
}

// definizione: modulo utente di data.ts
function totalOrderQty(orderNumber: number): number {
    const order = fetchOrder(orderNumber);
    console.log("Order:", order.orderNumber, order.items);
    return total(order.items.map(row => row.quantity))
}

// test
const mockOrder: Order = new Order(123, [new OrderItem("pere", 7), new OrderItem("banane", 4)]);

jest.mock('../../lib/data', () => {
    return {
        ...jest.requireActual('../../lib/data'),
        fetchOrder: (orderNumber: number) => mockOrder
    }
});

// ...

describe("Test totalOrderQty", () => {
    it("Esegue la somma delle quantità", () => {
        expect(totalOrderQty(1)).toEqual(11);
    })
});

```

### Mock di timer

<https://jestjs.io/docs/timer-mocks#run-all-timers>

```typescript

// definizione
function remindMe(what: string, delay: number, action: (message: string) => void): void {
    const remindMessage = `REMINDER: ${what}`;

    setTimeout(() => { action(remindMessage) }, delay);
}

export { remindMe };


// test

import { remindMe } from '../../lib/reminder';

describe("Test reminder", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    })

    afterEach(() => {
        jest.useRealTimers();
    })

    it("Esempio di mock di Timeout", () => {

        jest.spyOn(global, 'setTimeout');

        remindMe("test", 1234, jest.fn());

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1234);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.anything(), 1234);

    })

    it("Esempio di simulazione di delay", () => {
        const callback = jest.fn();
        remindMe("test", 0, callback);
        expect(callback).not.toBeCalled();
        jest.runAllTimers();
        expect(callback).toBeCalled();
        expect(callback).toBeCalledTimes(1);
        expect(callback).toBe
    })
})


```

## Libreria di test react

### Test di componenti front end

<https://jestjs.io/docs/tutorial-react>

- Rendering di un componente o porzione di pagina

```const rendered = render(<Selector title="Di Prova"></Selector>);```typescript

- Selector: Selezionare una porzione

```const mySelect = rendered.getByRole('combobox');```typescript

Esistono diversi selettori, per il Role usare gli Aria Roles:

<https://www.w3.org/TR/html-aria/#docconformance>

- Trigger di eventi

```fireEvent.change(mySelect, { target: { value: 'B' } });```typescript

- Asserzioni

```expect(mySelect).toHaveValue("B");```typescript

Reference sui tipi di asserzioni (jest-dom testing library)
<https://github.com/testing-library/jest-dom>

- Act

<https://it.legacy.reactjs.org/docs/test-utils.html#act>

Con render non è necessario incorporarlo in act(...) (vedi punto successivo)

- Act e Wait For

<https://davidwcai.medium.com/react-testing-library-and-the-not-wrapped-in-act-errors-491a5629193b>

```typescript
  test('Renders name holder', async () => {
    const userDescription = render(<HeaderComponent userDescription="example-usr-description" />)
    const nameHolder = userDescription.getByText(/example/)
    await waitFor(() => {
      expect(nameHolder).toContainHTML("<div class=\"user\">example-usr-description</div>");
      expect(nameHolder).toHaveTextContent("example-usr-description");
      expect(nameHolder).toHaveAttribute("class", "user");
    });
  });
  ```

### Esempi testing frontend

```typescript
import { useState } from "react";

class SelectorProps {
    title: string | null = null;
}

const Selector = (props: SelectorProps) => {

    const [selected, setSelected] = useState("");
    const options: Array<number | string> = ["", "A", "B", "C"]
    return <>
        <div>{props.title}</div>
        <div>{selected ? selected : "..."}</div>
        <select onChange={(e) => setSelected(e.target.value)}>
            {options.map(opt => <option key={opt} value={opt} >Opzione {opt}</option>)}
        </select>
    </>
}


export { Selector };

```

```typescript

// definizione
import { render } from '@testing-library/react';
import { HeaderComponent } from '../../components/header/Header';

test('renders learn react link', () => {
  const userDescription = render(<HeaderComponent userDescription="example-usr-description" />)

  const nameHolder = userDescription.getByText(/example/)
  expect(nameHolder).toContainHTML("<div class=\"user\">example-usr-description</div>");
  expect(nameHolder).toHaveTextContent("example-usr-description");
  expect(nameHolder).toHaveAttribute("class", "user");

});


// test
import { fireEvent, render } from "@testing-library/react";
import { Selector } from "../../../components/selector/selector";

describe("Test selector behaviour", () => {

    it("responds to change", () => {
        const rendered = render(<Selector title="Di Prova"></Selector>);

        const mySelect = rendered.getByRole('combobox');

        expect(mySelect).toHaveValue("")

        fireEvent.change(mySelect, { target: { value: 'B' } });

        expect(mySelect).toHaveValue("B");

        fireEvent.change(mySelect, { target: { value: 'C' } });

        expect(mySelect).toHaveValue("C");

    })

});

```

```typescript

// definizione

// test

```

## Altre note tecniche

### Setup applicazione di esempio

```shell
# Creazione app react
npx create-react-app jest-testing --template typescript

```
