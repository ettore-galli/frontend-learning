# SETUP

## Base

```shell
npm init -y
npm install --save-dev typescript ts-node
npx tsc --init
```

Modifiche tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "module": "node16",
    "target": "ES2020",
    "moduleResolution": "node16",
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "types": ["vitest"],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  }
}
```

Modifiche package.json

```json
  "type": "module",
```

## Linting via ESLint

```sh
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```  

File `eslint.config.js`:

```js
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "off"
    }
  }
];
```

---

## Testing (vitest)

```shell
npm install --save-dev vitest
```

File `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    globals: true
  }
});
```

Esempio test:

```ts
export const sum = (a: number, b: number) => a + b;
```

```ts
import { test, expect } from "vitest";
import { sum } from "../src/index.js";

test("sum works", () => {
  expect(sum(1, 2)).toBe(3);
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
