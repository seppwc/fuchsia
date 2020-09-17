import { Controller } from './Controller';
import { FuchsiaApplication } from './FuchsiaApplication';

interface IConfigOptions {
  static: string | string[];
  views: string;
  viewEngine: string;
  urlEncoded: boolean;
  bodyParser: boolean;
  port: number;
}

interface IFuchsiaFactoryParams {
  controllers: Controller[];
  config?: Partial<IConfigOptions>;
}

export class FuchsiaFactory {
  public static async create(
    params: IFuchsiaFactoryParams
  ): Promise<FuchsiaApplication> {
    const { config, ...p } = params;
    console.log(config);

    return await new FuchsiaApplication(p, config && config.port);
  }
}
