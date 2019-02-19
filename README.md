### Check out the link to learn the full tutorial
(https://www.youtube.com/playlist?list=PLN3n1USn4xllF5t1GZhEwFQNDnStgupdB)

### Prerequisites

#### Server
* Install typeorm <br />
`npm install typeorm -g`
* Create typeorm project <br />
`typeorm init --name server --database postgres`
* Install yarn *(optional or you just can use npm)* <br />
`yarn`
* Upgrade latest typescript with yarn in terminal <br />
`yarn upgrade-interactive --latest`
* Revised `tsconfig.json` in root folder <br />
```json
{
   "compilerOptions": {
      "target": "es6",
      "module": "commonjs",
      "lib": ["dom", "es6", "es2017", "esnext.asynciterable"],
      "sourceMap": true,
      "outDir": "./dist",
      "moduleResolution": "node",

      "removeComments": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "strictFunctionTypes": true,
      "noImplicitThis": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "allowSyntheticDefaultImports": false,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true
   },
   "exclude": ["node_modules"],
   "include": ["./src/**/*.tsx", "./src/**/*.ts"]
}
```
* Revised `ormconfig.json` in root folder <br />
```json
{
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "dito",
   "password": "dito",
   "database": "stripe-example",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
```
* Create db with name `stripe-example` or custom name as long as the name is same in `ormconfig.json` <br />
`createdb stripe-example`
* Check connection with database with : <br />
`yarn start`
* Install Apollo and its dependencies to node.js <br />
`yarn add apollo-server-express graphql express express-session bcryptjs`
* Install dev dependencies to compile the `typescript` files later <br />
`yarn add -D @types/bcryptjs @types/express-session @types/graphql`
* Install nodemon and ts-node to automatically render the server when the changes occur <br />
`yarn add-D ts-node` <br />
`yarn add nodemon` <br />
and revised the scripts inside `package.json`
```json
"scripts": {
      "start": "nodemon --exec ts-node src/index.ts"
   }
```

#### Web
* Create template of React and Typescript from Microsoft <br />
`create-react-app my-app --scripts-version=react-scripts-ts`
* Install Apollo and its dependencies <br />
`yarn add react-router-dom apollo-boost graphql react-apollo`
* Install dev dependencies with `typescript` compiler <br />
`yarn add -D @types/react-router-dom apollo @types/graphql`
* Revise `tsconfig.json` to add asynciterable to make yarn starts successfully <br />
```json
{
   "lib" : ["es6", "dom", "esnext.asynciterable"]
}
```
*  Add rules to `tslint.json` <br />
```json
"rules" : {
   "no-console": false,
    "member-access": false,
    "object-literal-sort-keys": false,
    "ordered-imports": false,
    "interface-name": false,
    "no-submodule-imports": false,
    "jsx-no-lambda": false
}
```
* Add new value in scripts on `package.json` to generate mutation and query variables automatically <br />
```json
"scripts" : {
   // ...
   "schema:download": "apollo schema:download --endpoint=http://localhost:4000/graphql",
   "codegen:generate": "apollo codegen:generate --queries=./src/**/*.tsx --localSchemaFile=./schema.json --tagName=gql --addTypename --globalTypesFile=src/types/graphql-global-types.ts --outputFlat --target=typescript ./src/schemaTypes.ts",
   "gen:types": "npm run schema:download && npm run codegen:generate"
}
```
* Run gen:types to use mutation of React <br />
`yarn gen:types`


