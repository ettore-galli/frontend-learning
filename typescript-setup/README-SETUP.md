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
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    "rootDir": "./src",
    "outDir": "./dist",
    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "node16",
    "target": "ES2020",
    "moduleResolution": "node16",
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "types": [
      "vitest"
    ],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node
    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,
    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  },
  "include": [
    "src",
  ],
  "exclude": [
    "tests"
  ]
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

## Build deploy

File: build-package.sh

```sh
rm -rf build 
npm run build 
mkdir build 
cp -r public/* build  
cp -r dist/* build

```

```sh
npm install --save-dev serve
```

File: package.json

```json
{
  "build:prod": "./build-package.sh",
  "preview": "./build-package.sh && serve build"
  ...
}

```
