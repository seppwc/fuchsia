import { DatabaseAdapter } from '../../orm/adapter.abstract';
import { ConnectionOptions } from 'mongoose';

export interface IConfigOptions {
  [key: string]: any;
  port: number;
  urlEncoded: IUrlEncodedOptions;
  bodyParser: IBodyParserOptions;
  static: IStaticOptions | string;
  'case sensitive routing': boolean;
  env: string;
  etag: string[];
  'jsonp callback Name': string;
  'json escape': boolean;
  'json replacer': string;
  'json spaces': number;
  'query parser': string;
  'strict routing': Boolean;
  'subdomain offset': number;
  'trust proxy': string;
  views: string;
  viewCache: boolean;
  'view engine': string;
  'x-powered-by': boolean;
}

interface IUrlEncodedOptions {
  extended: boolean;
  inflate: boolean;
  limit: number | string;
  parameterLimit: number;
  type: string | string[] | any;
}

interface IBodyParserOptions {
  strict: boolean;
  inflate: boolean;
  limit: number;
  type: string;
}

interface IStaticOptions {
  [key: string]: any;
  dotfiles: string;
  etag: boolean;
  extensions: string[];
  fallthrough: string;
  immutable: boolean;
  index: string;
  lastModified: boolean;
  maxAge: number;
  redirect: boolean;
}

export interface IDatabaseParams {
  adapter: DatabaseAdapter;
  uri: any;
  options?: ConnectionOptions;
}
