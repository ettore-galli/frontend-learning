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

## Libreria di test react

### Test di componenti front end

<https://jestjs.io/docs/tutorial-react>

- Rendering di un componente o porzione di pagina

```const rendered = render(<Selector title="Di Prova"></Selector>);```typescript

- Selector: Selezionare una porzione

```const mySelect = rendered.getByRole('combobox');```typescript

Esistono diversi selettori, per il ROle usare gli Aria Roles:

<https://www.w3.org/TR/html-aria/#docconformance>s

- Trigger di eventi

```fireEvent.change(mySelect, { target: { value: 'B' } });```typescript

- Asserzioni

```expect(mySelect).toHaveValue("B");```typescript

Reference sui tipi di asserzioni (jest-dom testing library)
<https://github.com/testing-library/jest-dom>

### Esempio

## Altre note tecniche

### Setup applicazione di esempio

```shell
# Creazione app react
npx create-react-app jest-testing --template typescript

```
