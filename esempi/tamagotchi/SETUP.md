# SETUP.md

## Links

### Typescript
https://itnext.io/testing-with-jest-in-typescript-cc1cd0095421
https://bobbyhadz.com/blog/typescript-exclude-test-files-from-compilation


### Webpack
https://webpack.js.org/guides/getting-started/#basic-setup
https://webpack.js.org/guides/

### Typescript


## Steps

```shell
npm init 

npm i -D typescript
npx tsc --init

npm i -D jest ts-jest @types/jest
npx ts-jest config:init

npm install webpack webpack-cli --save-dev

npm install --save-dev typescript ts-loader

npm install --save-dev style-loader css-loader

npm install --save-dev html-webpack-plugin
```

tsconfig.json

```json
{
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules", "tests/**/*"],
  "compilerOptions": {
    /* Projects */

    /* Language and Environment */
    "target": "es2016",                 /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */

    /* Modules */
    "module": "commonjs",               /* Specify what module code is generated. */
    "types": ["jest"],                  /* Specify type package names to be included without being referenced in a source file. */

    /* JavaScript Support */

    /* Emit */
    "outDir": "./dist",                 /* Specify an output folder for all emitted files. */

    /* Interop Constraints */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */

    /* Completeness */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}


```
