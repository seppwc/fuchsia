import { Route, Controller, Request, Response } from '../packages/common';

export const AppController = (): Controller => {
  const Hello = ({ name }: any) => (_: Request, res: Response) => {
    res.json({ hello: name });
  };

  const GoodBye = ({ name }: any) => (_: Request, res: Response) => {
    res.json({ goodbye: name });
  };

  return (
    <Controller path='/'>
      <Route method='get' path='/'>
        <Hello name='Bob' />
      </Route>
      <Route method='get' path='/bye'>
        <GoodBye name='Joe' />
      </Route>
    </Controller>
  );
};
