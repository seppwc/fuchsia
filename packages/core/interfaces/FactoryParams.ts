import { Controller, Service } from '@fuchsiajs/common';
import { IConfigOptions, IDatabaseParams } from './index';

export interface IFuchsiaFactoryParams {
  controllers: [()=>Controller];
  services?: Service[]
  database?: IDatabaseParams;
  config?: Partial<IConfigOptions>;
}
