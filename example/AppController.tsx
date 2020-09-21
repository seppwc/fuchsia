import { h } from '../packages/core';
import { Route, Controller, Request, Response } from '../packages/common';
import { User } from './User';

export const AppController = (): Controller => {
  const GetAllUsers = () => async (_: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  };

  const GetOneUser = () => async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  };

  const CreateUser = () => async (req: Request, res: Response) => {
    const username = req.body.username;
    const newUser = new User({ name: username });
    try {
      await newUser.save();
      res.json('User Added');
    } catch (err) {
      res.status(400).json('error: ' + err);
    }
  };

  return (
    <Controller path='/'>
      <Route method='get' path='/:id'>
        <GetOneUser />
      </Route>

      <Route method='get' path='/'>
        <GetAllUsers />
      </Route>

      <Route method='post' path='/add'>
        <CreateUser />
      </Route>
    </Controller>
  );
};
