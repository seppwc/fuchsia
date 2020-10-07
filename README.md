# FuchsiaJS

The JSX/TSX web application framework built upon express - build declarative web servers using JSX/TSX syntax

## Hello World

```jsx
import { JSX, FuchsiaFactory } from '@fuchsiajs/core';
import { Controller, Route, HTTP } from '@fuchsiajs/common';

const AppController = () => {
  const HelloWorld = () => (req): Promise<string> => {
    return 'hello world';
  };

  return (
    <Controller path='/'>
      <Route method={HTTP.GET} path='/' callback={HelloWorld} />
    </Controller>
  );
};

export const main = async () => {
  const app: FuchsiaApplication = await FuchsiaFactory.create({
    controllers: [<AppController />],
  });

  await app.listen();
};

main();
```

## Basic Routeing

FuchsiaJS makes use of JSX/TSX syntax to declaritively define controllers and routes.

### Controllers

a basic controller is a function that returns a controller component, controllers have one predefined prop "path" which is the base path for all routes the fall under this controllers scope.

```jsx
const AppController = () => {
  return(
    <Controller path='/hello'>
      ...
    </Controller>;
  )
};
```

### Routes

Routes are components which are nested in a controller, they define the individual route path and methods, they make use of the "method" prop to define which http method to use, and the "path" prop to define the url path for that route. if no method is set defaults to "all" http methods.

```jsx
const AppController = () => {
  return(
    <Controller path='/hello'>
      <Route method="get" path="/" callback={...}/>
      <Route method={HTTP.GET} path="/:id" callback={...}/>
      <Route method={HTTP.POST} path="/" callback={...}/>
      <Route method={HTTP.PUT} path="/:id" callback={...}/>
      <Route method={HTTP.PATCH} path="/:id" callback={...}/>
      <Route method={HTTP.DELETE} path="/:id" callback={...}/>
    </Controller>;
  )
};
```

### Route Callbacks

Route callbacks are functions that get called when a route is executed. These are defined as a function which will receive one param (Request) within the controller scope and return promise, by default the return value will be included as a generic response type but including a json or render prop will return the desired type.

```jsx
const AppController = () => {

  const HelloWorld = (req: Request):Promise<string> => {
    return 'hello world'
  }

  return(
    <Controller path='/hello'>
      <Route method={HTTP.GET} path="/" callback={HelloWorld} />
    </Controller>;
  )
};
```

### Route Response Type

FuchsiaJS comes with a API response type to provide a consistent structure for data responses

```jsx

type FuchsiaResponse<T> = {
  message: 'Success' | 'Error',
  payload?: T,
  error?: string
}


const AppController = () => {

  const HelloWorld = (req: Request): Promise<FuchsiaResponse<string>> => {
    try {
        return {message: 'Success', payload: 'Hello World'}
    } catch(err) {
       return {message: 'Error', errors: err}
    }

  }

  return(
    <Controller path='/hello'>
      <Route method={HTTP.GET} path="/" callback={HelloWorld} />
    </Controller>;
  )
};
```

```json
//successfull
{
  "message": "Success",
  "payload": "PAYLOAD DATA"
}

//error
{
  "message": "Error",
  "error": {
        "stringValue": "ERROR MESSAGE",
        "kind": "ERROR KIND",
        "value": "ERROR VALUE",
        "path": "ERROR PATH",
        "reason": {}
    }
}

```

### adding a controller to your application

The central hub of the application is in the index{.tsx|.jsx} file in the src folder.

inside is the async main function which calls FuchsiaFactory.create() to build our application object. the static create function takes in an object where we can define an array of controllers, which we will pass our controller into.

we then call await app.listen() to start listening for requests.

```jsx
// index.tsx
export const main = async () => {

  // FuchsiaFactory.create() returns Promise<FuchsiaApplication>
  const app: FuchsiaApplication = await FuchsiaFactory.create({
    controllers: [<AppController />],
    {/*
      alternativly you can use

      controllers: [new AppController()]
    */}
  });

  await app.listen();
};
main();

```

## Defining application configuration settings

there are several ways to define settings for you application.

1. inside the object you pass to FuchsiaFactory.create()
1. inside a Fuchsia.config.json file in the base project file
1. inside a Fuchsia.config.js file in the base project file (import and spread only)
1. inside a Fuchsia.config.yaml file in the base project file (not yet supported)

### 1. via FuchsiaFactory.create()

define a "config" property inside the object you pass to FuchsiaFactory.create()

```jsx
// index.tsx
export const main = async () => {
  const app: FuchsiaApplication = await FuchsiaFactory.create({
    controllers: [<AppController />],
    config: {
      viewEngine: 'hbs',
      views: '/views',
      static: '/public',
      json: true,
      urlEncoded: true,
      port: 5555,
    },
  });

  await app.listen();
};
main();
```

### 2. via Fuchsia.config.json file

create a fuchsia.config.json file in the base folder of your project fuchsia will automatically look for this file are pass in all properties

```json
/* fuchsia.config.json */
{
  "json": true,
  "viewEngine": "ejs",
  "views": "/views",
  "static": "/publilc",
  "urlEncoded": true,
  "port": 5555
}
```

index.ts doesnt need to import anything or pass any properties as the json file so found by fuchsia by default.

```jsx
/* index.tsx */
export const main = async () => {
  const app: FuchsiaApplication = await FuchsiaFactory.create({
    controllers: [<AppController />],
  });

  await app.listen();
};
main();
```

### 3. via Fuchsia.config.js file in the base project file (via import only)

export default an object containing settings properties

```jsx
/* fuchsia.config.js */
export default {
  json: true,
  viewEngine: 'ejs',
  views: '/views',
  static: '/publilc',
  urlEncoded: true,
  port: 5555,
};
```

at the moment fuchsia.config.js is not look for by default, so you will need to import it and pass the object to the config property

```jsx
/* index.ts */

import config from './fuchsia.config.js';

export const main = async () => {
  const app: FuchsiaApplication = await FuchsiaFactory.create({
    controllers: [<AppController />],
    config,
  });

  await app.listen();
};
main();
```

### 4. via Fuchsia.config.yaml file in the base project file (not yet supported)

it is proposed to work the same as with fuchsia.config.json but for those who prefer to use yaml.

## Databases

at the moment fuchsiajs only supports mongoDB via a mongoose. Adding a database connection to your application is very simple.

just import `MongooseAdapter` from `@fuchsiajs/orm`

create a "database" property in your `FuchsiaFactory.create()` object and pass the `MongooseAdapter` component to the `adapter` property and the connection uri string to the `uri` property

```jsx
/* index.ts */
import { MongooseAdapter } from '@fuchsiajs/orm';

export const main = async () => {
  const app: FuchsiaApplication = await FuchsiaFactory.create({
    controllers: [<AppController />],
    database: {
      adapter: <MongooseAdapter />,
      uri: process.env.DB_URI,
    },
  });

  await app.listen();
};
main();
```

any other DB specific options can be passed to an `options` object nest inside the database object

```jsx
/* index.tsx */
import { MongooseAdapter } from '@fuchsiajs/orm';

export const main = async () => {
  const app: FuchsiaApplication = await FuchsiaFactory.create({
    controllers: [<AppController />],
    database: {
      adapter: <MongooseAdapter />,
      uri: process.env.DB_URI,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  });

  await app.listen();
};
main();
```

if using a Fuchsia.config.json / Fuchsia.config.js file these options can be included using a `databaseOptions` key which takes this object, And ommited entirely from the `FuchsiaFactory.create()` object.

```json
/* fuchsia.config.json */
{
  "bodyParser": true,
  "viewEngine": "ejs",
  "views": "/views",
  "static": "/publilc",
  "urlEncoded": true,
  "port": 5555,
  "databaseOptions": {
    "useNewUrlParser": true,
    "useUnifiedTopology": true
  }
}
```
