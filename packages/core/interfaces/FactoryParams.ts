import { Controller } from '@fuchsiajs/common';
import { IConfigOptions, IDatabaseParams } from './index';

export interface IFuchsiaFactoryParams {
  controllers: [Controller];
  database?: IDatabaseParams;
  config?: Partial<IConfigOptions>;
}
