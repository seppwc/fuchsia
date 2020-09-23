import { h } from '../packages/core';
import {
  Route,
  Controller,
  Request,
  FuchsiaResponse,
} from '../packages/common';
import { User } from './User';
import { Document } from 'mongoose';

export const AppController = (): Controller => {
  const GetUsers = async (): Promise<FuchsiaResponse<Document[]>> => {
    try {
      const users = await User.find();
      return { message: 'Success', payload: users };
    } catch (err) {
      return { message: 'Error', errors: err };
    }
  };

  const GetOneUser = async (req: Request): Promise<FuchsiaResponse<any>> => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      return { message: 'Success', payload: user };
    } catch (err) {
      return { message: 'Error', errors: err };
    }
  };

  const CreateUser = async (
    req: Request
  ): Promise<FuchsiaResponse<Document>> => {
    try {
      const name = req.body.name;
      const newUser = await new User({ name }).save();
      return { message: 'Success', payload: newUser };
    } catch (err) {
      return { message: 'Error', errors: err };
    }
  };

  const UpdateUser = async (req: Request): Promise<FuchsiaResponse<any>> => {
    try {
      const user = User.updateOne(
        { _id: req.params.id },
        { name: req.body.id }
      );
      return { message: 'Success', payload: user };
    } catch (err) {
      return { message: 'Error', errors: err };
    }
  };

  const DeleteUser = async (req: Request): Promise<FuchsiaResponse<any>> => {
    try {
      const result = await User.deleteOne({ _id: req.params.id });
      return { message: 'Success', payload: result };
    } catch (err) {
      return { message: 'Error', errors: err };
    }
  };

  return (
    <Controller path='/'>
      <Route method='get' path='/' callback={GetUsers} />
      <Route method='get' path='/:id' callback={GetOneUser} />
      <Route method='post' path='/' callback={CreateUser} />
      <Route method='put' path='/:id' callback={UpdateUser} />
      <Route method='delete' path='/:id' callback={DeleteUser} />
    </Controller>
  );
};
