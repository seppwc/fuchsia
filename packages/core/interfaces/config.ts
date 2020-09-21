import { DatabaseAdapter } from '../../orm/adapter.abstract';
import { ConnectionOptions } from 'mongoose';

export interface IConfigOptions {
  static: string | string[];
  views: string;
  viewEngine: string;
  urlEncoded: boolean;
  bodyParser: boolean;
  port: number;
}

export interface IDatabaseParams {
  adapter: DatabaseAdapter;
  uri: any;
  options?: ConnectionOptions;
}
