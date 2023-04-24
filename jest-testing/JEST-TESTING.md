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

### Test di codice asincrono - callback

### Test di codice asincrono - promise

### Test di codice asincrono - async-await

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
