# FuchsiaJS

The JSX/TSX web application framework built upon express - build declarative web servers using JSX/TSX syntax

```javascript


import { h , FuchsiaFactory } from '@fuchsiajs/core';
import { Controller , Route } from '@fuchsiajs/common';
import { MongooseAdapter } from '@fuchsiajs/orm'

const AppController = () => {

  const HelloWorld = () => (req, res) => {
    res.send('hello world');
  };

  const HelloAnon = () => (req, res) => {
    const data = req.params.id;
    res.send('user id: ' + data);
  };

  const HelloPostRoute = () => (req, res) => {
    const data = req.body.data;
    res.send('data: ' + data);
  };

  return (
    <Controller path='/'>
      <Route method='GET' path='/'>
        <HelloWorld />
      </Route>
      <Route method='GET' path='/:id'>
        <HelloAnon />
      </Route>
      <Route method='POST' path='/'>
        <HelloPostRoute />
      </Route>
    </Controller>
  );


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
    config: {
      port: 1234,
      views: '/views',
      viewEngine: 'hbs',
      static: '/public',
      bodyParser: true,
      urlEncoded: true,
    },
  });

  await app.listen();
};

main();


```
