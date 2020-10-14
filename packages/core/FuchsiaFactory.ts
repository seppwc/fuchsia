import { FuchsiaApplication } from './FuchsiaApplication';
import { IFuchsiaFactoryParams } from './interfaces';

import { ConfigParser } from './Config.parser';

export class FuchsiaFactory {
  public static async create(
    params: IFuchsiaFactoryParams
  ): Promise<FuchsiaApplication> {
    console.clear(); 
    let { config, database, ...p } = params;

    let parsedFileData = await ConfigParser.parse();

    if (!config) {
      config = parsedFileData.config;
    }

    if (database) {
      const { DatabaseLoader } = await import('@fuchsiajs/orm/database.loader');
      let { adapter, uri, options } = database;

      if (!options) {
        options = parsedFileData.database.options;
      }

      uri && (await new DatabaseLoader(adapter).connect(uri, options));
    }

    let { port, ...rest } = config;

    return await new FuchsiaApplication(p, rest, port);
  }
}


