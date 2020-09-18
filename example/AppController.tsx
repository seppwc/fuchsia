import { h } from '../packages/core';
import { Route, Controller, Request, Response } from '../packages/common';

export const AppController = (): Controller => {
  const Hello = ({ message }: any) => (_: Request, res: Response) => {
    res.send(message);
  };

  const GoodBye = ({ name }: any) => (_: Request, res: Response) => {
    res.json({ goodbye: name });
  };

  return (
    <Controller path='/'>
      <Route method='get' path='/'>
        <Hello message='Hello' />
      </Route>
      <Route method='get' path='/there'>
        <GoodBye name='Joe' />
      </Route>
    </Controller>
  );
};
