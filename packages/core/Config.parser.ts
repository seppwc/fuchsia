import { IConfigOptions, IDatabaseParams } from './interfaces';
import fs from 'fs';
import path from 'path';
import util from 'util';

interface ConfigInterface {
  config: Partial<IConfigOptions>;
  database: Partial<IDatabaseParams>;
}

const readFile = util.promisify(fs.readFile);

export class ConfigParser {
  public static async parse(): Promise<ConfigInterface> {
    const data = await readFile(
      path.join(process.cwd(), 'Fuchsia.config.json')
    );
    const json = JSON.parse(data.toString());
    const { databaseOptions, ...config } = json;

    return { config, database: { options: databaseOptions } };
  }
}
