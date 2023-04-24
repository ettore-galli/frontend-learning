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
// math.tsx
function supersomma(a: number, b: number): number {
    if (a === 1 && b === 1) {
        return 1.99999999987463487568
    } else {
        return a + b;
    }
}


export { supersomma }

// math.test.tsx
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

- La funzione callback riceve done
- Occorre richiamare done per indicare la fine del test

```typescript

function total(samples: number[]) {
    return samples.reduce((acc, cur) => acc + cur, 0);
};

function totalizer(samples: number[], sumFunction: (samples: number[]) => number) {
    setTimeout(() => console.log(sumFunction(samples)), 0);
};

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

## Libreria di test react

### Test di componenti front end

- Rendering
- Selector
- Trigger di eventi
- Asserzioni

## Altre note tecniche

### Setup applicazione di esempio

```shell
# Creazione app react
npx create-react-app jest-testing --template typescript

```
