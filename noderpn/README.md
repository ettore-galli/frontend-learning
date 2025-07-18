# TOY CONSOLE RPN CALC

Toy project node

## Project setup

```shell
# Inizializzazione
npm init -y

```

```shell
# Runtime e compilazione:
npm install typescript ts-node @types/node --save-dev
```

```shell

# Testing con Jest:
npm install jest ts-jest @types/jest --save-dev
```

```shell
# Configurazione TypeScript
npx tsc --init
```

Opzioni tsconfig

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

```ts
// Creare jest.config.ts

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/__tests__/**/*.test.ts'],
};


```

```json

// Aggiunta a package.json
"scripts": {
  "test": "jest"
}

```

## Utilizzo

### Test

```shell


npm test


```

### Avvio

```shell

# Compila
npx tsc

# Esegue
npx ts-node src/index.ts

```
