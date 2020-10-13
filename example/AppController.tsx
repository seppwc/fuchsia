import { JSX } from '../packages/core';
import {
  Route,
  Controller,
  Request,
  FuchsiaResponse,
  HTTP,
} from '../packages/common';
import { User, UserModel } from './User';

export const AppController = (): Controller => {
  const GetUsers = async (): Promise<FuchsiaResponse<UserModel[]>> => {
    try {
      const users: UserModel[] = await User.find();
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
  ): Promise<FuchsiaResponse<UserModel>> => {
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
      const user = User.findByIdAndUpdate(
        { _id: req.params.id },
        { name: req.body.name }
      );

      return { message: 'Success', payload: user };
    } catch (err) {
      return { message: 'Error', errors: err };
    }
  };

  const DeleteUser = async (req: Request): Promise<FuchsiaResponse<any>> => {
    try {
      const result = await User.findByIdAndDelete({ _id: req.params.id });
      return { message: 'Success', payload: result };
    } catch (err) {
      return { message: 'Error', errors: err };
    }
  };

  return (
    <Controller path='/'>
      <Route method='get' path='/' callback={GetUsers} />
      <Route method={HTTP.GET} path='/:id' callback={GetOneUser} />
      <Route method={HTTP.POST} path='/' callback={CreateUser} />
      <Route method={HTTP.PUT} path='/:id' callback={UpdateUser} />
      <Route method={HTTP.DELETE} path='/:id' callback={DeleteUser} />
    </Controller>
  );
};
