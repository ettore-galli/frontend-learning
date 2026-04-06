# SETUP

## Base

```shell
npm init -y

npm install --save-dev typescript ts-node

npx tsc --init
```

Modifiche tsconfig.json

```json
    "outDir": "./dist",
    "module": "esnext",
    "target": "ES2020",
    "moduleResolution": "node",
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    ...
    "types": ["vitest"]
```

Modifiche package.json

```json
  "type": "module",
```

## Linting

```shell
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```  

eslint.config.js

```json
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];


```

Aggiungere a package.json

```json
"scripts": {
  "lint": "eslint . --ext .ts",
  "lint:fix": "eslint . --ext .ts --fix"
}
```

## Testing

```shell
npm install --save-dev vitest
```

vitest.config.ts

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    globals: true
  }
});
```

## Script package.json

```json

  "scripts": {
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "dev": "ts-node src/index.ts",
    "build": "tsc",
  },
```
