---
marp: true
---

# FRONTEND TESTING - JEST

---

# VIDEO INTRODUTTIVO

(Richiede subscription a Linkedin Learning)
<https://www.linkedin.com/learning/node-js-testing-and-code-quality-14003857/cleaning-your-codebase?autoplay=true>

---

# DOCUMENTAZIONE DI BASE

Sito ufficiale Jest
<https://jestjs.io/docs/getting-started>

Convenzioni file test
<https://create-react-app.dev/docs/running-tests/#filename-conventions>

---

# SCELTA DI JEST

- Ampiamente diffuso e documentato
- Standard di react
- Già presente di default

---

# AGENDA

- Funzionamento di base
- Tecniche di mock
- Test di componenti frontend (renderizzati)

---

# BASE - UN PRIMO ESEMPIO / 1 - Sorgente

Funzione da testare

```typescript

function somma(a: number, b: number): number {
    if (a === 1 && b === 1) {
        return 1.99999999987463487568
    } else {
        return a + b;
    }
}

export { somma }

```

---

# BASE - UN PRIMO ESEMPIO / 2 - Test

Implementazione del test

```typescript

import { sommma } from 'il/modulo';

describe("Test somma", () => {
    it("Esegue la somma", () => {
        expect(supersomma(1, 2)).toEqual(3);
    })
    it("Esegue 1 + 1", () => {
        expect(supersomma(1, 1)).toEqual(1.999999999874635);
    })
})

```

---

# BASE - UN PRIMO ESEMPIO / 3 - Posizionamento

```[filename].test.[js|ts|jsx|tsx]```

- Accanto al sorgente ()

```txt
mylib
    myfunctions.ts
    myfunctions.test.ts
```

- Cartella ```__tests__```

```txt
src
    mylib/sub1/sub2
        myfunctions.ts
    __tests__/mylib/sub1/sub2
    myfunctions.test.ts
```

---

# BASE - UN PRIMO ESEMPIO / 4 - Avvio test

```bash
# Tutti i test
npm test

# Uno specifico sorgente
npm test npm test -- src/__tests__/lib/math.test.tsmath.test.tsx
```

---

# BASE - UN PRIMO ESEMPIO / 5 - Esito test

```txt
 PASS  src/__tests__/lib/math.test.ts
  Test somma
    ✓ Esegue la somma (3 ms)
    ✓ Esegue 1 + 1

  ...

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        2.352 s
Ran all test suites matching /src\/__tests__\/lib\/math.test.ts/i.
```

---

# BASE - UN PRIMO ESEMPIO / 6 - Esito test con errori

```txt
  ● Test somma › Esegue la somma

    expect(received).toEqual(expected) // deep equality

    Expected: 4
    Received: 3

      23 | describe("Test somma", () => {
      24 |     it("Esegue la somma", () => {
    > 25 |         expect(supersomma(1, 2)).toEqual(4);
         |                                  ^
      26 |     })
      27 |     it("Esegue 1 + 1", () => {
      28 |         expect(supersomma(1, 1)).toEqual(1.999999999874635);

      at Object.<anonymous> (src/__tests__/lib/math.test.ts:25:34)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 7 passed, 8 total
Snapshots:   0 total
Time:        3.308 s
```

---

# TEST CALLBACK / 1 - Introduzione

<https://jestjs.io/docs/asynchronous>

- La funzione callback riceve la callback ```done()```
- Occorre richiamare done per indicare la fine del test

Cheat Sheet generico con focus sul test asincrono e mock:
<https://www.codecademy.com/learn/learn-react-testing/modules/jest/cheatsheet>

---

# TEST CALLBACK / 2 - Codice

```typescript
function total(samples: number[]) {
    return samples.reduce((acc, cur) => acc + cur, 0);
};

function totalizer(samples: number[], sumFunction: (samples: number[]) => number) {
    setTimeout(() => console.log(sumFunction(samples)), 0);
};


```

---

# TEST CALLBACK / 3 - Test

```typescript
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

---

### TEST DI PROMISE E CODICE ASINCRONO / 1 - Codice

```typescript
function willSum(samples: number[]) {
    return new Promise((resolve) => {
        resolve(total(samples));
    });
}
```

---

### TEST DI PROMISE E CODICE ASINCRONO / 2 - Test

I metodi di test sono _async_

```typescript

// Attraverso l'attributo _resolves_
...
    it("Richiama la somma con promise", async () => {
        await expect(willSum([1, 2])).resolves.toEqual(3);
    })


// Via await
describe("Test will sum", () => {
    it("Richiama la somma async", async () => {
        const result = await willSum([1, 2]);
        expect(result).toEqual(3);
    })
...
```

---

# TECNICHE DI MOCK - MOCK DI FUNZIONI / 1

<https://jestjs.io/docs/mock-functions#using-a-mock-function>

```typescript

jest.fn()
jest.fn((...)=>...) // Con implementazione

function willSumViaCallback(samples: number[], sumFunction: (samples: number[]) => number) {
    return new Promise((resolve) => {
        resolve(sumFunction(samples));
    });
}
```

---

# TECNICHE DI MOCK - MOCK DI FUNZIONI / 2 - Test

```typescript
describe("Test totaliser mock", () => {
    it("La callback è richiamata correttamente", () => {
        const mockCallback = jest.fn()
        willSumViaCallback([1, 2], mockCallback);
        expect(mockCallback.mock.calls).toHaveLength(1);
        expect(mockCallback.mock.calls).toEqual([[[1, 2]]]);
    })
});

```

---

### MOCK DI OGGETTI GLOBALI / 1

Es. window.location.search

Object.defineProperty

```typescript

// La funzione usa internamente window.location.search

function funzione(){
    return QualcosaFunzioneDi(window.location.search)
}
```

### MOCK DI OGGETTI GLOBALI / 2 - Test

```typescript


describe("Test", () => {
    let originalWindowLocation: Location;

    beforeAll(() => {
        originalWindowLocation = window.location;
    })

    afterAll(() => {
        Object.defineProperty(window, 'location', originalWindowLocation)
    })

    it("Test getObjectFromURIString", () => {
        const search = "&x=1&y=2";

        Object.defineProperty(window, 'location', { value: { search: search } })

        const result = funzione();
        expect(result).toEqual(...)
    })

})

```

### MOCK DI UN MODULO / 1 - Illustrazione

Modulo: data.ts
```function fetchSomeData(...)```

Modulo: application.ts
Usa il modulo data.ts

### MOCK DI UN MODULO / 2 - Codice

---

```typescript
// definizione: data.ts
function fetchOrder(orderNumber: number): Order {
    return DATABASE.filter(order => order.orderNumber === orderNumber)[0];
}
```

```typescript
// definizione: application.ts
function totalOrderQty(orderNumber: number): number {
    const order = fetchOrder(orderNumber);
    return total(order.items.map(row => row.quantity))
}
```

### MOCK DI UN MODULO / 3 - Test

---

```typescript

// test
const mockOrder: Order = new Order(
    123, [new OrderItem("pere", 7), new OrderItem("banane", 4)]
    );

jest.mock('../../lib/data', () => {
    return {
        ...jest.requireActual('../../lib/data'),
        fetchOrder: (orderNumber: number) => mockOrder
    }
});

describe("Test calculateTotalOnData", () => {
    it("Esegue la somma delle quantità", () => {
        expect(calculateTotalOnData(1)).toEqual(11);
    })
});

```

---

### MOCK DI TIMER / 1

<https://jestjs.io/docs/timer-mocks#run-all-timers>

```typescript

// definizione
function remindMe(what: string, delay: number, action: (message: string) => void): void {
    const remindMessage = `REMINDER: ${what}`;

    setTimeout(() => { action(remindMessage) }, delay);
}

export { remindMe };

```

---

### MOCK DI TIMER / 2.1 - Test setup

```typescript
// test

import { remindMe } from '../../lib/reminder';

describe("Test reminder", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    })

    afterEach(() => {
        jest.useRealTimers();
    })

```

---

### MOCK DI TIMER / 2.2 - Test timer

```typescript

    it("Esempio di mock di Timeout", () => {

        jest.spyOn(global, 'setTimeout');

        remindMe("test", 1234, jest.fn());

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1234);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.anything(), 1234);

    })

```

---

### MOCK DI TIMER / 2.3 - Avanzamento timer

```typescript
    it("Esempio di simulazione di delay", () => {
        const callback = jest.fn();
        remindMe("test", 0, callback);
        expect(callback).not.toBeCalled();
        jest.runAllTimers();
        expect(callback).toBeCalled();
        expect(callback).toBeCalledTimes(1);
        expect(callback).toBe
    })

});

```

---

# LIBRERIA DI TEST REACT

Testing library
<https://testing-library.com>

Test react
<https://jestjs.io/docs/tutorial-react>

Aria Roles
<https://www.w3.org/TR/html-aria/#docconformance>

Reference sui tipi di asserzioni (jest-dom testing library)
<https://github.com/testing-library/jest-dom>

---

# LIBRERIA DI TEST REACT

Concetti chiave:

- Rendering
- Selezione parziale di un componente renderizzato
- Trigger di eventi
- Asserzioni

---

# TEST DI COMPONENTI FRONT END / Rendering

- Rendering di un componente o porzione di pagina

```const rendered = render(<Selector title="Di Prova"></Selector>);```typescript

---

# TEST DI COMPONENTI FRONT END / Selezione

- Selector: Selezionare una porzione

```const mySelect = rendered.getByRole('combobox');```typescript

---

# TEST DI COMPONENTI FRONT END / Trigger di eventi

```fireEvent.change(mySelect, { target: { value: 'B' } });```typescript

---

# TEST DI COMPONENTI FRONT END / Asserzioni

```expect(mySelect).toHaveValue("B");```typescript

# TEST DI COMPONENTI FRONT END / Eait For

Act: <https://it.legacy.reactjs.org/docs/test-utils.html#act>

Con render non è necessario incorporarlo in act(...) (vedi punto successivo)

Wait For: <https://davidwcai.medium.com/react-testing-library-and-the-not-wrapped-in-act-errors-491a5629193b>

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

---

# TEST FRONT END: MOCK USE STATE / 1

<https://www.linkedin.com/pulse/mocking-react-hooks-usestate-useeffect-leonard-lin/>

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

---

# TEST FRONT END: MOCK USE STATE / 2 - Test rendering

```typescript


import { render } from '@testing-library/react';
import { HeaderComponent } from '../../components/header/Header';

test('renders learn react link', () => {
  const userDescription = render(<HeaderComponent userDescription="example-usr-description" />)

  const nameHolder = userDescription.getByText(/example/)
  expect(nameHolder).toContainHTML("<div class=\"user\">example-usr-description</div>");
  expect(nameHolder).toHaveTextContent("example-usr-description");
  expect(nameHolder).toHaveAttribute("class", "user");

});

```

---

# TEST FRONT END: MOCK USE STATE / 3 - Test eventi

```typescript

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
