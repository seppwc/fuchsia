import { JSX, useService } from '../packages/core';
import {
  Route,
  Controller,
  HTTP,
} from '../packages/common';



export const AppController =  (): Controller => {

  const { GetOne } = useService('app')

  return (
    <Controller path='/'>
      <Route json method={HTTP.GET} path='/' callback={GetOne} />
    </Controller>
  );
};
